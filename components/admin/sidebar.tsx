"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Store,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const ADMIN_NAV_ITEMS = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Products", href: "/admin/products", icon: Package },
  { title: "Add Product", href: "/admin/products/new", icon: PlusCircle },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-card lg:flex">
      <div className="flex h-16 items-center border-b border-border px-5">
        <Link href="/admin">
          <Logo />
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              <item.icon className="size-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-foreground/70 transition-colors hover:bg-secondary hover:text-foreground"
        >
          <Store className="size-4" />
          View Store
        </Link>
      </div>
    </aside>
  );
}
