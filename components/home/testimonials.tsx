"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
          From our customers
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.4rem]">
          Stories woven with love
        </h2>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            {...fadeUp(i * 0.08, 16)}
            className="group flex flex-col rounded-[1.6rem] border border-border bg-card p-6 shadow-[0_18px_40px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(15,23,42,0.08)]"
          >
            <Quote className="size-6 text-accent" />
            <div className="mt-3 flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, s) => (
                <Star key={s} className="size-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 font-heading text-xs font-semibold text-primary">
                {t.initials}
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
