"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { fadeUp } from "@/lib/motion";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            SHOP BY WEAVE
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
            Find your perfect saree
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          View all collections
          <ArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-4">
        {categories.map((category, i) => (
          <motion.div key={category.name} {...fadeUp(i * 0.06, 16)}>
            <Link
              href={category.href}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl p-4 sm:p-5"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform duration-500 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
              <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(115deg,#fff_0,#fff_1px,transparent_1px,transparent_16px)]" />

              <div className="relative">
                <h3 className="font-heading text-base font-semibold text-white sm:text-lg">
                  {category.name}
                </h3>
                <p className="mt-1 text-xs text-white/80 sm:text-sm">
                  {category.description}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Shop now
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline sm:hidden"
      >
        View all collections
        <ArrowUpRight className="size-4" />
      </Link>
    </section>
  );
}
