"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scaleIn } from "@/lib/motion";

const SALE_DURATION_MS = (3 * 24 + 8) * 60 * 60 * 1000;

function getTimeLeft(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function SaleBanner() {
  const [target] = React.useState(() => Date.now() + SALE_DURATION_MS);
  const [timeLeft, setTimeLeft] = React.useState(() => getTimeLeft(target));

  React.useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units: { value: number; label: string }[] = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hrs" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <motion.div
        {...scaleIn()}
        className="relative overflow-hidden rounded-3xl px-6 py-10 text-white sm:px-10 sm:py-12"
      >
        <Image
          src="/images/hero/sale-banner.png"
          alt=""
          fill
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-maroon/85 via-[oklch(0.4_0.14_22)]/78 to-[oklch(0.55_0.13_35)]/72" />

        <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              <Flame className="size-3.5" />
              Festive Sale
            </span>
            <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
              Up to 40% off handloom silks
            </h2>
            <p className="mt-2 max-w-sm text-balance text-sm text-white/75 sm:text-base">
              On select Kanjivaram, Banarasi &amp; Tussar weaves, while
              stocks from this season&rsquo;s looms last.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 lg:items-end">
            <div
              className="flex items-center gap-2 sm:gap-3"
              aria-label={`Sale ends in ${timeLeft.days} days, ${timeLeft.hours} hours, ${timeLeft.minutes} minutes, ${timeLeft.seconds} seconds`}
            >
              {units.map((unit) => (
                <div
                  key={unit.label}
                  className="flex w-14 flex-col items-center rounded-xl border border-white/20 bg-white/10 py-2.5 backdrop-blur-sm sm:w-16"
                >
                  <span className="font-heading text-xl font-bold tabular-nums sm:text-2xl">
                    {String(unit.value).padStart(2, "0")}
                  </span>
                  <span className="text-[0.6rem] uppercase tracking-wide text-white/70">
                    {unit.label}
                  </span>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              className="h-11 rounded-full bg-accent px-6 text-sm text-gold-foreground hover:bg-accent/85"
              render={<Link href="/shop" />}
              nativeButton={false}
            >
              Shop the Sale
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
