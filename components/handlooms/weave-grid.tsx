import Image from "next/image";
import Link from "next/link";

const WEAVES = [
  { name: "Kanjivaram", slug: "kanjivaram", image: "/images/saree/Kanjivaram-Silk.png" },
  { name: "Banarasi", slug: "banarasi", image: "/images/saree/Banarasi-Silk.jpg" },
  { name: "Tussar", slug: "tussar", image: "/images/saree/Tussar-Silk.jpg" },
  { name: "Kota Doria", slug: "kota", image: "/images/saree/Kota-Doria.jpg" },
] as const;

/**
 * Weave tiles link into the existing `/shop?category=` catalogue for now —
 * dedicated `/handlooms/[weave]` listing pages are a separate, larger unit
 * of work (the option-engine catalogue rebuild) and are deliberately
 * deferred rather than half-built here.
 */
export function WeaveGrid() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-9 sm:px-6 lg:px-8">
      <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Shop by weave
      </p>
      <div className="grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
        {WEAVES.map((weave) => (
          <Link
            key={weave.slug}
            href={`/shop?category=${weave.slug}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-muted"
          >
            <Image
              src={weave.image}
              alt={weave.name}
              fill
              sizes="(min-width: 1024px) 22vw, 45vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/72 to-transparent px-3.5 pb-3.5 pt-8 text-sm font-semibold text-white">
              {weave.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
