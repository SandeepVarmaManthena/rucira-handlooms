"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { useAdminProductsStore } from "@/store/admin-products-store";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const product = useAdminProductsStore((s) =>
    s.products.find((p) => p.id === params.id),
  );

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center">
        <p className="font-heading text-lg font-semibold">
          Product not found
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          It may have been deleted already.
        </p>
        <Link
          href="/admin/products"
          className="mt-5 text-sm font-medium text-primary hover:underline"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return <ProductForm product={product} />;
}
