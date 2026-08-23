"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { weavingRegions } from "@/lib/mock-data";
import { staggerContainer, staggerItem } from "@/lib/motion";

// Cycles through the theme's existing chart tokens so each card's accent bar
// stays correct across every section theme and light/dark mode automatically.
const ACCENTS = [
  "bg-chart-1",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
] as const;

export function WeavingRegions() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          ACROSS INDIA
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Eight states, one shared craft
        </h2>
        <p className="mt-3 text-balance text-muted-foreground">
          Every region weaves differently — we work with weaver clusters
          across the country to bring you all of it.
        </p>
      </div>

      <motion.div
        {...staggerContainer(0.06)}
        className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4"
      >
        {weavingRegions.map((region, i) => (
          <motion.div
            key={region.state}
            variants={staggerItem(14)}
            className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 transition-colors duration-300 hover:-translate-y-0.5 hover:border-primary/40"
          >
            <span
              aria-hidden
              className={`absolute inset-x-0 top-0 h-[3px] origin-left scale-x-[0.28] transition-transform duration-300 ease-out group-hover:scale-x-100 ${ACCENTS[i % ACCENTS.length]}`}
            />
            <MapPin className="size-4 text-primary" />
            <p className="mt-2.5 text-sm font-semibold">{region.state}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{region.craft}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
