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
    <section className="border-y border-border bg-secondary/30">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-6 sm:px-6 sm:py-7 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-border lg:px-8">
        {BADGES.map((badge, i) => (
          <motion.div
            key={badge.label}
            {...fadeUp(i * 0.05, 10)}
            className="flex items-center justify-center gap-2.5 lg:px-4"
          >
            <badge.icon className="size-4 shrink-0 text-primary" />
            <span className="text-xs font-medium text-foreground/85 sm:text-sm">
              {badge.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
