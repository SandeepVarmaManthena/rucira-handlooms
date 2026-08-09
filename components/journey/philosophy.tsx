"use client";

import { motion } from "framer-motion";
import { fadeIn, fadeUp } from "@/lib/motion";

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <motion.blockquote
        {...fadeUp(0)}
        className="text-balance font-heading text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl"
      >
        We believe a saree should hold the story of the hands that made it, not just the price tag on the label.
      </motion.blockquote>
      <motion.p
        {...fadeIn(0.2)}
        className="mt-6 text-sm font-medium tracking-wide text-muted-foreground"
      >
        Why we work directly with artisan families and keep every step honest.
      </motion.p>
    </section>
  );
}
