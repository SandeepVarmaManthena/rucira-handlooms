"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoreVertical, Package, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdminProductsStore, type AdminProduct } from "@/store/admin-products-store";
import { formatINR } from "@/lib/utils";
import { mountFadeUp } from "@/lib/motion";
import { CATEGORY_FILTERS } from "@/lib/shop-filters";

function stockBadge(stock: number) {
  if (stock === 0) {
    return (
      <span className="inline-flex rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        Out of stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="inline-flex rounded-full bg-accent/20 px-2.5 py-1 text-xs font-medium text-accent-foreground">
        Low &middot; {stock} left
      </span>
    );
  }
  return (
    <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
      {stock} in stock
    </span>
  );
}

function ProductThumb({ product }: { product: AdminProduct }) {
  return (
    <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-muted">
      {product.images[0] ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={product.images[0]}
          alt=""
          className="size-full object-cover"
        />
      ) : (
        <div className={`size-full bg-gradient-to-br ${product.gradient}`} />
      )}
    </div>
  );
}

const categoryLabel = new Map(CATEGORY_FILTERS.map((c) => [c.value, c.label]));

function RowActions({
  product,
  onDelete,
}: {
  product: AdminProduct;
  onDelete: (product: AdminProduct) => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Actions for ${product.name}`}
          />
        }
      >
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem render={<Link href={`/admin/products/${product.id}`} />}>
          <Pencil className="size-3.5" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="size-3.5" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function AdminProductsPage() {
  const products = useAdminProductsStore((s) => s.products);
  const deleteProduct = useAdminProductsStore((s) => s.deleteProduct);
  const [query, setQuery] = React.useState("");
  const [pendingDelete, setPendingDelete] = React.useState<AdminProduct | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.weaver.toLowerCase().includes(query.toLowerCase()),
  );

  const confirmDelete = () => {
    if (!pendingDelete) return;
    deleteProduct(pendingDelete.id);
    setPendingDelete(null);
  };

  return (
    <div className="space-y-5">
      <motion.div
        {...mountFadeUp(0)}
        className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="h-10 rounded-full pl-9"
            />
          </div>
          <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">
            {filtered.length} of {products.length} product{products.length === 1 ? "" : "s"}
          </span>
        </div>
        <Button
          className="h-10 gap-1.5 rounded-full px-5"
          render={<Link href="/admin/products/new" />}
          nativeButton={false}
        >
          <Plus className="size-4" />
          Add Product
        </Button>
      </motion.div>

      <motion.div {...mountFadeUp(0.08)}>
        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-border bg-card sm:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-5">Product</TableHead>
                <TableHead>Weave</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="pr-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="pl-5">
                    <Link
                      href={`/admin/products/${product.id}`}
                      className="flex items-center gap-3"
                    >
                      <ProductThumb product={product} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {product.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {product.weaver}
                        </p>
                      </div>
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {categoryLabel.get(product.category) ?? product.category}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {formatINR(product.price)}
                  </TableCell>
                  <TableCell>{stockBadge(product.stock)}</TableCell>
                  <TableCell className="pr-5 text-right">
                    <RowActions product={product} onDelete={setPendingDelete} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filtered.length === 0 && (
            <EmptyState hasProducts={products.length > 0} query={query} />
          )}
        </div>

        {/* Mobile card list */}
        <div className="space-y-3 sm:hidden">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <Link href={`/admin/products/${product.id}`} className="shrink-0">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt=""
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className={`size-full bg-gradient-to-br ${product.gradient}`} />
                    )}
                  </div>
                </Link>
                <Link
                  href={`/admin/products/${product.id}`}
                  className="min-w-0 flex-1"
                >
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {product.weaver}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {categoryLabel.get(product.category) ?? product.category}
                  </p>
                </Link>
                <RowActions product={product} onDelete={setPendingDelete} />
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm font-semibold">
                  {formatINR(product.price)}
                </span>
                {stockBadge(product.stock)}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="rounded-2xl border border-border bg-card">
              <EmptyState hasProducts={products.length > 0} query={query} />
            </div>
          )}
        </div>
      </motion.div>

      <Dialog
        open={pendingDelete !== null}
        onOpenChange={(open) => !open && setPendingDelete(null)}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete this product?</DialogTitle>
            <DialogDescription>
              {pendingDelete && (
                <>
                  <strong className="text-foreground">{pendingDelete.name}</strong>{" "}
                </>
              )}
              will be removed from the storefront. This can&rsquo;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-2 bg-transparent">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setPendingDelete(null)}
            >
              Cancel
            </Button>
            <Button
              className="rounded-full bg-destructive text-white hover:bg-destructive/85"
              onClick={confirmDelete}
            >
              <Trash2 className="size-4" />
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyState({ hasProducts, query }: { hasProducts: boolean; query: string }) {
  if (!hasProducts) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Package className="size-5" />
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
          <Plus className="size-4" />
          Add Product
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="font-heading text-base font-semibold">
        No products match &ldquo;{query}&rdquo;
      </p>
      <p className="mt-1 text-sm text-muted-foreground">
        Try a different search term.
      </p>
    </div>
  );
}
