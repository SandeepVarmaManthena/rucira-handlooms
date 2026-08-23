"use client";

import { motion } from "framer-motion";
import { Coins, HandHeart, Users } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const PRINCIPLES = [
  {
    icon: Coins,
    title: "Paid before we sell",
    description:
      "Every weaver is paid a fixed, fair price when the saree is delivered to us — before we've listed it, and regardless of how it sells.",
  },
  {
    icon: Users,
    title: "No middlemen",
    description:
      "We work with weaver families and small clusters directly. Nobody takes a cut between the loom and the label.",
  },
  {
    icon: HandHeart,
    title: "Long-term relationships",
    description:
      "Most of the families we work with have been part of Rucira for years — we return to the same looms season after season.",
  },
] as const;

export function HowWeWork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          HOW WE WORK
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          Fair, direct, and repeated every season.
        </h2>
      </div>

      <motion.div
        {...staggerContainer(0.1)}
        className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-3"
      >
        {PRINCIPLES.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={staggerItem(16)}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <p className="mt-4 font-heading text-base font-semibold">{title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
