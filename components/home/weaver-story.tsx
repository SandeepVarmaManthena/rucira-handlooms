"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EASE } from "@/lib/motion";

export function WeaverStory() {
  return (
    <section className="bg-secondary/35">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative order-2 aspect-[4/3] w-full overflow-hidden rounded-[2rem] border border-border/80 bg-[#2d1c18] shadow-[0_24px_55px_rgba(38,22,16,0.18)] lg:order-1"
        >
          <Image
            src="/images/saree/Wedding-Edit.jpg"
            alt="A handwoven saree in warm traditional tones"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
            Artisan-made
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <MapPin className="size-3.5" />
              Kanchipuram, Tamil Nadu
            </div>
            <div className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.56rem] font-medium uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
              Direct from loom
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
          className="order-1 lg:order-2"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
            Our story
          </p>
          <h2 className="mt-2 max-w-xl text-balance font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.5rem]">
            From family looms to your wardrobe.
          </h2>
          <p className="mt-4 max-w-lg text-balance leading-relaxed text-muted-foreground">
            We work directly with artisan families across India. Every saree is chosen with care, priced fairly, and brought to you without layers in between.
          </p>

          <div className="mt-6 flex w-full max-w-md items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-[0_18px_40px_rgba(15,23,42,0.04)] sm:w-fit">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="size-4.5" />
            </span>
            <p className="text-sm text-foreground/90">
              <span className="font-semibold text-foreground">500+ artisan families</span>{" "}
              <span className="text-muted-foreground">supported with fair wages and direct partnerships</span>
            </p>
          </div>

          <Button
            size="lg"
            className="mt-7 h-11 w-full rounded-full px-6 text-sm font-medium sm:h-12 sm:w-auto sm:px-7 sm:text-base"
            render={<Link href="/journey" />}
            nativeButton={false}
          >
            Read our story
            <ArrowRight className="size-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
