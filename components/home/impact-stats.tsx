"use client";

import { motion } from "framer-motion";
import { impactStats } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function ImpactStats() {
  return (
    <section className="bg-maroon text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent">
            OUR IMPACT
          </p>
          <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
            Every saree changes a livelihood
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-12 lg:grid-cols-4 lg:gap-8">
          {impactStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              {...fadeUp(i * 0.08, 14)}
              className="text-center"
            >
              <p className="font-heading text-3xl font-semibold sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1.5 text-xs text-white/75 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
