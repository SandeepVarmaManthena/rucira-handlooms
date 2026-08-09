"use client";

import { motion } from "framer-motion";
import { Award, RotateCcw, Truck, Users } from "lucide-react";
import { fadeUp } from "@/lib/motion";

const BADGES = [
  { icon: Award, label: "100% Handwoven" },
  { icon: Users, label: "Direct from Weaver" },
  { icon: Truck, label: "Pan-India Shipping" },
  { icon: RotateCcw, label: "7-Day Easy Returns" },
];

export function TrustBadges() {
  return (
    <section className="border-y border-border bg-secondary/25">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2.5 px-3 py-4 sm:grid-cols-2 sm:gap-3 sm:px-6 lg:grid-cols-4 lg:gap-4 lg:px-8">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            {...fadeUp(i * 0.05, 12)}
            className="flex items-center justify-center gap-2 rounded-full border border-border/80 bg-background/80 px-2.5 py-2.5 shadow-[0_10px_25px_rgba(15,23,42,0.03)] transition-transform duration-300 hover:-translate-y-0.5 sm:gap-2.5 sm:px-3 sm:py-3"
          >
            <badge.icon className="size-4 shrink-0 text-primary" />
            <span className="text-[0.72rem] font-medium text-foreground/85 sm:text-sm">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
