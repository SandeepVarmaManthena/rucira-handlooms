"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { EASE, fadeUp, useParallax } from "@/lib/motion";
import { TextReveal } from "@/components/motion/text-reveal";

export function WeaversHero() {
  const imageRef = useRef<HTMLDivElement>(null);
  const y = useParallax(imageRef, 50);

  return (
    <section className="relative flex min-h-[26rem] items-center overflow-hidden sm:min-h-[32rem]">
      <div ref={imageRef} className="absolute inset-0 -z-10">
        <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
          <Image
            src="/images/hero/hero-section.png"
            alt="A weaver's hands arranging the gold zari border of a handwoven silk saree"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: "68% 28%" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-xs font-semibold tracking-[0.2em] text-[#e7c483]"
        >
          THE WEAVERS
        </motion.p>

        <TextReveal
          as="h1"
          text="Every saree has a name behind it."
          delay={0.1}
          wordDelay={0.06}
          className="mt-4 max-w-2xl text-balance font-heading text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl"
        />

        <motion.p
          {...fadeUp(0.55)}
          className="mt-5 max-w-md text-balance text-base leading-relaxed text-white/80 sm:text-lg"
        >
          Meet the artisan families we work with directly — no middlemen, fair pay agreed before a single saree is listed.
        </motion.p>
      </div>
    </section>
  );
}
