"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
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
  const fallbackImages = [
    "/images/saree/Kanjivaram-Silk.png",
    "/images/saree/Banarasi-Silk.jpg",
    "/images/saree/Jamdani-Weaves.png",
    "/images/saree/Paithani.jpg",
    "/images/saree/Mangalagiri-Cotton.jpg",
    "/images/saree/Chettinad-Cotton.jpg",
    "/images/saree/Kota-Doria.jpg",
    "/images/saree/Wedding-Edit.jpg",
  ];
  const images = product.images && product.images.length > 0 ? product.images : fallbackImages;
  const [active, setActive] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    if (!isHovering || images.length < 2) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 2200);
    return () => clearInterval(id);
  }, [isHovering, images.length]);

  const coverImage = images[active];

  return (
    <motion.div {...fadeUp(Math.min(index, 8) * 0.05, 16)} className={className}>
      <div
        className="group relative aspect-[3/4.2] overflow-hidden rounded-2xl sm:aspect-[3/4]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setActive(0);
        }}
      >
        <Link href={`/shop/${product.id}`} className="absolute inset-0 block">
          {coverImage ? (
            <AnimatePresence initial={false}>
              { }
              <motion.img
                key={active}
                src={coverImage}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </AnimatePresence>
          ) : (
            <>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${product.gradient} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 opacity-20 [background-image:repeating-linear-gradient(70deg,#fff_0,#fff_1px,transparent_1px,transparent_13px)] transition-transform duration-700 ease-out group-hover:scale-150" />
            </>
          )}
        </Link>

        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1 opacity-100 transition-opacity group-hover:opacity-0">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-1 rounded-full transition-all ${
                  i === active ? "w-3 bg-background" : "w-1 bg-background/60"
                }`}
              />
            ))}
          </div>
        )}

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
              originalPrice: product.originalPrice,
              image: coverImage ?? product.gradient,
            })
          }
          className="absolute bottom-3 left-3 right-3 h-9 translate-y-14 rounded-full opacity-0 shadow-lg transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ShoppingBag className="size-3.5" />
          Add to bag
        </Button>
      </div>

      <Link href={`/shop/${product.id}`} className="mt-2.5 block sm:mt-3">
        <h3 className="font-heading text-[0.9rem] font-semibold leading-tight sm:text-base">
          {product.name}
        </h3>
        <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-xs">
          {product.weaver} · {product.region}
        </p>
        <div className="mt-1.5 flex items-baseline gap-1.5 sm:gap-2">
          <span className="text-sm font-semibold sm:text-base">
            {formatINR(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-[0.7rem] text-muted-foreground line-through sm:text-xs">
              {formatINR(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
