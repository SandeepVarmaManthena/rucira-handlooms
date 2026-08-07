"use client";

import * as React from "react";
import { AlertCircle, Loader2, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageLightbox } from "@/components/image-lightbox";

const MAX_GARMENT_PHOTOS = 3;

const POSE_ORDER = ["front", "side", "back"] as const;
type PoseKey = (typeof POSE_ORDER)[number];

const POSE_LABELS: Record<PoseKey, string> = {
  front: "Front View",
  side: "Side View (pallu visible)",
  back: "Back View",
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ImageUpload({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const dataUrls = await Promise.all(Array.from(files).map(fileToDataUrl));
    onChange([...images, ...dataUrls]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <p className="text-sm font-medium">Product images</p>
      <div className="mt-2 grid grid-cols-3 gap-2.5">
        {images.map((src, i) => (
          <div
            key={i}
            className="group relative aspect-square overflow-hidden rounded-lg border border-border"
          >
            <button
              type="button"
              aria-label={`View product image ${i + 1}`}
              onClick={() => setLightboxIndex(i)}
              className="block size-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Product view ${i + 1}`}
                className="size-full object-cover transition-transform group-hover:scale-105"
              />
            </button>
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => removeImage(i)}
              className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="size-3.5" />
            </button>
          </div>
        ))}

        {/* <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Upload className="size-5" />
          <span className="text-[0.7rem] font-medium">Upload</span>
        </button> */}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        labels={images.map((_, i) => `Product view ${i + 1}`)}
      />
    </div>
  );
}

export function AIGarmentGenerator({
  images,
  onChange,
}: {
  images: string[];
  onChange: (images: string[]) => void;
}) {
  const garmentInputRef = React.useRef<HTMLInputElement>(null);

  const [garmentPhotos, setGarmentPhotos] = React.useState<string[]>([]);
  const [prompt, setPrompt] = React.useState("");
  const [useSeed, setUseSeed] = React.useState(false);
  const [seed, setSeed] = React.useState("42");

  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [results, setResults] = React.useState<Partial<Record<PoseKey, string>>>({});
  const [poseErrors, setPoseErrors] = React.useState<Partial<Record<PoseKey, string>>>({});
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  const resultPoses = POSE_ORDER.filter((pose) => results[pose]);
  const resultImages = resultPoses.map((pose) => results[pose] as string);
  const resultLabels = resultPoses.map((pose) => POSE_LABELS[pose]);

  const handleGarmentFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const room = MAX_GARMENT_PHOTOS - garmentPhotos.length;
    if (room <= 0) return;
    const dataUrls = await Promise.all(
      Array.from(files).slice(0, room).map(fileToDataUrl),
    );
    setGarmentPhotos((prev) => [...prev, ...dataUrls]);
  };

  const removeGarmentPhoto = (index: number) => {
    setGarmentPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (garmentPhotos.length === 0) return;
    setGenerating(true);
    setError(null);
    setResults({});
    setPoseErrors({});
    try {
      const res = await fetch("/api/admin/fashn-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garmentImages: garmentPhotos,
          prompt,
          useSeed,
          seed: Number(seed),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong generating the images.");
        return;
      }
      const generated: Partial<Record<PoseKey, string>> = data.images ?? {};
      setResults(generated);
      setPoseErrors(data.errors ?? {});
      const newImages = POSE_ORDER.map((pose) => generated[pose]).filter(
        (src): src is string => Boolean(src),
      );
      if (newImages.length > 0) onChange([...images, ...newImages]);
    } catch {
      setError("Couldn't reach the image generation service.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div className="flex items-start gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Sparkles className="size-5" />
        </span>
        <div>
          <p className="text-base font-medium">Generate model-worn photos with AI</p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Upload the garment flat-lay and FASHN AI will generate a model wearing it
            in three poses — front, side, and back. 1 credit per image, 3 credits per
            garment.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <Label className="text-sm">Garment photos (1–3)</Label>
          <div className="mt-2 grid grid-cols-3 gap-3">
            {garmentPhotos.map((src, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl border border-border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`Garment reference ${i + 1}`}
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Remove garment photo"
                  onClick={() => removeGarmentPhoto(i)}
                  className="absolute right-1.5 top-1.5 flex size-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
            {garmentPhotos.length < MAX_GARMENT_PHOTOS && (
              <button
                type="button"
                onClick={() => garmentInputRef.current?.click()}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-secondary/20 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              >
                <Upload className="size-6" />
                <span className="text-xs font-medium">Upload</span>
              </button>
            )}
          </div>
          <input
            ref={garmentInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleGarmentFiles(e.target.files)}
          />

          <div className="mt-4 rounded-xl border border-border bg-secondary/30 p-4 text-xs text-muted-foreground">
            <p className="font-medium text-foreground/80">
              Garment photo tips for best results
            </p>
            <ul className="mt-1.5 list-disc space-y-1 pl-4">
              <li>Plain, seamless background</li>
              <li>Spread the full garment — show border, body, and pallu</li>
              <li>Don&apos;t include a blouse in the same frame</li>
              <li>Even, diffused lighting with no harsh shadows</li>
              <li>Landscape / wide orientation preferred</li>
            </ul>
          </div>
        </div>

        <div>
          <Label htmlFor="garment-prompt" className="text-sm">
            Garment description (optional)
          </Label>
          <Textarea
            id="garment-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g. deep red Kanjivaram silk with wide gold zari border and small butta motifs"
            className="mt-2 text-sm"
            rows={4}
          />
          <p className="mt-1.5 text-xs text-muted-foreground">
            Used in the generation prompt — describe colour, weave, and motifs. The
            more specific, the better.
          </p>

          <Accordion className="mt-4 rounded-lg border border-border px-3">
            <AccordionItem value="seed" className="border-b-0">
              <AccordionTrigger className="text-sm">
                Consistency seed (optional)
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-xs text-muted-foreground">
                  Using the same seed for all 3 poses encourages FASHN to pick a
                  similar-looking model across front, side, and back.
                </p>
                <label className="mt-2 flex cursor-pointer items-center gap-2">
                  <Checkbox
                    checked={useSeed}
                    onCheckedChange={(c) => setUseSeed(c === true)}
                  />
                  <span className="text-xs text-foreground/85">Use a fixed seed</span>
                </label>
                {useSeed && (
                  <Input
                    type="number"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    className="mt-2 max-w-32"
                    aria-label="Seed value"
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            type="button"
            variant="outline"
            disabled={garmentPhotos.length === 0 || generating}
            onClick={handleGenerate}
            className="mt-4 h-10 w-full rounded-full text-sm"
          >
            {generating ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Generating…
              </>
            ) : (
              <>
                <Sparkles className="size-4" />
                Generate — 3 poses (3 credits total)
              </>
            )}
          </Button>

          {garmentPhotos.length === 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Upload at least one garment photo first.
            </p>
          )}

          {error && (
            <div className="mt-3 flex items-start gap-2 rounded-lg bg-destructive/10 p-3 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-3.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {Object.keys(results).length > 0 && (
        <div className="mt-6 border-t border-border pt-6">
          <p className="text-sm font-medium">Generated views</p>
          <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:max-w-2xl">
            {POSE_ORDER.map((pose) =>
              results[pose] ? (
                <div key={pose}>
                  <button
                    type="button"
                    aria-label={`View ${POSE_LABELS[pose]}`}
                    onClick={() => setLightboxIndex(resultPoses.indexOf(pose))}
                    className="group block aspect-square w-full overflow-hidden rounded-xl border border-border"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={results[pose]}
                      alt={POSE_LABELS[pose]}
                      className="size-full object-cover transition-transform group-hover:scale-105"
                    />
                  </button>
                  <p className="mt-1.5 text-center text-xs text-muted-foreground">
                    {POSE_LABELS[pose]}
                  </p>
                </div>
              ) : (
                <div
                  key={pose}
                  className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-destructive/40 p-3 text-center"
                >
                  <AlertCircle className="size-4 text-destructive" />
                  <span className="text-xs text-destructive">
                    {poseErrors[pose] ?? "Failed"}
                  </span>
                </div>
              ),
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Added to Product images above.
          </p>

          <ImageLightbox
            images={resultImages}
            index={lightboxIndex}
            onIndexChange={setLightboxIndex}
            labels={resultLabels}
          />
        </div>
      )}
    </div>
  );
}
