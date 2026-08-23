"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { scaleIn } from "@/lib/motion";

/**
 * Generic gradient CTA banner, shared by journey/weavers/about so each page
 * gets its own copy without three near-duplicate hand-rolled banners.
 */
export function CtaBanner({
  heading,
  description,
  ctaLabel,
  ctaHref,
}: {
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
      <motion.div
        {...scaleIn()}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon via-[oklch(0.4_0.14_22)] to-[oklch(0.52_0.13_30)] px-6 py-14 text-center text-white sm:px-12 sm:py-20"
      >
        <h2 className="relative text-balance font-heading text-2xl font-semibold sm:text-3xl lg:text-4xl">
          {heading}
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-balance text-sm text-white/80 sm:text-base">
          {description}
        </p>

        <div className="relative mt-8 text-center">
          <MagneticButton
            size="lg"
            className="h-12 rounded-full bg-accent px-7 text-base text-gold-foreground hover:bg-accent/85"
            render={<Link href={ctaHref} />}
            nativeButton={false}
          >
            {ctaLabel}
            <ArrowRight className="size-4" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
