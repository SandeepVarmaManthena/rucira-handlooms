import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { formatINR } from "@/lib/utils";

export type ProductTileData = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  badge?: string;
  /** Omit when there's no real product page to link to yet (see product-tile below). */
  href?: string;
};

/**
 * The "new arrivals" grid card shared by both section landings. Accepts a
 * generic shape so it works for a real `Product` (Handlooms) and the
 * Officewear fixture data equally. When `href` is omitted the tile renders
 * inert rather than linking to a placeholder or a misleading destination.
 */
export function ProductTile({ product }: { product: ProductTileData }) {
  const media = (
    <>
      <Image
        src={product.image}
        alt={product.name}
        fill
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
      />
      {product.badge && (
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[0.65rem] font-semibold tracking-wide text-foreground backdrop-blur-sm">
          {product.badge}
        </span>
      )}
      <span className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-card/85 text-foreground backdrop-blur-sm">
        <Heart className="size-4" />
      </span>
    </>
  );

  const details = (
    <>
      <h3 className="font-heading text-[0.95rem] font-semibold leading-tight">
        {product.name}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground">{product.subtitle}</p>
      <div className="mt-1.5 flex items-baseline gap-2">
        <span className="text-sm font-semibold">{formatINR(product.price)}</span>
        {product.compareAtPrice && (
          <span className="text-xs text-muted-foreground line-through">
            {formatINR(product.compareAtPrice)}
          </span>
        )}
      </div>
    </>
  );

  if (!product.href) {
    return (
      <div className="flex flex-col gap-2.5">
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">{media}</div>
        <div>{details}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      <Link
        href={product.href}
        className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
      >
        {media}
      </Link>
      <Link href={product.href}>{details}</Link>
    </div>
  );
}
