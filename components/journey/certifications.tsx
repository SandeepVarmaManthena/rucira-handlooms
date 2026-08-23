"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Hand, Scale, ShieldCheck, type LucideIcon } from "lucide-react";
import { certifications } from "@/lib/mock-data";
import { staggerContainer, staggerItem } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  "GI-Tagged Weaves": BadgeCheck,
  "Silk Mark Yarn": ShieldCheck,
  "Handloom, Not Power Loom": Hand,
  "Fair-Trade Pricing": Scale,
};

export function Certifications() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          HOW WE VERIFY
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Real craft, clear sourcing.
        </h2>
        <p className="mt-3 text-balance text-muted-foreground">
          We work with trusted clusters and clear sourcing standards, so the story behind each saree is as solid as the weave itself.
        </p>
      </div>

      <motion.div
        {...staggerContainer(0.08)}
        className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4"
      >
        {certifications.map((cert) => {
          const Icon = ICONS[cert.title] ?? BadgeCheck;
          return (
            <motion.div
              key={cert.title}
              variants={staggerItem(14)}
              className="group rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_32px_-16px_rgba(0,0,0,0.18)]"
            >
              <Icon className="size-5 text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
              <p className="mt-3 font-heading text-sm font-semibold">
                {cert.title}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {cert.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
