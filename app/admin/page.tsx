"use client";

import Link from "next/link";
import { AlertTriangle, ArrowUpRight, PackageX, Boxes, IndianRupee } from "lucide-react";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { formatINR } from "@/lib/utils";

export default function AdminDashboardPage() {
  const products = useAdminProductsStore((s) => s.products);

  const totalProducts = products.length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
  const outOfStock = products.filter((p) => p.stock === 0);
  const inventoryValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const stats: {
    label: string;
    value: string | number;
    icon: typeof Boxes;
    tone?: "default" | "warn" | "danger";
  }[] = [
    {
      label: "Total Products",
      value: totalProducts,
      icon: Boxes,
    },
    {
      label: "Low Stock",
      value: lowStock.length,
      icon: AlertTriangle,
      tone: lowStock.length > 0 ? "warn" : "default",
    },
    {
      label: "Out of Stock",
      value: outOfStock.length,
      icon: PackageX,
      tone: outOfStock.length > 0 ? "danger" : "default",
    },
    {
      label: "Inventory Value",
      value: formatINR(inventoryValue),
      icon: IndianRupee,
    },
  ];

  const recentProducts = products.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between">
              <span
                className={
                  stat.tone === "danger"
                    ? "flex size-9 items-center justify-center rounded-full bg-destructive/10 text-destructive"
                    : stat.tone === "warn"
                      ? "flex size-9 items-center justify-center rounded-full bg-accent/20 text-accent-foreground"
                      : "flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary"
                }
              >
                <stat.icon className="size-4" />
              </span>
            </div>
            <p className="mt-4 font-heading text-2xl font-semibold">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:p-5">
          <p className="text-sm font-medium text-foreground">
            {outOfStock.length > 0 && (
              <>
                <strong>{outOfStock.length}</strong> product
                {outOfStock.length === 1 ? " is" : "s are"} out of stock
                {lowStock.length > 0 && ", and "}
              </>
            )}
            {lowStock.length > 0 && (
              <>
                <strong>{lowStock.length}</strong> product
                {lowStock.length === 1 ? " is" : "s are"} running low.
              </>
            )}{" "}
            <Link
              href="/admin/products"
              className="font-semibold text-primary hover:underline"
            >
              Review stock
            </Link>
          </p>
        </div>
      )}

      <div className="rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-base font-semibold">
            Recently added
          </h2>
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
        <ul className="divide-y divide-border">
          {recentProducts.map((product) => (
            <li
              key={product.id}
              className="flex items-center gap-4 px-5 py-3.5"
            >
              <div
                className={`size-11 shrink-0 rounded-lg bg-gradient-to-br ${product.gradient}`}
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {product.weaver}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold">
                {formatINR(product.price)}
              </p>
              <span
                className={
                  product.stock === 0
                    ? "shrink-0 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive"
                    : product.stock <= 5
                      ? "shrink-0 rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent-foreground"
                      : "shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                }
              >
                {product.stock === 0 ? "Out of stock" : `${product.stock} in stock`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
