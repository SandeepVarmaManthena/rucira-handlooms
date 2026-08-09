"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

const floatingCards = [
  {
    label: "National Handloom Day",
    value: "40% off",
    suffix: "on selected weaves",
    link: "/shop",
  },
] as const;

export function Hero() {

  return (
    <section className="relative flex min-h-[32rem] items-center overflow-hidden sm:min-h-[38rem] lg:min-h-[44rem]">
      <Image
        src="/images/hero/hero-section.png"
        alt="A weaver's hands arranging the gold zari border of a handwoven silk saree"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "68% 28%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp(0)} className="max-w-[20rem] sm:max-w-lg">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm shadow-[0_1px_0_rgba(255,255,255,0.08)] sm:text-[0.62rem]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d6b56b]" />
            HANDPICKED FOR THIS SEASON.
          </span>

          <h1 className="mt-5 text-balance font-heading text-[2.3rem] font-semibold leading-[0.92] tracking-[-0.03em] text-white sm:text-5xl lg:text-[4.1rem]">
            Weaving stories
            <br />
            worth wearing.
          </h1>

          <p className="mt-4 max-w-md text-balance text-sm text-white/80 sm:text-base sm:text-lg">
            Real handloom sarees from artisan families across India, selected for the moments that matter most.
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <Button
              size="lg"
              className="h-11 w-full rounded-full px-6 text-sm font-medium sm:h-12 sm:w-auto sm:px-7 sm:text-base"
              render={<Link href="/shop" />}
              nativeButton={false}
            >
              Shop the collection
            </Button>
            <Link
              href="/journey"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Our story
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 flex items-center justify-end pr-3 sm:pr-6 lg:pr-8">
        <div className="w-full max-w-[20rem] sm:max-w-[22rem]">
          {floatingCards.map((card) => (
            <Link
              key={card.label}
              href={card.link ?? "/shop"}
              className="group relative block rounded-[1.8rem] border border-white/10 bg-[rgba(60,27,18,0.28)] px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-[2px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/3 via-transparent to-transparent" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/20" />
                    <span className="text-[0.52rem] font-medium uppercase tracking-[0.18em] text-white/75">
                      {card.label}
                    </span>
                  </div>
                  <p className="font-heading text-[3.25rem] font-semibold leading-[0.8] tracking-[-0.06em] text-white sm:text-[3.7rem]">
                    {card.value}
                  </p>
                </div>
                <span className="mt-1 flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[#f0d9a0]">
                  <ArrowRight className="size-4" />
                </span>
              </div>
              <div className="relative mt-2">
                <span className="text-[0.9rem] font-light text-white/75">{card.suffix}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
