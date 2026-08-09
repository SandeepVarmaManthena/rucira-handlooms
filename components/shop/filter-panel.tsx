"use client";

import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
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
  TYPE_FILTERS,
  type PriceRangeValue,
} from "@/lib/shop-filters";

const LIGHT_SWATCHES = new Set<ProductColor>(["gold", "mustard", "ivory"]);

export function FilterPanel({
  selectedCategories,
  onToggleCategory,
  selectedFabrics,
  onToggleFabric,
  selectedColors,
  onToggleColor,
  selectedPatterns,
  onTogglePattern,
  priceRange,
  priceMin,
  priceMax,
  onPriceRangeChange,
  activeCount,
  onClear,
  showHeader = true,
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
  priceMin: number;
  priceMax: number;
  onPriceRangeChange: (
    value: PriceRangeValue,
    minValue?: number,
    maxValue?: number,
  ) => void;
  activeCount: number;
  onClear: () => void;
  showHeader?: boolean;
}) {
  const formatPrice = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  const handlePriceSlider = (value: number | readonly number[]) => {
    const values = Array.isArray(value) ? value : [value as number, value as number];
    const nextMin = Math.min(values[0] ?? 0, values[1] ?? 30000);
    const nextMax = Math.max(values[0] ?? 0, values[1] ?? 30000);

    onPriceRangeChange("custom", nextMin, nextMax);
  };

  return (
    <div className="rounded-[1.5rem] border border-border/80 bg-card/80 p-4 shadow-[0_14px_40px_rgba(17,17,17,0.04)] backdrop-blur-sm">
      {showHeader && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-sm font-semibold tracking-[0.12em] text-foreground uppercase">
            Filters
          </h3>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-primary transition hover:text-primary/80"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      <Accordion multiple defaultValue={["category", "color", "price"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:no-underline">
            Weave
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {CATEGORY_FILTERS.map((category) => (
                <label
                  key={category.value}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={selectedCategories.includes(category.value)}
                    onCheckedChange={() => onToggleCategory(category.value)}
                  />
                  <span className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                    {category.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:no-underline">
            Fabric Type
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {TYPE_FILTERS.map((type) => (
                <label
                  key={type.value}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={selectedFabrics.includes(type.value)}
                    onCheckedChange={() => onToggleFabric(type.value)}
                  />
                  <span className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:no-underline">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2.5 pt-1">
              {COLOR_FILTERS.map((color) => {
                const selected = selectedColors.includes(color.value);
                return (
                  <button
                    key={color.value}
                    type="button"
                    title={color.label}
                    aria-label={color.label}
                    aria-pressed={selected}
                    onClick={() => onToggleColor(color.value)}
                    className={cn(
                      "group relative flex size-9 items-center justify-center rounded-full border-2 transition-all duration-200",
                      selected
                        ? "border-primary shadow-[0_0_0_3px_rgba(var(--primary),0.12)]"
                        : "border-transparent hover:scale-105 hover:border-border/80",
                    )}
                  >
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background px-2 py-1 text-[10px] font-medium text-foreground opacity-0 shadow-sm transition group-hover:opacity-100">
                      {color.label}
                    </span>
                    <span
                      className="size-6 rounded-full ring-1 ring-foreground/10 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: color.swatch }}
                    />
                    {selected && (
                      <Check
                        className={cn(
                          "absolute size-3.5",
                          LIGHT_SWATCHES.has(color.value)
                            ? "text-black/70"
                            : "text-white",
                        )}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pattern">
          <AccordionTrigger className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:no-underline">
            Pattern
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-1">
              {PATTERN_FILTERS.map((pattern) => (
                <label
                  key={pattern.value}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={selectedPatterns.includes(pattern.value)}
                    onCheckedChange={() => onTogglePattern(pattern.value)}
                  />
                  <span className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                    {pattern.label}
                  </span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between rounded-full border border-border bg-muted/40 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                <span>Budget</span>
                <button
                  type="button"
                  onClick={() => onPriceRangeChange("all")}
                  className={cn(
                    "font-medium transition",
                    priceRange === "all"
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  Any
                </button>
              </div>

              <div className="rounded-2xl border border-border bg-muted/20 p-3">
                <div className="mb-3 flex items-center justify-between text-xs font-medium text-foreground/80">
                  <span>{formatPrice(priceMin)}</span>
                  <span>{formatPrice(priceMax)}</span>
                </div>
                <Slider
                  min={0}
                  max={30000}
                  step={500}
                  value={[priceMin, priceMax]}
                  onValueChange={(value) => handlePriceSlider(value)}
                  className="w-full"
                />
              </div>

              <div className="grid gap-2">
                {PRICE_RANGES.filter((range) => range.value !== "all").map(
                  (range) => {
                    const isSelected = priceRange === range.value;
                    return (
                      <button
                        key={range.value}
                        type="button"
                        onClick={() => {
                          const presetMap: Partial<
                            Record<PriceRangeValue, { min: number; max: number }>
                          > = {
                            "under-5000": { min: 0, max: 4999 },
                            "5000-10000": { min: 5000, max: 9999 },
                            "10000-20000": { min: 10000, max: 19999 },
                            "above-20000": { min: 20000, max: 30000 },
                          };
                          const preset = presetMap[range.value];
                          if (!preset) return;
                          onPriceRangeChange(range.value, preset.min, preset.max);
                        }}
                        className={cn(
                          "w-full rounded-full border px-3 py-2 text-left text-sm transition",
                          isSelected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-foreground",
                        )}
                      >
                        {range.label}
                      </button>
                    );
                  },
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
