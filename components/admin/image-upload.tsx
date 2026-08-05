"use client";

import * as React from "react";
import { AlertCircle, Loader2, Sparkles, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STYLE_OPTIONS = [
  { value: "front-drape", label: "Front Drape" },
  { value: "pallu-close-up", label: "Pallu Close-up" },
  { value: "styled-model", label: "Styled on Model" },
  { value: "flat-lay", label: "Flat Lay" },
] as const;

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
  const [style, setStyle] = React.useState<(typeof STYLE_OPTIONS)[number]["value"]>(
    "front-drape",
  );
  const [generating, setGenerating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const dataUrls = await Promise.all(Array.from(files).map(fileToDataUrl));
    onChange([...images, ...dataUrls]);
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleGenerate = async () => {
    if (images.length === 0) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: images[0], style }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error ?? "Something went wrong generating the image.");
        return;
      }
      onChange([...images, data.image]);
    } catch {
      setError("Couldn't reach the image generation service.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm font-medium">Product images</p>
        <div className="mt-2 grid grid-cols-3 gap-2.5">
          {images.map((src, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Product view ${i + 1}`}
                className="size-full object-cover"
              />
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

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Upload className="size-5" />
            <span className="text-[0.7rem] font-medium">Upload</span>
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-secondary/30 p-4">
        <p className="flex items-center gap-1.5 text-sm font-medium">
          <Sparkles className="size-4 text-primary" />
          Generate more views with AI
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Upload one reference photo, then generate additional angles from it.
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {STYLE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setStyle(opt.value)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                style === opt.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-foreground/80 hover:border-primary hover:text-primary",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          disabled={images.length === 0 || generating}
          onClick={handleGenerate}
          className="mt-3 h-9 rounded-full text-sm"
        >
          {generating ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="size-3.5" />
              Generate
            </>
          )}
        </Button>

        {images.length === 0 && (
          <p className="mt-2 text-xs text-muted-foreground">
            Upload a reference image first.
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
  );
}
