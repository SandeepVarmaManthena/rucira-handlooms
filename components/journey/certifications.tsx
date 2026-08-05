"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { certifications } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function Certifications() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          HOW WE VERIFY
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Genuine, and provably so
        </h2>
        <p className="mt-3 text-balance text-muted-foreground">
          &ldquo;Handloom&rdquo; is a promise we back with sourcing standards,
          not just a word on a label.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert, i) => (
          <motion.div
            key={cert.title}
            {...fadeUp(i * 0.06, 14)}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <BadgeCheck className="size-5 text-primary" />
            <p className="mt-3 font-heading text-sm font-semibold">
              {cert.title}
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {cert.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
