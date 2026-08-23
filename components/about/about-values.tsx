"use client";

import { motion } from "framer-motion";
import { Hand, ShoppingBag, Users2, Wallet } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/motion";

const VALUES = [
  {
    icon: Users2,
    title: "Direct from the weaver",
    description: "We buy from artisan families and clusters ourselves — never through a trading middleman.",
  },
  {
    icon: Wallet,
    title: "Fair pricing, agreed upfront",
    description: "Every weaver is paid a fixed price before a saree is ever listed, regardless of how it sells.",
  },
  {
    icon: Hand,
    title: "Handloom, never power loom",
    description: "Every saree is inspected for the irregularities only a hand-operated pit loom leaves behind.",
  },
  {
    icon: ShoppingBag,
    title: "Every purchase counts",
    description: "Zero middlemen between the loom and the label means more of what you pay reaches the weaver.",
  },
] as const;

export function AboutValues() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
      <motion.div
        {...staggerContainer(0.07)}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {VALUES.map(({ icon: Icon, title, description }) => (
          <motion.div
            key={title}
            variants={staggerItem(14)}
            className="rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <Icon className="size-5 text-primary" />
            <p className="mt-3 font-heading text-sm font-semibold">{title}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
