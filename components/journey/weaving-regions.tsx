"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { weavingRegions } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

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

      <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4">
        {weavingRegions.map((region, i) => (
          <motion.div
            key={region.state}
            {...fadeUp(i * 0.04, 14)}
            className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40"
          >
            <MapPin className="size-4 text-primary" />
            <p className="mt-2.5 text-sm font-semibold">{region.state}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {region.craft}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
