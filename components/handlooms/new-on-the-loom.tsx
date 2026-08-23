"use client";

import Link from "next/link";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { ProductTile, type ProductTileData } from "@/components/sections/product-tile";

const FEATURED_IDS = ["rc-001", "rc-005", "rc-003", "rc-008"];

export function NewOnTheLoom() {
  const products = useAdminProductsStore((s) => s.products);

  const tiles: ProductTileData[] = FEATURED_IDS.map((id) => products.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({
      id: p.id,
      name: p.name,
      subtitle: `${p.weaver} · ${p.region}`,
      price: p.price,
      compareAtPrice: p.originalPrice,
      image: p.images?.[0] ?? "/images/saree/Kanjivaram-Silk.png",
      badge: p.tag,
      href: `/shop/${p.id}`,
    }));

  if (tiles.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-11 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          New on the loom
        </h2>
        <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {tiles.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
