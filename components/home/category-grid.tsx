"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

const gridCategories = categories.filter((c) => c.name !== "Wedding Edit");
const cardLayouts = [
  "md:col-span-5 md:row-span-2",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-3",
];

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mb-8 max-w-2xl">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
          Shop by weave
        </p>
        <h2 className="mt-2 font-heading text-[2rem] font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[2.8rem]">
          Find a saree that feels like you.
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          Handwoven stories for festive days, quiet rituals, and everyday grace.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-12 md:gap-5">
        {gridCategories.map((category, i) => (
          <motion.div
            key={category.name}
            {...fadeUp(i * 0.05, 14)}
            className={`${cardLayouts[i]} ${i === 0 ? "md:h-[26rem]" : "md:h-[14rem]"}`}
          >
            <Link
              href={category.href}
              className="group relative flex h-full min-h-[13rem] w-full flex-col justify-end overflow-hidden rounded-[1.7rem] p-3.5 shadow-[0_20px_48px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 sm:p-4"
            >
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />

              <div className="relative z-10 max-w-[12rem]">
                <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
                  {category.name}
                </h3>
                <p className="mt-1 text-[0.7rem] leading-4 text-white/80 sm:text-xs">
                  {category.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Explore
                  <ArrowUpRight className="size-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
