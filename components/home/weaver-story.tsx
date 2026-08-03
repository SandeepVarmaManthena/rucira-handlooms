"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

export function WeaverStory() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-3xl lg:order-1"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.4_0.09_60)] via-[oklch(0.55_0.1_70)] to-[oklch(0.78_0.14_85)]" />
          <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(0deg,#fff_0,#fff_1px,transparent_1px,transparent_10px),repeating-linear-gradient(90deg,#fff_0,#fff_1px,transparent_1px,transparent_10px)]" />

          <svg
            className="absolute inset-0 size-full"
            viewBox="0 0 400 300"
            fill="none"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 20 40 C 120 90, 100 190, 220 210 S 370 260, 380 280"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.6 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
            />
          </svg>

          <div className="absolute inset-x-0 bottom-0 h-9 bg-black/15">
            <div className="absolute inset-x-0 top-0 h-2.5 opacity-70 [background-image:radial-gradient(circle_at_8px_0,transparent_6px,white_6px,white_7px,transparent_7px)] [background-repeat:repeat-x] [background-size:16px_16px]" />
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/25 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
            <MapPin className="size-3.5" />
            Kanchipuram, Tamil Nadu
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            OUR JOURNEY
          </p>
          <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl lg:text-4xl">
            Sold direct from the loom — never from a warehouse
          </h2>
          <p className="mt-4 max-w-lg text-balance leading-relaxed text-muted-foreground">
            We work hand-in-hand with over 500 weaver families across
            India, paying fair prices and skipping the middlemen
            entirely — every saree carries a name, a village, and a story.
          </p>

          <div className="mt-6 flex w-fit items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="size-4.5" />
            </span>
            <p className="text-sm">
              <span className="font-semibold">500+ weaver families</span>{" "}
              <span className="text-muted-foreground">
                earn fair wages through Rucira
              </span>
            </p>
          </div>

          <Button
            size="lg"
            className="mt-7 h-12 rounded-full px-7 text-base"
            render={<Link href="/journey" />}
            nativeButton={false}
          >
            Discover Our Journey
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
