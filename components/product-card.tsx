"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/utils";
import type { Product } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart-store";
import { fadeUp } from "@/lib/motion";

export function ProductCard({
  product,
  index = 0,
  className,
}: {
  product: Product & { images?: string[] };
  index?: number;
  className?: string;
}) {
  const addItem = useCartStore((s) => s.addItem);
  const coverImage = product.images?.[0];

  return (
    <motion.div {...fadeUp(Math.min(index, 8) * 0.05, 16)} className={className}>
      <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
        <Link href={`/shop/${product.id}`} className="absolute inset-0 block">
          {coverImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={coverImage}
              alt={product.name}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(70deg,#fff_0,#fff_1px,transparent_1px,transparent_13px)] transition-transform duration-700 ease-out group-hover:scale-150" />
            </>
          )}
        </Link>

        {product.tag && (
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-foreground backdrop-blur-sm">
            {product.tag}
          </span>
        )}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-background/85 text-foreground backdrop-blur-sm transition-colors hover:text-primary"
        >
          <Heart className="size-4" />
        </button>

        <Button
          size="sm"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: coverImage ?? product.gradient,
            })
          }
          className="absolute bottom-3 left-3 right-3 h-9 translate-y-14 rounded-full opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag className="size-3.5" />
          Add to bag
        </Button>
      </div>

      <Link href={`/shop/${product.id}`} className="mt-3 block">
        <h3 className="font-heading text-sm font-semibold sm:text-base">
          {product.name}
        </h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {product.weaver} · {product.region}
        </p>
        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-sm font-semibold sm:text-base">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
