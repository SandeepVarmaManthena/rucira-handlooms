"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { CartDrawer } from "@/components/cart-drawer";
import { mainNav } from "@/lib/site-config";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <AnnouncementBar />
      <div
        className={cn(
          "w-full border-b border-border/80 bg-background/80 backdrop-blur-xl transition-all duration-200",
          scrolled && "shadow-[0_10px_30px_rgba(17,17,17,0.05)]",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="-ml-2 h-9 w-9 rounded-full"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[18.5rem] p-0">
                <SheetHeader className="border-b border-border px-5 py-5">
                  <SheetTitle className="font-heading">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-3">
                  {mainNav.map((item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className="rounded-2xl px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-foreground"
                        />
                      }
                    >
                      {item.title}
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto border-t border-border px-5 py-5 text-sm text-muted-foreground">
                  Direct from the weaver&rsquo;s loom to your doorstep.
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/" className="flex items-center lg:mr-6">
            <Logo />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all hover:bg-secondary hover:text-foreground"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-1">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="hidden h-9 w-9 rounded-full sm:inline-flex"
            >
              <Search className="size-[1.15rem]" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              onClick={openCart}
              className="relative h-9 w-9 rounded-full"
            >
              <ShoppingBag className="size-[1.15rem]" />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[0.6rem] font-semibold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      <CartDrawer />
    </header>
  );
}
