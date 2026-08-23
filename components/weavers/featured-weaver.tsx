"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { featuredWeaver } from "@/lib/mock-data";
import { fadeUp, imageRevealMask } from "@/lib/motion";

export function FeaturedWeaver() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-border bg-card p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
        <motion.div
          {...imageRevealMask()}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-card"
        >
          <Image
            src="/images/saree/Paithani.jpg"
            alt="A close-up of a handcrafted paithani saree"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="inline-flex items-center rounded-full bg-black/25 px-3 py-1.5 text-[0.56rem] font-medium uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
              Maharashtra
            </div>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.1)}>
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-primary">
            Weaver of the Month
          </span>
          <h2 className="mt-4 font-heading text-2xl font-semibold sm:text-3xl">
            {featuredWeaver.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {featuredWeaver.village} • {featuredWeaver.craft} • {featuredWeaver.experience}
          </p>

          <Quote className="mt-5 size-5 text-accent" />
          <p className="mt-2 text-base leading-relaxed text-foreground/90">
            “{featuredWeaver.quote}”
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {featuredWeaver.story}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
