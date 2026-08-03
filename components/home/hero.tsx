"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroDrape } from "@/components/home/hero-drape";
import { fadeUp } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/40 to-background">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-10 lg:px-8 lg:py-28">
        <motion.div {...fadeUp(0)} className="order-2 lg:order-1">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
            Direct from the weaver
          </p>

          <h1 className="mt-4 text-balance font-heading text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[3.75rem]">
            Handloom,
            <br />
            <span className="text-primary">handcrafted</span> with heart.
          </h1>

          <p className="mt-5 max-w-sm text-balance text-base text-muted-foreground sm:text-lg">
            Woven by a real artisan family — no factory, no middleman.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              size="lg"
              className="h-12 rounded-full px-7 text-base"
              render={<Link href="/shop" />}
              nativeButton={false}
            >
              Shop the Collection
            </Button>
            <Link
              href="/journey"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              Discover our journey
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.15)} className="order-1 lg:order-2">
          <HeroDrape />
        </motion.div>
      </div>
    </section>
  );
}
