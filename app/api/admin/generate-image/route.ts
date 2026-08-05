import { NextResponse } from "next/server";

const STYLE_PROMPTS: Record<string, string> = {
  "front-drape":
    "A clean, front-facing studio product photo of this saree fully draped on a mannequin. Soft, even lighting, plain neutral background, true-to-life color and texture.",
  "pallu-close-up":
    "A close-up studio photo of the pallu (decorative end-piece) of this saree, showing the border, zari work, and weave detail sharply.",
  "styled-model":
    "An editorial fashion photo of a model wearing this saree, natural light, elegant pose, softly blurred neutral background.",
  "flat-lay":
    "An overhead flat-lay product photo of this saree neatly folded, on a soft neutral fabric backdrop, natural light.",
};

export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        error:
          "AI image generation isn't configured yet. Add OPENAI_API_KEY to your server environment to enable it.",
      },
      { status: 501 },
    );
  }

  const body = await request.json().catch(() => null);
  const image = body?.image;
  const style = body?.style;

  if (typeof image !== "string" || !image.startsWith("data:image/")) {
    return NextResponse.json(
      { error: "Upload a reference image first." },
      { status: 400 },
    );
  }

  const prompt = STYLE_PROMPTS[style] ?? STYLE_PROMPTS["front-drape"];

  try {
    const base64 = image.split(",")[1];
    const imageBuffer = Buffer.from(base64, "base64");
    const mimeMatch = image.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch?.[1] ?? "image/png";

    const form = new FormData();
    form.append("model", "gpt-image-1");
    form.append("prompt", prompt);
    form.append("size", "1024x1024");
    form.append(
      "image",
      new Blob([imageBuffer], { type: mimeType }),
      "reference.png",
    );

    const response = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Image generation request failed:", errorText);
      return NextResponse.json(
        {
          error:
            "The image generation service rejected the request. Check the server logs for details.",
        },
        { status: 502 },
      );
    }

    const data = await response.json();
    const b64Image = data?.data?.[0]?.b64_json;

    if (!b64Image) {
      return NextResponse.json(
        { error: "The image generation service returned no image." },
        { status: 502 },
      );
    }

    return NextResponse.json({ image: `data:image/png;base64,${b64Image}` });
  } catch (error) {
    console.error("Image generation error:", error);
    return NextResponse.json(
      { error: "Unexpected error while generating the image." },
      { status: 500 },
    );
  }
}
