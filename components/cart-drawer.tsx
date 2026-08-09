"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { formatINR } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore((s) => s.subtotal());

  return (
    <Sheet open={isOpen} onOpenChange={(next) => (next ? undefined : closeCart())}>
      <SheetContent side="right" className="flex w-full max-w-md flex-col border-l border-border bg-background p-0">
        <SheetHeader className="border-b border-border px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <SheetTitle className="flex items-center gap-2 font-heading text-lg font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                <ShoppingBag className="size-4" />
              </span>
              Your bag
            </SheetTitle>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="Close cart"
              onClick={closeCart}
              className="rounded-full"
            >
              <X className="size-4" />
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
                <ShoppingBag className="size-6" />
              </div>
              <div>
                <p className="font-heading text-xl font-semibold">Your bag is empty</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Add a saree you love and we will keep it ready for checkout.
                </p>
              </div>
              <Button variant="secondary" className="rounded-full" onClick={closeCart} asChild>
                <Link href="/shop">Continue shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="rounded-2xl border border-border bg-card p-3">
                  <div className="flex gap-3">
                    <div className="relative h-24 w-20 overflow-hidden rounded-xl bg-muted">
                      {item.image.startsWith("/") ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      ) : (
                        <div className={`h-full w-full bg-gradient-to-br ${item.image}`} />
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="line-clamp-2 text-sm font-medium text-foreground">{item.name}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{formatINR(item.price)}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeItem(item.id)}
                          className="rounded-full"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-1.5 py-1">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Decrease quantity for ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-full"
                          >
                            <Minus className="size-3.5" />
                          </Button>
                          <span className="min-w-4 text-center text-sm font-medium">{item.quantity}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon-xs"
                            aria-label={`Increase quantity for ${item.name}`}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-full"
                          >
                            <Plus className="size-3.5" />
                          </Button>
                        </div>

                        <p className="text-sm font-semibold">{formatINR(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border bg-card/60 p-5">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">{formatINR(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-foreground">Free</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-base font-semibold">Total</span>
              <span className="text-lg font-semibold">{formatINR(subtotal)}</span>
            </div>

            <Button className="mt-5 w-full rounded-full" size="lg" onClick={closeCart} asChild>
              <Link href="/shop">Proceed to checkout</Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
