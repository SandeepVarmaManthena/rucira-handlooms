"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import { EASE, fadeUp, useParallax } from "@/lib/motion";
import { TextReveal } from "@/components/motion/text-reveal";

export function JourneyHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imageRef, 24);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 via-background to-background">
      <svg
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-[0.16]"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M -50 640 C 260 500, 340 740, 610 560 S 960 260, 1260 140"
          stroke="var(--gold)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.2 }}
        />
      </svg>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-28">
        <div className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-semibold tracking-[0.2em] text-primary"
          >
            OUR JOURNEY
          </motion.p>

          <TextReveal
            as="h1"
            text="A saree begins with a story."
            delay={0.1}
            wordDelay={0.06}
            className="mt-4 text-balance font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
          />

          <motion.p
            {...fadeUp(0.5)}
            className="mt-5 max-w-md text-balance text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            We work closely with artisan families to bring each saree from the loom to your wardrobe with care, fairness and a clear sense of origin.
          </motion.p>
        </div>

        <motion.div
          {...fadeUp(0.15)}
          className="relative order-1 mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-sm lg:order-2"
        >
          <div
            ref={imageRef}
            className="relative size-full overflow-hidden rounded-3xl shadow-2xl shadow-primary/25"
          >
            <motion.div style={{ y }} className="absolute -inset-y-6 inset-x-0">
              <Image
                src="/images/saree/Wedding-Edit.jpg"
                alt="A handwoven saree styled in warm festival tones"
                fill
                priority
                sizes="(min-width: 640px) 24rem, 20rem"
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6, ease: EASE }}
            className="absolute -bottom-5 left-1/2 w-[74%] -translate-x-1/2 rounded-xl border border-border bg-card/95 px-5 py-3.5 shadow-lg backdrop-blur"
          >
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Woven in
            </p>
            <div className="mt-0.5 flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span className="font-heading text-base font-semibold">
                Kanchipuram, Tamil Nadu
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="hidden justify-center pb-8 sm:flex"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-muted-foreground/60"
          aria-hidden
        >
          <ChevronDown className="size-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
