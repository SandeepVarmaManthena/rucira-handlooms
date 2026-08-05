import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopContent } from "@/components/shop/shop-content";

export const metadata: Metadata = {
  title: "Shop All Sarees — Rucira Sarees",
  description:
    "Browse handwoven silk, cotton, linen, and bridal sarees — sourced directly from weaver families across India.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={null}>
      <ShopContent />
    </Suspense>
  );
}
