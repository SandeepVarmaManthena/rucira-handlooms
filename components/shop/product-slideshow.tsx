"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/image-lightbox";

export function ProductSlideshow({
  images,
  gradient,
  productName,
}: {
  images: string[];
  gradient: string;
  productName: string;
}) {
  const [active, setActive] = React.useState(0);
  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
        <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(70deg,#fff_0,#fff_1px,transparent_1px,transparent_13px)]" />
      </div>
    );
  }

  const go = (delta: number) => {
    setActive((prev) => (prev + delta + images.length) % images.length);
  };

  return (
    <div className="mx-auto w-full max-w-[620px]">
      <div className="group relative aspect-[4/5.4] w-full overflow-hidden rounded-[1.4rem] bg-muted shadow-[0_18px_36px_rgba(0,0,0,0.08)] sm:aspect-[4/4.8]">
        <button
          type="button"
          aria-label="Zoom image"
          onClick={() => setLightboxIndex(active)}
          className="block size-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[active]}
            alt={`${productName} view ${active + 1}`}
            className="size-full object-cover object-top"
          />
        </button>

        <span className="pointer-events-none absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-4" />
        </span>

        {images.length > 1 && (
          <>
            <span className="absolute left-2 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Previous image"
                onClick={() => go(-1)}
                className="rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ChevronLeft className="size-4" />
              </Button>
            </span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                aria-label="Next image"
                onClick={() => go(1)}
                className="rounded-full opacity-0 transition-opacity group-hover:opacity-100"
              >
                <ChevronRight className="size-4" />
              </Button>
            </span>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to image ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`size-1.5 rounded-full transition-all ${
                    i === active ? "w-4 bg-background" : "bg-background/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-2 grid grid-cols-5 gap-1.25 sm:grid-cols-5">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              aria-label={`View image ${i + 1}`}
              onClick={() => setActive(i)}
              className={`aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-200 ${
                i === active
                  ? "border-primary ring-2 ring-primary/20 shadow-sm"
                  : "border-border hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${productName} thumbnail ${i + 1}`}
                className="size-full object-cover object-top"
              />
            </button>
          ))}
        </div>
      )}

      <ImageLightbox
        images={images}
        index={lightboxIndex}
        onIndexChange={(i) => {
          setLightboxIndex(i);
          if (i !== null) setActive(i);
        }}
        labels={images.map((_, i) => `${productName} view ${i + 1}`)}
      />
    </div>
  );
}
