"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { impactStats } from "@/lib/mock-data";

function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        let start: number | null = null;
        const duration = 1400;

        const tick = (timestamp: number) => {
          if (start === null) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setCount(Math.round(value * eased));

          if (progress < 1) {
            requestAnimationFrame(tick);
          }
        };

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.35 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={elementRef} className="font-heading text-[2.2rem] font-semibold leading-none tracking-[-0.05em] text-white sm:text-[2.8rem]">
      {value === 0 ? "0" : count.toLocaleString()}
      {suffix}
    </span>
  );
}

export function ImpactStats() {
  return (
    <section className="bg-[#551f1a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#e7c483] sm:text-xs">
            Our impact
          </p>
          <h2 className="mt-3 text-balance font-heading text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl lg:text-[2.5rem]">
            Every saree changes a livelihood.
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {impactStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
              className="group rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-5 shadow-[0_12px_28px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] sm:px-5 sm:py-6"
            >
              <div className="flex items-center justify-center gap-1.5 text-center">
                <AnimatedStat value={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-center text-[0.7rem] leading-relaxed text-white/75 sm:text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
