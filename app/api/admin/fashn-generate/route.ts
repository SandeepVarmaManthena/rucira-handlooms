import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 300;

const API_BASE = "https://api.fashn.ai/v1";
const POLL_INTERVAL_MS = 3000;
const MAX_WAIT_MS = 300_000;

// Generated images are written here so the admin can find them on disk
// (mirrors fashn/app.py, which saved every result to outputs/). Served
// directly by Next.js as static files under /generated/*.
const OUTPUT_DIR = path.join(process.cwd(), "public", "generated");

type PoseKey = "front" | "side" | "back";

const POSE_KEYS: PoseKey[] = ["front", "side", "back"];

const POSE_LABELS: Record<PoseKey, string> = {
  front: "Front View",
  side: "Side View (pallu visible)",
  back: "Back View",
};

// Ported from fashn/fashn_client.py + fashn/app.py (product-to-model prompt builder).
const POSE_BLOCKS: Record<PoseKey, string> = {
  front:
    "standing directly facing the camera, body square to camera, head upright, " +
    "face looking straight at the lens, pallu of the saree draped diagonally from " +
    "left shoulder falling to mid-thigh, neat fan-pleats visible at the front waist, " +
    "arms relaxed at the sides, ",
  side:
    "standing in right three-quarter profile, head turned gently toward camera " +
    "(no more than 45 degrees), pallu clearly visible draped over the left shoulder " +
    "and falling to the floor, natural fabric folds showing depth and weight of the " +
    "saree from the side, arms relaxed, one hand loosely at the waist, ",
  back:
    "standing with BACK squarely facing the camera, head facing STRAIGHT FORWARD " +
    "— NOT turned, NOT tilted sideways, neck visible, gaze directed away from camera " +
    "toward the horizon, pallu flowing straight down the spine from the left shoulder " +
    "to the floor, traditional blouse back-neckline fully exposed and visible, arms " +
    "relaxed at sides, ",
};

const COMMON_BASE =
  "Professional fashion catalogue photography, beautiful South Indian female model, " +
  "full body portrait head to feet, wearing a {desc} saree in traditional six-yard " +
  "Nivi drape, matching traditional saree blouse with elbow-length sleeves clearly " +
  "visible at the torso, midriff visible between blouse hem and saree waistband, " +
  "woven decorative border clearly visible along the saree edge, ";

const COMMON_TAIL =
  "soft diffused even studio lighting, seamless light grey background, no props, " +
  "no text, sharp focus on the entire garment from blouse to hem, photorealistic " +
  "4k fashion catalogue, high detail";

function buildPrompt(pose: PoseKey, garmentDesc: string): string {
  const desc = garmentDesc.trim() || "silk";
  return COMMON_BASE.replace("{desc}", desc) + POSE_BLOCKS[pose] + COMMON_TAIL;
}

// FASHN works best with the highest-detail reference photo; byte size of the
// uploaded data URL is used as a resolution proxy (mirrors pick_best_garment
// in fashn/fashn_client.py, which picked the highest-pixel-count image).
function pickBestGarment(images: string[]): string {
  return images.reduce((best, img) => (img.length > best.length ? img : best), images[0]);
}

async function submitJob(apiKey: string, body: unknown): Promise<string> {
  const res = await fetch(`${API_BASE}/run`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `FASHN error ${res.status}`);
  }
  const jobId = data?.id;
  if (!jobId) throw new Error("No job ID returned from FASHN");
  return jobId;
}

async function pollJob(apiKey: string, jobId: string): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
    const res = await fetch(`${API_BASE}/status/${jobId}`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    if (!res.ok) throw new Error(`FASHN status check failed: ${res.status}`);
    const data = await res.json();
    const status = data?.status;
    if (status === "completed") {
      const output = data?.output;
      if (Array.isArray(output) && output.length > 0) return output[0];
      throw new Error("FASHN job completed but returned no output");
    }
    if (status === "failed" || status === "error") {
      throw new Error(data?.error || "FASHN job failed");
    }
  }
  throw new Error("FASHN job timed out");
}

function extensionFor(contentType: string): string {
  if (contentType.includes("png")) return "png";
  if (contentType.includes("webp")) return "webp";
  return "jpg";
}

// Downloads the FASHN result and writes it to public/generated/ (mirrors
// save_result in fashn/app.py, which wrote every result to outputs/).
// Returns the path the browser can load it from, e.g. /generated/xxx.jpg.
async function downloadAndSave(url: string, filenameBase: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download result image: ${res.status}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  const contentType = res.headers.get("content-type") || "image/jpeg";

  await mkdir(OUTPUT_DIR, { recursive: true });
  const filename = `${filenameBase}.${extensionFor(contentType)}`;
  await writeFile(path.join(OUTPUT_DIR, filename), buffer);
  return `/generated/${filename}`;
}

async function generatePose(
  apiKey: string,
  productImage: string,
  pose: PoseKey,
  garmentDesc: string,
  seed: number,
  runId: string,
): Promise<string> {
  const jobId = await submitJob(apiKey, {
    model_name: "product-to-model",
    inputs: {
      product_image: productImage,
      prompt: buildPrompt(pose, garmentDesc),
      seed,
    },
  });
  const resultUrl = await pollJob(apiKey, jobId);
  return downloadAndSave(resultUrl, `${runId}_${pose}`);
}

export async function POST(request: Request) {
  const apiKey = process.env.FASHN_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI garment generation isn't configured yet. Add FASHN_API_KEY to your server environment to enable it.",
      },
      { status: 501 },
    );
  }

  const body = await request.json().catch(() => null);
  const garmentImages = body?.garmentImages;
  const prompt = typeof body?.prompt === "string" ? body.prompt : "";
  const useSeed = body?.useSeed === true;
  const seedInput = Number(body?.seed);

  if (!Array.isArray(garmentImages) || garmentImages.length === 0 || garmentImages.length > 3) {
    return NextResponse.json(
      { error: "Upload 1 to 3 garment photos to generate from." },
      { status: 400 },
    );
  }
  if (!garmentImages.every((img) => typeof img === "string" && img.startsWith("data:image/"))) {
    return NextResponse.json({ error: "Garment photos are invalid." }, { status: 400 });
  }

  const productImage = pickBestGarment(garmentImages);
  // Same seed across all 3 poses encourages a visually consistent model (see
  // the "consistency seed" feature in fashn/app.py).
  const seed =
    useSeed && Number.isFinite(seedInput) ? Math.trunc(seedInput) : Math.floor(Math.random() * 99_999) + 1;

  const timestamp = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d+Z$/, "");
  const runId = `${timestamp}_${Math.random().toString(36).slice(2, 8)}`;

  const settled = await Promise.allSettled(
    POSE_KEYS.map((pose) => generatePose(apiKey, productImage, pose, prompt, seed, runId)),
  );

  const images: Partial<Record<PoseKey, string>> = {};
  const errors: Partial<Record<PoseKey, string>> = {};

  settled.forEach((result, i) => {
    const pose = POSE_KEYS[i];
    if (result.status === "fulfilled") {
      images[pose] = result.value;
    } else {
      errors[pose] = result.reason instanceof Error ? result.reason.message : "Generation failed";
    }
  });

  if (Object.keys(images).length === 0) {
    return NextResponse.json(
      { error: `Generation failed for all poses: ${Object.values(errors).join("; ")}` },
      { status: 502 },
    );
  }

  return NextResponse.json({
    images,
    labels: POSE_LABELS,
    errors: Object.keys(errors).length > 0 ? errors : undefined,
    seed,
  });
}
