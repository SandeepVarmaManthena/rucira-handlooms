"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm, useWatch, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  AlertCircle,
  Banknote,
  ChevronRight,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/store/cart-store";
import { createOrderNumber, useOrderStore } from "@/store/order-store";
import { formatINR, cn } from "@/lib/utils";
import { mountFadeUp } from "@/lib/motion";
import { SectionHeading } from "@/components/section-heading";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => { open: () => void };
  }
}

type RazorpaySuccessResponse = {
  razorpay_payment_id: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  prefill: { name: string; email: string; contact: string };
  notes?: Record<string, string>;
  theme: { color: string };
  handler: (response: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
};

// No RAZORPAY_KEY_SECRET is configured for this project, so orders are
// created client-side (amount + key only) rather than via the Orders API,
// and there is no payment signature to verify server-side.
const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
  "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
  "Chandigarh",
];

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number"),
  addressLine1: z.string().trim().min(4, "Enter your address"),
  addressLine2: z.string().trim().optional(),
  city: z.string().trim().min(2, "Enter your city"),
  state: z.string().min(1, "Select a state"),
  pincode: z.string().trim().regex(/^\d{6}$/, "Enter a valid 6-digit pincode"),
  note: z.string().trim().optional(),
  paymentMethod: z.enum(["cod", "online"]),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

const PAYMENT_OPTIONS: {
  value: CheckoutValues["paymentMethod"];
  label: string;
  description: string;
  icon: typeof Banknote;
}[] = [
  {
    value: "online",
    label: "Pay online",
    description: "UPI, Cards, Netbanking or Wallets",
    icon: Smartphone,
  },
  {
    value: "cod",
    label: "Cash on Delivery",
    description: "Pay when your saree arrives",
    icon: Banknote,
  },
];

const SECTIONS = ["Contact", "Shipping address", "Note for the weaver", "Payment method"];

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const subtotal = useCartStore((s) => s.subtotal());
  const clearCart = useCartStore((s) => s.clearCart);
  const placeOrder = useOrderStore((s) => s.placeOrder);

  const [razorpayReady, setRazorpayReady] = React.useState(false);
  const [paymentError, setPaymentError] = React.useState<string | null>(null);
  const [isAwaitingPayment, setIsAwaitingPayment] = React.useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "online", state: "" },
  });

  const paymentMethod = useWatch({ control, name: "paymentMethod" });
  const shippingCost = 0;
  const total = subtotal + shippingCost;
  const busy = isSubmitting || isAwaitingPayment;

  const finalizeOrder = React.useCallback(
    (data: CheckoutValues, paymentId?: string) => {
      placeOrder({
        orderNumber: createOrderNumber(),
        items,
        subtotal,
        shippingCost,
        total,
        shipping: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          note: data.note,
        },
        paymentMethod: data.paymentMethod,
        paymentId,
        placedAt: new Date().toISOString(),
      });
      clearCart();
      router.push("/checkout/success");
    },
    [items, subtotal, shippingCost, total, placeOrder, clearCart, router],
  );

  const payOnline = React.useCallback(
    (data: CheckoutValues) => {
      setPaymentError(null);

      if (!RAZORPAY_KEY_ID) {
        setPaymentError(
          "Online payments aren't configured yet. Add NEXT_PUBLIC_RAZORPAY_KEY_ID to your environment to enable them.",
        );
        return;
      }
      if (!razorpayReady || typeof window.Razorpay === "undefined") {
        setPaymentError("Payment gateway is still loading. Please try again in a moment.");
        return;
      }

      setIsAwaitingPayment(true);

      const razorpay = new window.Razorpay({
        key: RAZORPAY_KEY_ID,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "Rucira Sarees",
        description: `Order for ${items.length} item${items.length > 1 ? "s" : ""}`,
        prefill: {
          name: data.fullName,
          email: data.email,
          contact: data.phone,
        },
        theme: { color: "#7c1d2c" },
        handler: (response) => {
          finalizeOrder(data, response.razorpay_payment_id);
        },
        modal: {
          ondismiss: () => {
            setIsAwaitingPayment(false);
          },
        },
      });

      razorpay.open();
    },
    [razorpayReady, total, items.length, finalizeOrder],
  );

  const onSubmit = async (data: CheckoutValues) => {
    if (data.paymentMethod === "online") {
      payOnline(data);
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 900));
    finalizeOrder(data);
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
        <span className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <ShoppingBag className="size-6" />
        </span>
        <p className="mt-4 font-heading text-xl font-semibold">
          Your bag is empty
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Add a saree you love before checking out.
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayReady(true)}
      />

      <div className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground">
        <Link href="/shop" className="hover:text-foreground hover:underline">
          Shop
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground">Checkout</span>
      </div>

      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-primary">
            CHECKOUT
          </p>
          <h1 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
            Complete your order
          </h1>
        </div>
        <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <Lock className="size-3.5 text-primary" />
          256-bit encrypted checkout
        </span>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_24rem]"
      >
        <div className="space-y-6">
          <motion.section
            {...mountFadeUp(0)}
            className="rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"
          >
            <SectionHeading index={1} title={SECTIONS[0]} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="fullName">Full name</Label>
                <Input
                  id="fullName"
                  className="mt-1.5"
                  placeholder="Anjali Rao"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Mobile number</Label>
                <Input
                  id="phone"
                  inputMode="numeric"
                  className="mt-1.5"
                  placeholder="98765 43210"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="mt-1.5"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </motion.section>

          <motion.section
            {...mountFadeUp(0.05)}
            className="rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"
          >
            <SectionHeading index={2} title={SECTIONS[1]} />
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="addressLine1">Address</Label>
                <Input
                  id="addressLine1"
                  className="mt-1.5"
                  placeholder="Flat, house no., street"
                  {...register("addressLine1")}
                />
                {errors.addressLine1 && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.addressLine1.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="addressLine2">
                  Apartment, landmark (optional)
                </Label>
                <Input
                  id="addressLine2"
                  className="mt-1.5"
                  placeholder="Near..."
                  {...register("addressLine2")}
                />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  className="mt-1.5"
                  placeholder="Bengaluru"
                  {...register("city")}
                />
                {errors.city && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="pincode">Pincode</Label>
                <Input
                  id="pincode"
                  inputMode="numeric"
                  className="mt-1.5"
                  placeholder="560001"
                  {...register("pincode")}
                />
                {errors.pincode && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label>State</Label>
                <Controller
                  control={control}
                  name="state"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="mt-1.5 w-full">
                        <SelectValue placeholder="Select a state" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.state && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.state.message}
                  </p>
                )}
              </div>
            </div>
          </motion.section>

          <motion.section
            {...mountFadeUp(0.1)}
            className="rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"
          >
            <SectionHeading index={3} title={SECTIONS[2]} />
            <p className="mt-1 pl-9 text-xs text-muted-foreground">
              Optional. A gift message, or delivery instructions.
            </p>
            <Textarea
              className="mt-3"
              rows={3}
              placeholder="e.g. Please deliver after 6pm"
              {...register("note")}
            />
          </motion.section>

          <motion.section
            {...mountFadeUp(0.15)}
            className="rounded-[1.5rem] border border-border bg-card p-5 sm:p-6"
          >
            <SectionHeading index={4} title={SECTIONS[3]} />
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={(value) => {
                    setPaymentError(null);
                    field.onChange(value);
                  }}
                  className="mt-4 gap-3"
                >
                  {PAYMENT_OPTIONS.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3.5 transition-colors",
                        field.value === option.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      <RadioGroupItem value={option.value} />
                      <option.icon className="size-4 shrink-0 text-primary" />
                      <span className="flex-1">
                        <span className="flex items-center gap-2 text-sm font-medium">
                          {option.label}
                          {option.value === "online" && (
                            <Badge
                              variant="secondary"
                              className="h-4.5 rounded-full px-1.5 text-[0.6rem] font-semibold tracking-wide text-primary"
                            >
                              TEST MODE
                            </Badge>
                          )}
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {option.description}
                        </span>
                      </span>
                    </label>
                  ))}
                </RadioGroup>
              )}
            />

            {paymentMethod === "online" && (
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="size-3.5 text-primary" />
                  UPI
                </span>
                <span className="flex items-center gap-1.5">
                  <CreditCard className="size-3.5 text-primary" />
                  Cards
                </span>
                <span className="flex items-center gap-1.5">
                  <Landmark className="size-3.5 text-primary" />
                  Netbanking
                </span>
                <span className="ml-auto flex items-center gap-1.5 text-foreground/70">
                  <ShieldCheck className="size-3.5 text-primary" />
                  Secured by Razorpay
                </span>
              </div>
            )}

            {paymentError && (
              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                <AlertCircle className="mt-0.5 size-4 shrink-0" />
                <p>{paymentError}</p>
              </div>
            )}
          </motion.section>
        </div>

        <motion.div {...mountFadeUp(0.1)} className="h-fit lg:sticky lg:top-24">
          <div className="rounded-[1.5rem] border border-border bg-card p-5 sm:p-6">
            <h2 className="font-heading text-base font-semibold">
              Order summary
            </h2>

            <div className="mt-4 max-h-72 space-y-3 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
                    {item.image.startsWith("/") ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div
                        className={`size-full bg-gradient-to-br ${item.image}`}
                      />
                    )}
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-foreground text-[0.65rem] font-semibold text-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {formatINR(item.price)} &times; {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold">
                    {formatINR(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">
                  {formatINR(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-primary">Free</span>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-base font-semibold">
                <span>Total</span>
                <span>{formatINR(total)}</span>
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={busy}
              className="mt-5 w-full rounded-full"
            >
              {busy ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  {isAwaitingPayment ? "Waiting for payment..." : "Placing your order..."}
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  {paymentMethod === "online"
                    ? `Pay ${formatINR(total)} securely`
                    : "Place order"}
                </>
              )}
            </Button>

            <div className="mt-4 flex flex-col gap-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-3.5 shrink-0 text-primary" />
                Your details are only used to fulfil this order
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="size-3.5 shrink-0 text-primary" />
                Dispatched within 2 to 3 business days
              </span>
            </div>
          </div>
        </motion.div>
      </form>
    </div>
  );
}
