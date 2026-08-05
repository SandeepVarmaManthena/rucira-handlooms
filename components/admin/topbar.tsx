"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { ADMIN_NAV_ITEMS } from "@/components/admin/sidebar";
import { cn } from "@/lib/utils";

function deriveTitle(pathname: string) {
  if (pathname === "/admin") return "Dashboard";
  if (pathname === "/admin/products") return "Products";
  if (pathname === "/admin/products/new") return "Add Product";
  if (/^\/admin\/products\/[^/]+$/.test(pathname)) return "Edit Product";
  return "Admin";
}

export function AdminTopbar() {
  const pathname = usePathname();
  const title = deriveTitle(pathname);
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex h-16 items-center justify-between gap-3 border-b border-border bg-background px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="-ml-2 lg:hidden" />
            }
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SheetHeader className="border-b border-border px-5 py-5">
              <SheetTitle>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-3 py-4">
              {ADMIN_NAV_ITEMS.map((item) => {
                const active =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
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
              <Link
                href="/"
                className="mt-2 flex items-center gap-2.5 rounded-lg border-t border-border px-3 pt-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                <Store className="size-4" />
                View Store
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <h1 className="font-heading text-lg font-semibold">{title}</h1>
      </div>

      <ThemeToggle />
    </header>
  );
}
