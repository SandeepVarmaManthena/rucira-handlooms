"use client";

import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  onPriceRangeChange: (value: PriceRangeValue) => void;
  activeCount: number;
  onClear: () => void;
  showHeader?: boolean;
}) {
  return (
    <div>
      {showHeader && (
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-sm font-semibold tracking-wide">
            Filters
          </h3>
          {activeCount > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs font-medium text-primary hover:underline"
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
                      "relative flex size-8 items-center justify-center rounded-full border-2 transition-transform",
                      selected
                        ? "border-primary"
                        : "border-transparent hover:scale-105",
                    )}
                  >
                    <span
                      className="size-6 rounded-full ring-1 ring-foreground/15"
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
            <RadioGroup
              value={priceRange}
              onValueChange={(value) =>
                onPriceRangeChange(value as PriceRangeValue)
              }
              className="gap-3 pt-1"
            >
              {PRICE_RANGES.map((range) => (
                <label
                  key={range.value}
                  className="group flex cursor-pointer items-center gap-2.5"
                >
                  <RadioGroupItem value={range.value} />
                  <span className="text-sm text-foreground/85 transition-colors group-hover:text-foreground">
                    {range.label}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
