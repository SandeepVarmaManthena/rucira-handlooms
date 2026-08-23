"use client";

import { motion } from "framer-motion";
import { EASE, fadeUp } from "@/lib/motion";
import { TextReveal } from "@/components/motion/text-reveal";

export function AboutHero() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="text-xs font-semibold tracking-[0.2em] text-primary"
      >
        ABOUT RUCIRA
      </motion.p>

      <TextReveal
        as="h1"
        text="Handloom, handcrafted with heart."
        delay={0.1}
        wordDelay={0.06}
        className="mt-4 text-balance font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
      />

      <motion.p
        {...fadeUp(0.5)}
        className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
      >
        Authentic handloom sarees, sourced directly from master weavers across India. No middlemen. Every purchase supports the loom that made it.
      </motion.p>
    </section>
  );
}
