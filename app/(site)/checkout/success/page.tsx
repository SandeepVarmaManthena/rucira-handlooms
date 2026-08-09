"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Banknote,
  CheckCircle2,
  CreditCard,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/order-store";
import { formatINR } from "@/lib/utils";
import { EASE, fadeUp } from "@/lib/motion";

export default function CheckoutSuccessPage() {
  const order = useOrderStore((s) => s.lastOrder);

  if (!order) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <ShoppingBag className="size-6" />
        </span>
        <p className="mt-4 font-heading text-xl font-semibold">
          No recent order found
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Place an order to see your confirmation here.
        </p>
        <Button
          className="mt-6 h-11 rounded-full px-6"
          render={<Link href="/shop" />}
          nativeButton={false}
        >
          Browse the collection
        </Button>
      </div>
    );
  }

  const placedDate = new Date(order.placedAt);
  const deliveryFrom = new Date(placedDate);
  deliveryFrom.setDate(deliveryFrom.getDate() + 5);
  const deliveryTo = new Date(placedDate);
  deliveryTo.setDate(deliveryTo.getDate() + 8);
  const dateFormatter = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary"
        >
          <CheckCircle2 className="size-8" />
        </motion.span>
        <motion.p
          {...fadeUp(0.1)}
          className="mt-5 text-xs font-semibold tracking-[0.2em] text-primary"
        >
          ORDER CONFIRMED
        </motion.p>
        <motion.h1
          {...fadeUp(0.15)}
          className="mt-2 text-balance font-heading text-3xl font-semibold sm:text-4xl"
        >
          Thank you, your saree is on its way.
        </motion.h1>
        <motion.p {...fadeUp(0.2)} className="mt-3 text-balance text-muted-foreground">
          A confirmation has been sent to {order.shipping.email}. Your order
          number is{" "}
          <span className="font-semibold text-foreground">
            {order.orderNumber}
          </span>
          .
        </motion.p>
      </div>

      <motion.div
        {...fadeUp(0.25)}
        className="mt-10 rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div className="flex items-center gap-2 text-sm">
            <Package className="size-4 text-primary" />
            <span className="font-medium">Estimated delivery</span>
          </div>
          <span className="text-sm text-muted-foreground">
            {dateFormatter.format(deliveryFrom)} &ndash;{" "}
            {dateFormatter.format(deliveryTo)}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-3">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-muted">
                {item.image.startsWith("/") ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                ) : (
                  <div className={`size-full bg-gradient-to-br ${item.image}`} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-semibold">
                {formatINR(item.price * item.quantity)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span className="font-medium text-foreground">
              {formatINR(order.subtotal)}
            </span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Shipping</span>
            <span className="font-medium text-primary">Free</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
            <span>Total paid</span>
            <span>{formatINR(order.total)}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl bg-secondary/40 p-3.5 text-sm">
          <span className="flex items-center gap-2 text-foreground/85">
            {order.paymentMethod === "online" ? (
              <CreditCard className="size-4 shrink-0 text-primary" />
            ) : (
              <Banknote className="size-4 shrink-0 text-primary" />
            )}
            {order.paymentMethod === "online" ? "Paid online via Razorpay" : "Cash on Delivery"}
          </span>
          {order.paymentId && (
            <span className="shrink-0 truncate text-xs text-muted-foreground">
              Ref. {order.paymentId}
            </span>
          )}
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-2xl bg-secondary/40 p-3.5 text-sm">
          <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-foreground/85">
            {order.shipping.fullName}, {order.shipping.addressLine1}
            {order.shipping.addressLine2
              ? `, ${order.shipping.addressLine2}`
              : ""}
            , {order.shipping.city}, {order.shipping.state}{" "}
            {order.shipping.pincode}
          </p>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp(0.3)}
        className="mt-8 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center"
      >
        <Button
          size="lg"
          className="h-11 w-full rounded-full sm:w-auto"
          render={<Link href="/shop" />}
          nativeButton={false}
        >
          Continue shopping
        </Button>
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          Back to home
        </Link>
      </motion.div>
    </div>
  );
}
