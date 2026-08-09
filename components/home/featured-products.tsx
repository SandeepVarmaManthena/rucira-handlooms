"use client";

import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { useAdminProductsStore } from "@/store/admin-products-store";

const FEATURED_IDS = ["rc-001", "rc-002", "rc-003", "rc-004"];

export function FeaturedProducts() {
  const products = useAdminProductsStore((s) => s.products);
  const featured = FEATURED_IDS.map((id) =>
    products.find((p) => p.id === id),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary sm:text-xs">
            Handpicked for you
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.02em] sm:text-3xl lg:text-[2.3rem]">
            Loved by our customers
          </h2>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background px-3.5 py-2 text-sm font-medium text-foreground/80 transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary sm:self-auto"
        >
          Browse full catalogue
        </Link>
      </div>

      <div className="mt-8 -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mt-10 sm:grid sm:mx-0 sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {featured.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            className="w-[15.5rem] shrink-0 sm:w-auto"
          />
        ))}
      </div>
    </section>
  );
}
