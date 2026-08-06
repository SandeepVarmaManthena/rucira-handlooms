"use client";

import { motion } from "framer-motion";
import { craftSteps } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function CraftProcess() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          HOW A HANDLOOM SAREE IS MADE
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          From raw thread to timeless drape
        </h2>
        <p className="mt-3 text-balance text-muted-foreground">
          Every Rucira saree passes through the hands of skilled artisans over
          several days. No machines, no shortcuts.
        </p>
      </div>

      <div className="relative mt-12 grid grid-cols-1 gap-8 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block" />
        {craftSteps.map((step, i) => (
          <motion.div key={step.step} {...fadeUp(i * 0.08)} className="relative">
            <div className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background font-heading text-sm font-semibold text-primary">
              {step.step}
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold">
              {step.title}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
