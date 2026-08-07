"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/product-card";
import { FilterPanel } from "@/components/shop/filter-panel";
import { MobileFilters } from "@/components/shop/mobile-filters";
import { useAdminProductsStore } from "@/store/admin-products-store";
import type {
  FabricType,
  ProductCategory,
  ProductColor,
  ProductPattern,
} from "@/lib/mock-data";
import {
  CATEGORY_FILTERS,
  COLOR_FILTERS,
  PATTERN_FILTERS,
  PRICE_RANGES,
  SORT_OPTIONS,
  TYPE_FILTERS,
  filterAndSortProducts,
  parseListParam,
  type PriceRangeValue,
  type SortValue,
} from "@/lib/shop-filters";

const VALID_CATEGORIES = CATEGORY_FILTERS.map((c) => c.value);
const VALID_FABRICS = TYPE_FILTERS.map((t) => t.value);
const VALID_COLORS = COLOR_FILTERS.map((c) => c.value);
const VALID_PATTERNS = PATTERN_FILTERS.map((p) => p.value);
const VALID_PRICE_RANGES = PRICE_RANGES.map((p) => p.value);

function toggleValue<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function ShopContent() {
  const searchParams = useSearchParams();
  const products = useAdminProductsStore((s) => s.products);

  const [selectedCategories, setSelectedCategories] = React.useState<
    ProductCategory[]
  >(() => parseListParam(searchParams.get("category"), VALID_CATEGORIES));
  const [selectedFabrics, setSelectedFabrics] = React.useState<FabricType[]>(
    () => parseListParam(searchParams.get("type"), VALID_FABRICS),
  );
  const [selectedColors, setSelectedColors] = React.useState<ProductColor[]>(
    () => parseListParam(searchParams.get("color"), VALID_COLORS),
  );
  const [selectedPatterns, setSelectedPatterns] = React.useState<
    ProductPattern[]
  >(() => parseListParam(searchParams.get("pattern"), VALID_PATTERNS));
  const [priceRange, setPriceRange] = React.useState<PriceRangeValue>(() => {
    const value = searchParams.get("price");
    return VALID_PRICE_RANGES.includes(value as PriceRangeValue)
      ? (value as PriceRangeValue)
      : "all";
  });
  const [sort, setSort] = React.useState<SortValue>("recommended");

  const results = React.useMemo(
    () =>
      filterAndSortProducts(products, {
        categories: selectedCategories,
        fabrics: selectedFabrics,
        colors: selectedColors,
        patterns: selectedPatterns,
        priceRange,
        sort,
      }),
    [products, selectedCategories, selectedFabrics, selectedColors, selectedPatterns, priceRange, sort],
  );

  const activeCount =
    selectedCategories.length +
    selectedFabrics.length +
    selectedColors.length +
    selectedPatterns.length +
    (priceRange !== "all" ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFabrics([]);
    setSelectedColors([]);
    setSelectedPatterns([]);
    setPriceRange("all");
  };

  const filterProps = {
    selectedCategories,
    onToggleCategory: (v: ProductCategory) =>
      setSelectedCategories((prev) => toggleValue(prev, v)),
    selectedFabrics,
    onToggleFabric: (v: FabricType) =>
      setSelectedFabrics((prev) => toggleValue(prev, v)),
    selectedColors,
    onToggleColor: (v: ProductColor) =>
      setSelectedColors((prev) => toggleValue(prev, v)),
    selectedPatterns,
    onTogglePattern: (v: ProductPattern) =>
      setSelectedPatterns((prev) => toggleValue(prev, v)),
    priceRange,
    onPriceRangeChange: setPriceRange,
    activeCount,
    onClear: clearFilters,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-8 sm:mb-10">
        <p className="text-xs font-semibold tracking-[0.2em] text-primary">
          THE COLLECTION
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
          Shop All Sarees
        </h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Handwoven, sourced directly from weaver families across India — no
          two pieces are ever quite the same.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[16rem_1fr] lg:items-start lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <FilterPanel {...filterProps} />
          </div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "saree" : "sarees"}
            </p>
            <div className="flex items-center gap-2.5">
              <MobileFilters {...filterProps} resultCount={results.length} />
              <Select
                value={sort}
                onValueChange={(value) => setSort(value as SortValue)}
              >
                <SelectTrigger className="h-9 w-[10.5rem] rounded-full text-sm">
                  <SelectValue placeholder="Sort by">
                    {(value: SortValue) =>
                      SORT_OPTIONS.find((option) => option.value === value)
                        ?.label ?? "Sort by"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {results.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:mt-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <SearchX className="size-5" />
              </span>
              <p className="mt-4 font-heading text-lg font-semibold">
                No sarees match your filters
              </p>
              <p className="mt-1.5 max-w-xs text-sm text-muted-foreground">
                Try adjusting or clearing your filters to see more of the
                collection.
              </p>
              <Button
                variant="outline"
                className="mt-6 h-10 rounded-full px-5"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
