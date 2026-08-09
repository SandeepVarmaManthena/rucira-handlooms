"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  Boxes,
  IndianRupee,
  PackageX,
  PlusCircle,
  Sparkles,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminProductsStore } from "@/store/admin-products-store";
import { formatINR } from "@/lib/utils";
import { mountFadeUp } from "@/lib/motion";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

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
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return (
    <div className="space-y-6">
      <motion.div
        {...mountFadeUp(0)}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            {today.toUpperCase()}
          </p>
          <h1 className="mt-1.5 font-heading text-2xl font-semibold sm:text-3xl">
            {greeting()}, Store Admin
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&rsquo;s how the Rucira Sarees catalogue looks today.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            className="h-10 gap-1.5 rounded-full px-4"
            render={<Link href="/" target="_blank" />}
            nativeButton={false}
          >
            <Store className="size-4" />
            View Store
          </Button>
          <Button
            className="h-10 gap-1.5 rounded-full px-4"
            render={<Link href="/admin/products/new" />}
            nativeButton={false}
          >
            <PlusCircle className="size-4" />
            Add Product
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            {...mountFadeUp(0.05 + i * 0.05)}
            className="group rounded-2xl border border-border bg-card p-5 transition-shadow hover:shadow-[0_10px_30px_rgba(17,17,17,0.06)]"
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
          </motion.div>
        ))}
      </div>

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <motion.div
          {...mountFadeUp(0.25)}
          className="flex items-start gap-3 rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:items-center sm:p-5"
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent-foreground">
            <AlertTriangle className="size-4" />
          </span>
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
        </motion.div>
      )}

      <motion.div
        {...mountFadeUp(0.3)}
        className="rounded-2xl border border-border bg-card"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-base font-semibold">
            Recently added
          </h2>
          {recentProducts.length > 0 && (
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              View all
              <ArrowUpRight className="size-3.5" />
            </Link>
          )}
        </div>

        {recentProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-5 py-16 text-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-5" />
            </span>
            <div>
              <p className="font-heading text-base font-semibold">
                No products yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Add your first saree to start building the catalogue.
              </p>
            </div>
            <Button
              className="mt-1 h-9 gap-1.5 rounded-full px-4"
              render={<Link href="/admin/products/new" />}
              nativeButton={false}
            >
              <PlusCircle className="size-4" />
              Add Product
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {recentProducts.map((product) => (
              <li
                key={product.id}
                className="flex items-center gap-4 px-5 py-3.5"
              >
                <Link
                  href={`/admin/products/${product.id}`}
                  className="flex min-w-0 flex-1 items-center gap-4"
                >
                  <div className="relative size-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <div
                        className={`size-full bg-gradient-to-br ${product.gradient}`}
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {product.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {product.weaver}
                    </p>
                  </div>
                </Link>
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
        )}
      </motion.div>
    </div>
  );
}
