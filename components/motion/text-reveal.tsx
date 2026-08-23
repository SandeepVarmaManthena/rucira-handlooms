"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export function splitWords(text: string) {
  return text.split(" ");
}

/**
 * Splits a headline into words and reveals them with a clipped mask + rise,
 * staggered left to right. Reserved for the handful of big headline moments
 * (hero, philosophy) — not every heading sitewide.
 */
export function TextReveal({
  text,
  as = "h2",
  className,
  delay = 0,
  wordDelay = 0.05,
}: {
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
  wordDelay?: number;
}) {
  const Tag = as;
  const words = splitWords(text);

  return (
    <Tag className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              whileInView={{ y: "0%", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: EASE, delay: delay + i * wordDelay }}
            >
              {word}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
