"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, imageRevealMask } from "@/lib/motion";

export function AboutStory() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          {...imageRevealMask()}
          className="relative order-2 aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-card lg:order-1"
        >
          <Image
            src="/images/saree/Jamdani-Weaves.png"
            alt="A fine handloom Jamdani weave in progress on the loom"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </motion.div>

        <motion.div {...fadeUp(0.1)} className="order-1 lg:order-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            WHY WE STARTED
          </p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-semibold sm:text-3xl">
            Too many hands go unnamed.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            A handloom saree passes through months of skilled work before it
            reaches a wardrobe — and often through two or three middlemen who
            take the largest share of what it sells for, while the weaver’s
            name never makes it onto the label.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Rucira exists to shorten that distance. We buy directly from
            weaver families and small clusters, agree on a fair price before
            we list a single piece, and put the weaver’s name on every
            product page — because a saree this well made deserves to be
            traced back to the hands that made it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
