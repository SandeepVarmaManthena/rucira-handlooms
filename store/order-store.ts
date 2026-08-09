import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/store/cart-store";

export type ShippingDetails = {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  note?: string;
};

export type PaymentMethod = "cod" | "online";

export type PlacedOrder = {
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  shipping: ShippingDetails;
  paymentMethod: PaymentMethod;
  paymentId?: string;
  placedAt: string;
};

type OrderState = {
  lastOrder: PlacedOrder | null;
  placeOrder: (order: PlacedOrder) => void;
};

function generateOrderNumber() {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `RC-${digits}`;
}

export function createOrderNumber() {
  return generateOrderNumber();
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      lastOrder: null,
      placeOrder: (order) => set({ lastOrder: order }),
    }),
    { name: "rucira-last-order" },
  ),
);
