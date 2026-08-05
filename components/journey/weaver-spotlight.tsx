"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { featuredWeaver, weaverProfiles } from "@/lib/mock-data";
import { EASE, fadeUp } from "@/lib/motion";

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

        <div className="mt-12 grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-card p-6 sm:mt-16 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${featuredWeaver.gradient}`}
            />
            <div className="absolute inset-0 opacity-[0.16] [background-image:repeating-linear-gradient(115deg,white_0,white_1px,transparent_1px,transparent_15px)]" />
            <div className="absolute inset-x-0 bottom-0 h-8 bg-black/15">
              <div className="absolute inset-x-0 top-0 h-2 opacity-70 [background-image:radial-gradient(circle_at_8px_0,transparent_6px,white_6px,white_7px,transparent_7px)] [background-repeat:repeat-x] [background-size:16px_16px]" />
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.1)}>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
              Weaver of the Month
            </span>
            <h3 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
              {featuredWeaver.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {featuredWeaver.village} &middot; {featuredWeaver.craft} &middot;{" "}
              {featuredWeaver.experience}
            </p>

            <Quote className="mt-5 size-5 text-accent" />
            <p className="mt-2 text-base leading-relaxed text-foreground/90">
              &ldquo;{featuredWeaver.quote}&rdquo;
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {featuredWeaver.story}
            </p>
          </motion.div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
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
