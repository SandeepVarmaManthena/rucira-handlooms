"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductSlideshow } from "@/components/shop/product-slideshow";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/utils";
import {
  CATEGORY_FILTERS,
  COLOR_FILTERS,
  PATTERN_FILTERS,
  TYPE_FILTERS,
} from "@/lib/shop-filters";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = useAdminProductsStore((s) =>
    s.products.find((p) => p.id === params.id),
  );
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
        <p className="font-heading text-lg font-semibold">Product not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          It may have been removed from the collection.
        </p>
        <Link
          href="/shop"
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const weaveLabel = CATEGORY_FILTERS.find((c) => c.value === product.category)?.label;
  const fabricLabel = TYPE_FILTERS.find((t) => t.value === product.fabric)?.label;
  const colorLabel = COLOR_FILTERS.find((c) => c.value === product.color)?.label;
  const patternLabel = PATTERN_FILTERS.find((p) => p.value === product.pattern)?.label;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/shop" className="hover:text-foreground hover:underline">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <ProductSlideshow
          images={product.images}
          gradient={product.gradient}
          productName={product.name}
        />

        <div>
          {product.tag && (
            <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {product.tag}
            </span>
          )}
          <h1 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
            {product.name}
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {product.weaver} · {product.region}
          </p>

          <div className="mt-4 flex items-baseline gap-2.5">
            <span className="text-2xl font-semibold">{formatINR(product.price)}</span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm">
            {product.stock === 0 ? (
              <span className="text-destructive">Out of stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-accent-foreground">
                Only {product.stock} left in stock
              </span>
            ) : (
              <span className="text-primary">In stock</span>
            )}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-border py-5 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-xs text-muted-foreground">Weave</dt>
              <dd className="mt-0.5 font-medium">{weaveLabel ?? product.category}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Fabric</dt>
              <dd className="mt-0.5 font-medium">{fabricLabel ?? product.fabric}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Color</dt>
              <dd className="mt-0.5 font-medium">{colorLabel ?? product.color}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Pattern</dt>
              <dd className="mt-0.5 font-medium">{patternLabel ?? product.pattern}</dd>
            </div>
          </dl>

          <Button
            size="lg"
            disabled={product.stock === 0}
            onClick={() =>
              addItem({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0] ?? product.gradient,
              })
            }
            className="mt-6 h-11 w-full rounded-full sm:w-auto sm:px-8"
          >
            <ShoppingBag className="size-4" />
            {product.stock === 0 ? "Out of stock" : "Add to bag"}
          </Button>
        </div>
      </div>
    </div>
  );
}
