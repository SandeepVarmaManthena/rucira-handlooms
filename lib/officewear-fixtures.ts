import type { ProductTileData } from "@/components/sections/product-tile";

/**
 * TEMPORARY fixture data for the Officewear section.
 *
 * There is no real Officewear inventory yet — `lib/mock-data.ts`'s
 * `ProductCategory` union and `Product` type are saree/Handlooms-specific
 * (no `section` field, no dress-material shape). This file exists solely so
 * the Officewear landing page can render honestly in the meantime.
 *
 * Per the build plan's Phase U3 discipline: mock fixtures live in one file
 * per DTO and are deleted once the real backend/catalogue lands — nothing
 * else should import from this file.
 */
export const officewearNewArrivals: ProductTileData[] = [
  {
    id: "ow-fixture-1",
    name: "Aditi Mangalagiri",
    subtitle: "Cotton · Everyday",
    price: 2480,
    image: "/images/saree/Mangalagiri-Cotton.jpg",
    badge: "New",
  },
  {
    id: "ow-fixture-2",
    name: "Nivrita Chettinad",
    subtitle: "Cotton · Woven checks",
    price: 1960,
    image: "/images/saree/Chettinad-Cotton.jpg",
  },
  {
    id: "ow-fixture-3",
    name: "Ira Kota Blend",
    subtitle: "Cotton–silk · Light",
    price: 2240,
    compareAtPrice: 2800,
    image: "/images/saree/Kota-Doria.jpg",
  },
  {
    id: "ow-fixture-4",
    name: "Meher Dress Material",
    subtitle: "3-piece · Unstitched",
    price: 1740,
    image: "/images/saree/Tussar-Silk.jpg",
  },
];
