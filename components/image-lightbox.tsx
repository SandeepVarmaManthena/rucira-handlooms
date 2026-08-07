"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/** Full-size image viewer with prev/next navigation, opened from a thumbnail click. */
export function ImageLightbox({
  images,
  index,
  onIndexChange,
  labels,
}: {
  images: string[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  labels?: string[];
}) {
  const open = index !== null && images.length > 0;
  const current = open ? images[index] : null;

  const go = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogContent
        showCloseButton
        className="max-w-[calc(100%-2rem)] gap-0 border-none bg-transparent p-0 shadow-none ring-0 sm:max-w-2xl"
      >
        <DialogTitle className="sr-only">
          {labels?.[index ?? 0] ?? `Image ${(index ?? 0) + 1}`}
        </DialogTitle>
        {current && (
          <div className="relative overflow-hidden rounded-xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current}
              alt={labels?.[index ?? 0] ?? `Image ${(index ?? 0) + 1}`}
              className="max-h-[80vh] w-full object-contain"
            />
            {images.length > 1 && (
              <>
                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                  <Button
                    type="button"
                    variant="secondary"
                    size="icon"
                    aria-label="Previous image"
                    onClick={() => go(-1)}
                    className="rounded-full"
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
                    className="rounded-full"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                </span>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-2.5 py-1 text-xs text-white">
                  {(index ?? 0) + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
