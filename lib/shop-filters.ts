import type {
  FabricType,
  Product,
  ProductCategory,
  ProductColor,
  ProductPattern,
} from "@/lib/mock-data";

export type PriceRangeValue =
  | "all"
  | "under-5000"
  | "5000-10000"
  | "10000-20000"
  | "above-20000";

export type SortValue = "recommended" | "price-asc" | "price-desc";

export const CATEGORY_FILTERS: { value: ProductCategory; label: string }[] = [
  { value: "kanjivaram", label: "Kanjivaram" },
  { value: "banarasi", label: "Banarasi" },
  { value: "jamdani", label: "Jamdani" },
  { value: "tussar", label: "Tussar Silk" },
  { value: "paithani", label: "Paithani" },
  { value: "mangalagiri", label: "Mangalagiri Cotton" },
  { value: "chettinad", label: "Chettinad Cotton" },
  { value: "kota", label: "Kota Doria" },
];

export const TYPE_FILTERS: { value: FabricType; label: string }[] = [
  { value: "silk", label: "Silk" },
  { value: "cotton", label: "Cotton" },
  { value: "linen", label: "Linen" },
  { value: "blend", label: "Cotton-Silk Blend" },
];

export const COLOR_FILTERS: {
  value: ProductColor;
  label: string;
  swatch: string;
}[] = [
  { value: "maroon", label: "Maroon", swatch: "#7a1f2b" },
  { value: "red", label: "Red", swatch: "#b3261e" },
  { value: "gold", label: "Gold", swatch: "#c9a227" },
  { value: "mustard", label: "Mustard", swatch: "#d8a73d" },
  { value: "green", label: "Green", swatch: "#4b6b3a" },
  { value: "blue", label: "Blue", swatch: "#2e4e7e" },
  { value: "pink", label: "Pink", swatch: "#c97b92" },
  { value: "ivory", label: "Ivory", swatch: "#f1e7d6" },
  { value: "black", label: "Black", swatch: "#2a2320" },
  { value: "purple", label: "Purple", swatch: "#6a3f6b" },
];

export const PATTERN_FILTERS: { value: ProductPattern; label: string }[] = [
  { value: "zari-border", label: "Zari Border" },
  { value: "temple-border", label: "Temple Border" },
  { value: "checks", label: "Checks" },
  { value: "stripes", label: "Stripes" },
  { value: "floral", label: "Floral" },
  { value: "ikat-print", label: "Ikat Print" },
  { value: "solid", label: "Solid" },
  { value: "buta-motif", label: "Buta Motif" },
];

export const PRICE_RANGES: { value: PriceRangeValue; label: string }[] = [
  { value: "all", label: "Any price" },
  { value: "under-5000", label: "Under ₹5,000" },
  { value: "5000-10000", label: "₹5,000 – ₹10,000" },
  { value: "10000-20000", label: "₹10,000 – ₹20,000" },
  { value: "above-20000", label: "Above ₹20,000" },
];

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export function matchesPriceRange(price: number, range: PriceRangeValue) {
  switch (range) {
    case "under-5000":
      return price < 5000;
    case "5000-10000":
      return price >= 5000 && price < 10000;
    case "10000-20000":
      return price >= 10000 && price < 20000;
    case "above-20000":
      return price >= 20000;
    default:
      return true;
  }
}

/** Parses a comma-separated URL param into the subset of `valid` it contains. */
export function parseListParam<T extends string>(
  raw: string | null,
  valid: readonly T[],
): T[] {
  if (!raw) return [];
  const values = raw.split(",").map((v) => v.trim());
  return values.filter((v): v is T => (valid as readonly string[]).includes(v));
}

export function filterAndSortProducts(
  products: Product[],
  {
    categories,
    fabrics,
    colors,
    patterns,
    priceRange,
    sort,
  }: {
    categories: ProductCategory[];
    fabrics: FabricType[];
    colors: ProductColor[];
    patterns: ProductPattern[];
    priceRange: PriceRangeValue;
    sort: SortValue;
  },
) {
  const filtered = products.filter((product) => {
    const matchesCategory =
      categories.length === 0 || categories.includes(product.category);
    const matchesFabric =
      fabrics.length === 0 || fabrics.includes(product.fabric);
    const matchesColor = colors.length === 0 || colors.includes(product.color);
    const matchesPattern =
      patterns.length === 0 || patterns.includes(product.pattern);

    return (
      matchesCategory &&
      matchesFabric &&
      matchesColor &&
      matchesPattern &&
      matchesPriceRange(product.price, priceRange)
    );
  });

  if (sort === "price-asc") {
    return [...filtered].sort((a, b) => a.price - b.price);
  }
  if (sort === "price-desc") {
    return [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
}
