"use client";

import { motion } from "framer-motion";
import { mountFadeUp } from "@/lib/motion";

export function ContactHero() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:px-6 sm:pt-20">
      <motion.p
        {...mountFadeUp(0)}
        className="text-xs font-semibold tracking-[0.2em] text-primary"
      >
        GET IN TOUCH
      </motion.p>
      <motion.h1
        {...mountFadeUp(0.08)}
        className="mt-4 text-balance font-heading text-3xl font-semibold sm:text-4xl"
      >
        We’d love to hear from you.
      </motion.h1>
      <motion.p
        {...mountFadeUp(0.16)}
        className="mx-auto mt-3 max-w-md text-balance text-sm leading-relaxed text-muted-foreground sm:text-base"
      >
        Questions about an order, a saree, or working with us — reach out and
        we’ll get back to you.
      </motion.p>
    </section>
  );
}
