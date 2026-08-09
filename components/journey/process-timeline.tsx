"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { journeySteps, type JourneyStep } from "@/lib/mock-data";
import { EASE } from "@/lib/motion";

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          THE PROCESS
        </p>
        <h2 className="mt-2 text-balance font-heading text-2xl font-semibold sm:text-3xl">
          From yarn to drape.
        </h2>
      </div>

      <div ref={containerRef} className="relative mt-14 sm:mt-20">
        <div className="absolute left-5 top-0 h-full w-px bg-border sm:left-1/2 sm:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-5 top-0 h-full w-px origin-top bg-primary sm:left-1/2 sm:-translate-x-1/2"
        />

        <div>
          {journeySteps.map((step, i) => (
            <TimelineStep key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, index }: { step: JourneyStep; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className="relative pb-12 pl-14 last:pb-0 sm:grid sm:grid-cols-2 sm:gap-10 sm:pb-20 sm:pl-0 sm:last:pb-0">
      <div className="absolute left-5 top-1 -translate-x-1/2 sm:left-1/2">
        <motion.span
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex size-4 items-center justify-center rounded-full border-2 border-primary bg-background"
        >
          <span className="size-1.5 rounded-full bg-primary" />
        </motion.span>
      </div>

      <motion.div
        initial={{ opacity: 0, x: isEven ? -16 : 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          isEven
            ? "sm:col-start-1 sm:row-start-1 sm:pr-12 sm:text-right"
            : "sm:col-start-2 sm:row-start-1 sm:pl-12",
        )}
      >
        <span className="text-xs font-semibold tracking-[0.2em] text-primary">
          {step.step} • {step.duration}
        </span>
        <h3 className="mt-1.5 font-heading text-xl font-semibold sm:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {step.description}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
        className={cn(
          "hidden overflow-hidden rounded-2xl border border-border bg-card sm:block sm:self-center",
          isEven ? "sm:col-start-2 sm:row-start-1 sm:pl-12" : "sm:col-start-1 sm:row-start-1 sm:pr-12",
        )}
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 640px) 0px, 30vw"
            className="object-cover"
          />
          <div className={cn("absolute inset-0 bg-gradient-to-br opacity-80", step.gradient)} />
        </div>
      </motion.div>
    </div>
  );
}
