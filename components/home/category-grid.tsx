"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/mock-data";
import { PRICE_RANGES } from "@/lib/shop-filters";
import { fadeUp } from "@/lib/motion";

const BUDGET_CHIPS = PRICE_RANGES.filter((range) => range.value !== "all");
const weddingEdit = categories.find((c) => c.name === "Wedding Edit");
const gridCategories = categories.filter((c) => c.name !== "Wedding Edit");

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            SHOP BY WEAVE
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
            Find your perfect saree
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">
            Shop by budget:
          </span>
          {BUDGET_CHIPS.map((range) => (
            <Link
              key={range.value}
              href={`/shop?price=${range.value}`}
              className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary hover:text-primary"
            >
              {range.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:mt-10 sm:grid-cols-4 sm:gap-5">
        {gridCategories.map((category, i) => (
          <motion.div key={category.name} {...fadeUp(i * 0.05, 16)}>
            <Link
              href={category.href}
              className="group relative flex aspect-square flex-col justify-end overflow-hidden rounded-2xl p-3.5 sm:p-4"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.gradient} transition-transform duration-500 group-hover:scale-110`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/10" />
              <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(115deg,#fff_0,#fff_1px,transparent_1px,transparent_16px)]" />

              <div className="relative">
                <h3 className="font-heading text-sm font-semibold text-white sm:text-base">
                  {category.name}
                </h3>
                <p className="mt-0.5 text-[0.7rem] text-white/80 sm:text-xs">
                  {category.description}
                </p>
                <span className="mt-2 inline-flex items-center gap-1 text-[0.7rem] font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  Shop now
                  <ArrowUpRight className="size-3" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View all collections
          <ArrowUpRight className="size-4" />
        </Link>

        {weddingEdit && (
          <Link
            href={weddingEdit.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground hover:underline"
          >
            Shopping for a wedding? Browse the Bridal Edit
            <ArrowUpRight className="size-4" />
          </Link>
        )}
      </div>
    </section>
  );
}
