"use client";

import * as React from "react";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterPanel } from "@/components/shop/filter-panel";
import type {
  FabricType,
  ProductCategory,
  ProductColor,
  ProductPattern,
} from "@/lib/mock-data";
import type { PriceRangeValue } from "@/lib/shop-filters";

export function MobileFilters({
  selectedCategories,
  onToggleCategory,
  selectedFabrics,
  onToggleFabric,
  selectedColors,
  onToggleColor,
  selectedPatterns,
  onTogglePattern,
  priceRange,
  onPriceRangeChange,
  activeCount,
  onClear,
  resultCount,
}: {
  selectedCategories: ProductCategory[];
  onToggleCategory: (category: ProductCategory) => void;
  selectedFabrics: FabricType[];
  onToggleFabric: (fabric: FabricType) => void;
  selectedColors: ProductColor[];
  onToggleColor: (color: ProductColor) => void;
  selectedPatterns: ProductPattern[];
  onTogglePattern: (pattern: ProductPattern) => void;
  priceRange: PriceRangeValue;
  onPriceRangeChange: (value: PriceRangeValue) => void;
  activeCount: number;
  onClear: () => void;
  resultCount: number;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="outline"
            className="relative h-9 gap-1.5 rounded-full px-3.5 text-sm lg:hidden"
          />
        }
      >
        <SlidersHorizontal className="size-3.5" />
        Filters
        {activeCount > 0 && (
          <span className="ml-0.5 flex size-4.5 items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-primary-foreground">
            {activeCount}
          </span>
        )}
      </SheetTrigger>

      <SheetContent side="bottom" className="max-h-[85vh] rounded-t-2xl p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-5 py-5">
          <FilterPanel
            selectedCategories={selectedCategories}
            onToggleCategory={onToggleCategory}
            selectedFabrics={selectedFabrics}
            onToggleFabric={onToggleFabric}
            selectedColors={selectedColors}
            onToggleColor={onToggleColor}
            selectedPatterns={selectedPatterns}
            onTogglePattern={onTogglePattern}
            priceRange={priceRange}
            onPriceRangeChange={onPriceRangeChange}
            activeCount={activeCount}
            onClear={onClear}
            showHeader={false}
          />
        </div>

        <SheetFooter className="flex-row gap-3 border-t border-border p-4">
          <Button
            variant="outline"
            className="h-11 flex-1 rounded-full"
            onClick={onClear}
          >
            Clear all
          </Button>
          <Button
            className="h-11 flex-1 rounded-full"
            onClick={() => setOpen(false)}
          >
            Show {resultCount} {resultCount === 1 ? "saree" : "sarees"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
