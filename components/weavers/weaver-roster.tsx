"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { weaverProfiles } from "@/lib/mock-data";
import { staggerContainer, staggerItem } from "@/lib/motion";

export function WeaverRoster() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          THE ROSTER
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Six families, six crafts
        </h2>
      </div>

      <motion.div
        {...staggerContainer(0.08)}
        className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
      >
        {weaverProfiles.map((weaver) => (
          <motion.div
            key={weaver.name}
            variants={staggerItem(18)}
            className="flex flex-col rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40"
          >
            <motion.div
              whileHover={{ scale: 1.08, rotate: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 14 }}
              className={`flex size-14 items-center justify-center rounded-full bg-gradient-to-br font-heading text-lg font-semibold text-white ${weaver.gradient}`}
            >
              {weaver.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </motion.div>

            <Quote className="mt-5 size-5 text-accent" />
            <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground/90">
              “{weaver.quote}”
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
      </motion.div>
    </section>
  );
}
