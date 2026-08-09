"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BadgeCheck,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ProductSlideshow } from "@/components/shop/product-slideshow";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { useCartStore } from "@/store/cart-store";
import { formatINR } from "@/lib/utils";
import { catalogProducts, testimonials } from "@/lib/mock-data";
import {
  CATEGORY_FILTERS,
  COLOR_FILTERS,
  PATTERN_FILTERS,
  TYPE_FILTERS,
} from "@/lib/shop-filters";

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

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const product = useAdminProductsStore((s) =>
    s.products.find((p) => p.id === params.id),
  );
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [quantity, setQuantity] = useState(1);

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

  const galleryImages = product.images && product.images.length > 0 ? product.images : fallbackImages;
  const weaveLabel = CATEGORY_FILTERS.find((c) => c.value === product.category)?.label;
  const fabricLabel = TYPE_FILTERS.find((t) => t.value === product.fabric)?.label;
  const colorLabel = COLOR_FILTERS.find((c) => c.value === product.color)?.label;
  const patternLabel = PATTERN_FILTERS.find((p) => p.value === product.pattern)?.label;

  const relatedProducts =
    catalogProducts.filter(
      (item) => item.id !== product.id && item.category === product.category,
    ).slice(0, 4).length > 0
      ? catalogProducts
          .filter(
            (item) => item.id !== product.id && item.category === product.category,
          )
          .slice(0, 4)
      : catalogProducts.filter((item) => item.id !== product.id).slice(0, 4);

  const handleAddToBag = (goToCheckout = false) => {
    if (product.stock === 0) return;
    addItem(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0] ?? product.gradient,
      },
      quantity,
    );
    openCart();
    if (goToCheckout) {
      // Keep the customer in the premium cart flow without forcing a page change.
    }
  };

  const rating = 4.9;
  const careNotes = [
    "Handwoven by a certified artisan cluster",
    "Natural fibres with a soft hand-feel",
    "Crafted in limited quantities",
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/shop" className="hover:text-foreground hover:underline">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <span className="truncate text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8">
        <div className="lg:pt-1">
          <ProductSlideshow
            images={galleryImages}
            gradient={product.gradient}
            productName={product.name}
          />
        </div>

        <div className="lg:pt-2">
          {product.tag && (
            <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {product.tag}
            </span>
          )}

          <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={index < Math.round(rating) ? "fill-accent text-accent" : "text-muted-foreground"}
                  size={14}
                />
              ))}
            </div>
            <span>{rating.toFixed(1)} rating</span>
            <span>•</span>
            <span>{product.weaver}</span>
          </div>

          <p className="mt-1.5 text-sm text-muted-foreground">
            {product.region}
          </p>

          <div className="mt-5 flex items-end gap-3">
            <span className="text-3xl font-semibold tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-base text-muted-foreground line-through">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-3 text-sm">
            {product.stock === 0 ? (
              <span className="text-destructive">Out of stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-amber-600">Only {product.stock} left in stock</span>
            ) : (
              <span className="text-primary">In stock</span>
            )}
          </p>

          <p className="mt-5 text-base leading-relaxed text-foreground/85">
            A handwoven saree with a soft drape, rich texture and a weaving story that begins with the artisan family behind it. Designed for weddings, festive evenings and the moments worth keeping.
          </p>

          <div className="mt-6 rounded-2xl border border-border bg-secondary/30 p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-foreground">Quantity</p>
              <div className="flex items-center gap-2 rounded-full border border-border bg-background px-1.5 py-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full"
                  aria-label="Decrease quantity"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="size-4" />
                </Button>
                <span className="w-6 text-center text-sm font-medium">{quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-8 rounded-full"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity((value) => Math.min(product.stock || 10, value + 1))
                  }
                  disabled={product.stock === 0 || quantity >= (product.stock || 10)}
                >
                  <Plus className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 rounded-full"
              onClick={() => handleAddToBag(false)}
              disabled={product.stock === 0}
            >
              <ShoppingBag className="size-4" />
              Add to bag
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="flex-1 rounded-full"
              onClick={() => handleAddToBag(true)}
              disabled={product.stock === 0}
            >
              Buy now
            </Button>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-3">
              <Truck className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium">Free shipping</p>
              <p className="mt-1 text-xs text-muted-foreground">On orders over ₹3,000</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-3">
              <ShieldCheck className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium">Verified craft</p>
              <p className="mt-1 text-xs text-muted-foreground">Direct from artisan families</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-3">
              <BadgeCheck className="size-4 text-primary" />
              <p className="mt-2 text-sm font-medium">Easy returns</p>
              <p className="mt-1 text-xs text-muted-foreground">7-day no-fuss exchange</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">ABOUT THE PIECE</p>
          <h2 className="mt-3 font-heading text-2xl font-semibold sm:text-3xl">
            Made to be worn and remembered.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            This {product.name} is woven in {product.region} by {product.weaver}. The finish is rich and elegant with a balanced drape that makes it feel ceremonial without being heavy. Every piece is made in limited runs to keep the handloom tradition alive and the quality consistent.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {careNotes.map((note) => (
              <div key={note} className="flex items-start gap-2 rounded-2xl bg-secondary/40 p-3 text-sm text-foreground/85">
                <Sparkles className="mt-0.5 size-4 text-primary" />
                <span>{note}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">DETAILS</p>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Weave</dt>
              <dd className="font-medium">{weaveLabel ?? product.category}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Fabric</dt>
              <dd className="font-medium">{fabricLabel ?? product.fabric}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Colour</dt>
              <dd className="font-medium">{colorLabel ?? product.color}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
              <dt className="text-muted-foreground">Pattern</dt>
              <dd className="font-medium">{patternLabel ?? product.pattern}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">Care</dt>
              <dd className="font-medium">Dry clean recommended</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">WHY CUSTOMERS LOVE IT</p>
          <div className="mt-5 space-y-4">
            {[
              "Soft, premium finish that falls beautifully on movement.",
              "Rich artisan detailing with a slower, more thoughtful production process.",
              "Direct sourcing means fair wages and a clearer story behind every weave.",
            ].map((line) => (
              <div key={line} className="flex items-start gap-3 rounded-2xl bg-secondary/30 p-3">
                <Heart className="mt-0.5 size-4 text-primary" />
                <p className="text-sm text-foreground/85">{line}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.7rem] border border-border bg-card p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">CRAFT & CARE</p>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-4 text-primary" />Each saree is inspected and packed by hand before dispatch.</li>
            <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-4 text-primary" />The colour and finish are designed to feel rich, natural and true to the loom.</li>
            <li className="flex gap-3"><BadgeCheck className="mt-0.5 size-4 text-primary" />Slight variation in motif or shade is part of the natural handloom character.</li>
          </ul>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary">REVIEWS</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
              Loved by real wearers.
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium">
            <Star className="fill-accent text-accent" size={14} />
            {rating.toFixed(1)} / 5
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {testimonials.map((review) => (
            <article key={review.name} className="rounded-[1.5rem] border border-border bg-card p-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-secondary font-semibold text-foreground">
                    {review.initials}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${review.name}-${index}`} className="fill-accent text-accent" size={12} />
                  ))}
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">“{review.quote}”</p>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-primary">YOU MAY ALSO LIKE</p>
            <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
              Similar pieces
            </h2>
          </div>
          <Link href="/shop" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
