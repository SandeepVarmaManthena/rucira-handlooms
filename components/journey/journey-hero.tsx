"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, fadeUp } from "@/lib/motion";

export function JourneyHero() {
  return (
    <section className="relative flex min-h-[78vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background px-4 text-center sm:min-h-[85vh] sm:px-6">
      <svg
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[0.16]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M -50 640 C 260 500, 340 740, 610 560 S 960 260, 1260 140"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
        />
      </svg>

      <motion.p
        {...fadeUp(0, 10)}
        className="text-xs font-semibold tracking-[0.3em] text-primary"
      >
        OUR JOURNEY
      </motion.p>

      <motion.h1
        {...fadeUp(0.1)}
        className="mt-5 text-balance font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
      >
        Every thread
        <br />
        has a <span className="text-primary">name</span>.
      </motion.h1>

      <motion.p
        {...fadeUp(0.2)}
        className="mx-auto mt-6 max-w-lg text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Thirteen days. Six pairs of hands. One weaver&rsquo;s name on the
        label. Here&rsquo;s exactly how a Rucira saree is made — and why we
        chose to sell it this way.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 0.6 },
          y: { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 },
        }}
        className="absolute bottom-8 flex flex-col items-center gap-1.5 text-muted-foreground sm:bottom-10"
      >
        <span className="text-[0.65rem] font-medium tracking-[0.2em]">
          SCROLL
        </span>
        <ChevronDown className="size-4" />
      </motion.div>
    </section>
  );
}
