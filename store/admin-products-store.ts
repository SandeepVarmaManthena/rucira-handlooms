import { create } from "zustand";
import { persist } from "zustand/middleware";
import { catalogProducts, type Product } from "@/lib/mock-data";

export type AdminProduct = Product & {
  /** Units currently in stock. 0 = out of stock, 1-5 = low stock. */
  stock: number;
  /** Data URLs for any images uploaded/generated in the admin panel. */
  images: string[];
};

const SEED_STOCK: Record<string, number> = {
  "rc-001": 14,
  "rc-002": 22,
  "rc-003": 0,
  "rc-004": 18,
  "rc-005": 3,
  "rc-006": 27,
  "rc-007": 9,
  "rc-008": 0,
  "rc-009": 6,
  "rc-010": 4,
  "rc-011": 2,
  "rc-012": 11,
};

function seedProducts(): AdminProduct[] {
  return catalogProducts.map((product) => ({
    ...product,
    stock: SEED_STOCK[product.id] ?? 10,
    images: [],
  }));
}

function generateId() {
  return `rc-${Math.random().toString(36).slice(2, 8)}`;
}

type AdminProductsState = {
  products: AdminProduct[];
  addProduct: (product: Omit<AdminProduct, "id">) => AdminProduct;
  updateProduct: (id: string, updates: Partial<Omit<AdminProduct, "id">>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => AdminProduct | undefined;
};

export const useAdminProductsStore = create<AdminProductsState>()(
  persist(
    (set, get) => ({
      products: seedProducts(),
      addProduct: (product) => {
        const newProduct: AdminProduct = { ...product, id: generateId() };
        set((state) => ({ products: [newProduct, ...state.products] }));
        return newProduct;
      },
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p,
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProduct: (id) => get().products.find((p) => p.id === id),
    }),
    { name: "rucira-admin-products" },
  ),
);
