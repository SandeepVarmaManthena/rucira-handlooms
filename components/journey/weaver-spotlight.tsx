"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { weaverProfiles } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function WeaverSpotlight() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            THE WEAVERS
          </p>
          <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
            The hands behind the loom
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-3">
          {weaverProfiles.map((weaver, i) => (
            <motion.div
              key={weaver.name}
              {...fadeUp(i * 0.1, 18)}
              className="flex flex-col rounded-2xl border border-border bg-card p-6"
            >
              <div
                className={`flex size-14 items-center justify-center rounded-full bg-gradient-to-br font-heading text-lg font-semibold text-white ${weaver.gradient}`}
              >
                {weaver.name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")}
              </div>

              <Quote className="mt-5 size-5 text-accent" />
              <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{weaver.quote}&rdquo;
              </p>

              <div className="mt-6 border-t border-border pt-4">
                <p className="font-heading text-base font-semibold">
                  {weaver.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {weaver.village}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 font-medium text-primary">
                    {weaver.craft}
                  </span>
                  <span className="text-muted-foreground">
                    {weaver.experience}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
