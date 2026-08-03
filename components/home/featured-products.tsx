import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { featuredProducts } from "@/lib/mock-data";

export function FeaturedProducts() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            HANDPICKED FOR YOU
          </p>
          <h2 className="mt-2 font-heading text-2xl font-semibold sm:text-3xl">
            Loved by our customers
          </h2>
        </div>
        <Link
          href="/shop"
          className="hidden text-sm font-medium text-primary hover:underline sm:inline-flex"
        >
          Browse full catalogue
        </Link>
      </div>

      <div className="mt-8 -mx-4 flex gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mt-10 sm:grid sm:grid-cols-2 sm:mx-0 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-5 [&::-webkit-scrollbar]:hidden">
        {featuredProducts.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            className="w-[15.5rem] shrink-0 sm:w-auto"
          />
        ))}
      </div>

      <Link
        href="/shop"
        className="mt-6 inline-flex text-sm font-medium text-primary hover:underline sm:hidden"
      >
        Browse full catalogue
      </Link>
    </section>
  );
}
