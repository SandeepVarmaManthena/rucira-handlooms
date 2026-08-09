"use client";

import * as React from "react";
import { X } from "lucide-react";

const MESSAGES = [
  "National Handloom Day Sale is live: up to 40% off handloom silks",
  "Free shipping across India on orders above ₹2,999",
  "Every saree is sourced directly from the weaver who made it",
];

export function AnnouncementBar() {
  const [dismissed, setDismissed] = React.useState(false);

  if (dismissed) return null;

  const loop = [...MESSAGES, ...MESSAGES];

  return (
    <div className="relative flex h-9 items-center overflow-hidden bg-primary text-primary-foreground">
      <div className="flex shrink-0 animate-marquee items-center gap-12 whitespace-nowrap text-xs font-medium tracking-wide">
        {loop.map((msg, i) => (
          <span key={i} className="flex items-center gap-12">
            <span>{msg}</span>
            <span aria-hidden className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full text-primary-foreground/70 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
