"use client";

import { motion } from "framer-motion";
import { EASE, fadeIn } from "@/lib/motion";
import { TextReveal } from "@/components/motion/text-reveal";

export function Philosophy() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <motion.svg
        width="52"
        height="40"
        viewBox="0 0 52 40"
        fill="none"
        className="mx-auto text-accent"
        aria-hidden
      >
        <motion.path
          d="M14 0C6.3 4.6 1 12.4 1 21.4 1 30.6 7.6 38 16.6 38c7 0 12-5.4 12-11.8 0-6-4.2-10.4-9.8-10.4-1.6 0-3 .3-4.2.9C15.8 9.3 20.2 4 27.4 0M40 0C32.3 4.6 27 12.4 27 21.4c0 9.2 6.6 16.6 15.6 16.6 7 0 12-5.4 12-11.8 0-6-4.2-10.4-9.8-10.4-1.6 0-3 .3-4.2.9C41.8 9.3 46.2 4 53.4 0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </motion.svg>

      <TextReveal
        as="blockquote"
        text="We believe a saree should hold the story of the hands that made it, not just the price tag on the label."
        className="mt-6 text-balance font-heading text-2xl font-medium leading-snug sm:text-3xl lg:text-4xl"
        wordDelay={0.035}
      />

      <motion.p
        {...fadeIn(0.9)}
        className="mt-6 text-sm font-medium tracking-wide text-muted-foreground"
      >
        Why we work directly with artisan families and keep every step honest.
      </motion.p>
    </section>
  );
}
