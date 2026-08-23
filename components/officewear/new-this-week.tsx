import { ProductTile } from "@/components/sections/product-tile";
import { officewearNewArrivals } from "@/lib/officewear-fixtures";

export function NewThisWeek() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-11 sm:px-6 lg:px-8">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="font-heading text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
          New this week
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {officewearNewArrivals.map((product) => (
          <ProductTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
