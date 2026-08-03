"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * A hand-authored illustration standing in for product photography: a draped
 * panel of fabric with a woven crosshatch texture, a temple-border trim, and
 * a single gold thread that draws itself in — evokes the loom without
 * relying on stock icon-in-a-circle decoration.
 */
export function HeroDrape() {
  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="absolute inset-0"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative size-full overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-[oklch(0.42_0.14_25)] to-[oklch(0.55_0.13_35)] shadow-2xl shadow-primary/25"
        >
          <div className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(115deg,var(--gold)_0,var(--gold)_1px,transparent_1px,transparent_15px)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:repeating-linear-gradient(25deg,white_0,white_1px,transparent_1px,transparent_15px)]" />

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 400 500"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 36 470 C 130 400, 90 230, 210 170 S 372 70, 350 24"
              stroke="var(--gold)"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 1.8, ease: EASE, delay: 0.5 }}
            />
          </svg>

          <div className="absolute inset-x-0 bottom-0 h-9 bg-black/15">
            <div
              className="absolute inset-x-0 top-0 h-2.5 opacity-70 [background-image:radial-gradient(circle_at_8px_0,transparent_6px,var(--gold)_6px,var(--gold)_7px,transparent_7px)] [background-repeat:repeat-x] [background-size:16px_16px]"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
        className="absolute -bottom-5 left-1/2 w-[74%] -translate-x-1/2 rounded-xl border border-border bg-card/95 px-5 py-3.5 shadow-lg backdrop-blur"
      >
        <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Festive Sale
        </p>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span className="font-heading text-2xl font-bold text-primary">
            −40%
          </span>
          <span className="text-xs text-muted-foreground">
            on select weaves
          </span>
        </div>
      </motion.div>
    </div>
  );
}
