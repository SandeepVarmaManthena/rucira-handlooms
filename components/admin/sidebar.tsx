"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Store,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    isActive: (pathname: string) => pathname === "/admin",
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    isActive: (pathname: string) =>
      pathname === "/admin/products" ||
      (pathname.startsWith("/admin/products/") && pathname !== "/admin/products/new"),
  },
  {
    title: "Add Product",
    href: "/admin/products/new",
    icon: PlusCircle,
    isActive: (pathname: string) => pathname === "/admin/products/new",
  },
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
          const active = item.isActive(pathname);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "text-primary"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="admin-nav-pill"
                  className="absolute inset-0 -z-10 rounded-lg bg-primary/10"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <item.icon className="size-4" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-border p-3">
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2">
          <Avatar size="sm">
            <AvatarFallback className="bg-primary/10 text-primary">
              RS
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">Store Admin</p>
            <p className="truncate text-xs text-muted-foreground">
              Rucira Sarees
            </p>
          </div>
        </div>
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
