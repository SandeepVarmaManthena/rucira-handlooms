"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

/**
 * The hero's right-side visual: a weaver's hands arranging the gold zari
 * border of a handwoven silk saree, with a temple-border trim underlining
 * it to tie into the site's recurring handloom motif.
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
          className="relative size-full overflow-hidden rounded-3xl shadow-2xl shadow-primary/25"
        >
          <Image
            src="/images/hero/hero-section.png"
            alt="A weaver's hands arranging the gold zari border of a handwoven silk saree"
            fill
            priority
            sizes="(min-width: 640px) 24rem, 20rem"
            className="object-cover"
          />

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
