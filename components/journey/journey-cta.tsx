"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleIn } from "@/lib/motion";

export function JourneyCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24">
      <motion.div
        {...scaleIn()}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-maroon via-[oklch(0.4_0.14_22)] to-[oklch(0.52_0.13_30)] px-6 py-14 text-center text-white sm:px-12 sm:py-20"
      >
        <h2 className="relative text-balance font-heading text-2xl font-semibold sm:text-3xl lg:text-4xl">
          Ready to bring one home?
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-balance text-sm text-white/80 sm:text-base">
          Every saree in our collection comes with a story, a maker and a craft tradition behind it.
        </p>

        <Button
          size="lg"
          className="relative mt-8 h-12 rounded-full bg-accent px-7 text-base text-gold-foreground hover:bg-accent/85"
          render={<Link href="/shop" />}
          nativeButton={false}
        >
          Shop the Collection
          <ArrowRight className="size-4" />
        </Button>
      </motion.div>
    </section>
  );
}
