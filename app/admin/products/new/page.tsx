import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Link href="/admin/products" className="hover:text-foreground hover:underline">
            Products
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground">Add Product</span>
        </div>
        <h1 className="mt-2 font-heading text-2xl font-semibold">
          Add a new saree
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details below to list it on the storefront.
        </p>
      </div>
      <ProductForm />
    </div>
  );
}
