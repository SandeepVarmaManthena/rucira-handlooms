"use client";

import { motion } from "framer-motion";
import { craftSteps } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function CraftProcess() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
          How it is made
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.4rem]">
          From raw thread to timeless drape
        </h2>
        <p className="mt-3 text-balance text-muted-foreground">
          Every Rucira saree is shaped over several days by the hands of skilled artisans — no shortcuts, no factory shortcuts.
        </p>
      </div>

      <div className="relative mt-10 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 lg:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border/80 lg:block" />
        {craftSteps.map((step, i) => (
          <motion.div
            key={step.step}
            {...fadeUp(i * 0.08)}
            className="group relative rounded-[1.6rem] border border-border bg-card p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
          >
            <div className="relative z-10 flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background font-heading text-sm font-semibold text-primary">
              {step.step}
            </div>
            <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">
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
