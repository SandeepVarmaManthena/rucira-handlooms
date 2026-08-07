"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AIGarmentGenerator, ImageUpload } from "@/components/admin/image-upload";
import { useAdminProductsStore, type AdminProduct } from "@/store/admin-products-store";
import {
  CATEGORY_FILTERS,
  COLOR_FILTERS,
  PATTERN_FILTERS,
  TYPE_FILTERS,
} from "@/lib/shop-filters";

type FormValues = {
  name: string;
  weaver: string;
  region: string;
  category: string;
  fabric: string;
  color: string;
  pattern: string;
  price: string;
  originalPrice: string;
  stock: string;
  tag: string;
};

const EMPTY_VALUES: FormValues = {
  name: "",
  weaver: "",
  region: "",
  category: CATEGORY_FILTERS[0].value,
  fabric: TYPE_FILTERS[0].value,
  color: COLOR_FILTERS[0].value,
  pattern: PATTERN_FILTERS[0].value,
  price: "",
  originalPrice: "",
  stock: "",
  tag: "",
};

function toFormValues(product: AdminProduct): FormValues {
  return {
    name: product.name,
    weaver: product.weaver,
    region: product.region,
    category: product.category,
    fabric: product.fabric,
    color: product.color,
    pattern: product.pattern,
    price: String(product.price),
    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
    stock: String(product.stock),
    tag: product.tag ?? "",
  };
}

const FALLBACK_GRADIENT = "from-[oklch(0.5_0.1_25)] to-[oklch(0.7_0.11_45)]";

export function ProductForm({ product }: { product?: AdminProduct }) {
  const router = useRouter();
  const addProduct = useAdminProductsStore((s) => s.addProduct);
  const updateProduct = useAdminProductsStore((s) => s.updateProduct);

  const [values, setValues] = React.useState<FormValues>(
    product ? toFormValues(product) : EMPTY_VALUES,
  );
  const [images, setImages] = React.useState<string[]>(product?.images ?? []);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitting, setSubmitting] = React.useState(false);

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (values.name.trim().length < 2) nextErrors.name = "Enter a product name";
    if (values.weaver.trim().length < 2) nextErrors.weaver = "Enter a weaver credit";
    if (values.region.trim().length < 2) nextErrors.region = "Enter a region";
    const price = Number(values.price);
    if (!values.price || Number.isNaN(price) || price <= 0)
      nextErrors.price = "Enter a valid price";
    if (values.originalPrice) {
      const original = Number(values.originalPrice);
      if (Number.isNaN(original) || original <= 0)
        nextErrors.originalPrice = "Enter a valid price";
    }
    const stock = Number(values.stock);
    if (values.stock === "" || Number.isNaN(stock) || stock < 0)
      nextErrors.stock = "Enter a valid stock quantity";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload = {
      name: values.name.trim(),
      weaver: values.weaver.trim(),
      region: values.region.trim(),
      category: values.category as AdminProduct["category"],
      fabric: values.fabric as AdminProduct["fabric"],
      color: values.color as AdminProduct["color"],
      pattern: values.pattern as AdminProduct["pattern"],
      price: Number(values.price),
      originalPrice: values.originalPrice ? Number(values.originalPrice) : undefined,
      stock: Number(values.stock),
      tag: values.tag.trim() || undefined,
      gradient: product?.gradient ?? FALLBACK_GRADIENT,
      images,
    };

    if (product) {
      updateProduct(product.id, payload);
    } else {
      addProduct(payload);
    }

    router.push("/admin/products");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-5 rounded-2xl border border-border bg-card p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                value={values.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Vaidehi Kanjivaram"
                className="mt-1.5"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <Label htmlFor="weaver">Weaver credit</Label>
              <Input
                id="weaver"
                value={values.weaver}
                onChange={(e) => setField("weaver", e.target.value)}
                placeholder="Woven by Lakshmi Amma"
                className="mt-1.5"
              />
              {errors.weaver && (
                <p className="mt-1 text-xs text-destructive">{errors.weaver}</p>
              )}
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={values.region}
                onChange={(e) => setField("region", e.target.value)}
                placeholder="Kanchipuram, TN"
                className="mt-1.5"
              />
              {errors.region && (
                <p className="mt-1 text-xs text-destructive">{errors.region}</p>
              )}
            </div>

            <div>
              <Label>Weave</Label>
              <Select
                value={values.category}
                onValueChange={(v) => v && setField("category", v)}
              >
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue>
                    {(v: string) =>
                      CATEGORY_FILTERS.find((c) => c.value === v)?.label ?? "Select"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_FILTERS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Fabric type</Label>
              <Select value={values.fabric} onValueChange={(v) => v && setField("fabric", v)}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue>
                    {(v: string) =>
                      TYPE_FILTERS.find((t) => t.value === v)?.label ?? "Select"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {TYPE_FILTERS.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Color</Label>
              <Select value={values.color} onValueChange={(v) => v && setField("color", v)}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue>
                    {(v: string) =>
                      COLOR_FILTERS.find((c) => c.value === v)?.label ?? "Select"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {COLOR_FILTERS.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      <span className="flex items-center gap-2">
                        <span
                          className="size-3 rounded-full ring-1 ring-foreground/15"
                          style={{ backgroundColor: c.swatch }}
                        />
                        {c.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Pattern</Label>
              <Select value={values.pattern} onValueChange={(v) => v && setField("pattern", v)}>
                <SelectTrigger className="mt-1.5 w-full">
                  <SelectValue>
                    {(v: string) =>
                      PATTERN_FILTERS.find((p) => p.value === v)?.label ?? "Select"
                    }
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {PATTERN_FILTERS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tag">Badge (optional)</Label>
              <Input
                id="tag"
                value={values.tag}
                onChange={(e) => setField("tag", e.target.value)}
                placeholder="Bestseller, New, Sale..."
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="price">Price (₹)</Label>
              <Input
                id="price"
                type="number"
                inputMode="numeric"
                value={values.price}
                onChange={(e) => setField("price", e.target.value)}
                placeholder="12499"
                className="mt-1.5"
              />
              {errors.price && (
                <p className="mt-1 text-xs text-destructive">{errors.price}</p>
              )}
            </div>

            <div>
              <Label htmlFor="originalPrice">Original price (optional)</Label>
              <Input
                id="originalPrice"
                type="number"
                inputMode="numeric"
                value={values.originalPrice}
                onChange={(e) => setField("originalPrice", e.target.value)}
                placeholder="17999"
                className="mt-1.5"
              />
              {errors.originalPrice && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.originalPrice}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="stock">Stock quantity</Label>
              <Input
                id="stock"
                type="number"
                inputMode="numeric"
                value={values.stock}
                onChange={(e) => setField("stock", e.target.value)}
                placeholder="14"
                className="mt-1.5"
              />
              {errors.stock && (
                <p className="mt-1 text-xs text-destructive">{errors.stock}</p>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <ImageUpload images={images} onChange={setImages} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <AIGarmentGenerator images={images} onChange={setImages} />
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-full px-5"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={submitting} className="h-10 rounded-full px-6">
          {submitting && <Loader2 className="size-4 animate-spin" />}
          {product ? "Save Changes" : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
