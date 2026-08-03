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
import { mainNav } from "@/lib/site-config";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

export function Header() {
  const itemCount = useCartStore((s) => s.itemCount());
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
          "w-full border-b border-border/80 bg-background/85 backdrop-blur-md transition-shadow",
          scrolled && "shadow-sm",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open menu"
                    className="-ml-2"
                  />
                }
              >
                <Menu className="size-5" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[19rem] p-0">
                <SheetHeader className="border-b border-border px-5 py-5">
                  <SheetTitle className="font-heading">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col px-2 py-3">
                  {mainNav.map((item) => (
                    <SheetClose
                      key={item.href}
                      nativeButton={false}
                      render={
                        <Link
                          href={item.href}
                          className="rounded-md px-3 py-3 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-foreground"
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
                className="rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
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
              className="hidden sm:inline-flex"
            >
              <Search className="size-[1.15rem]" />
            </Button>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label="Cart"
              className="relative"
            >
              <ShoppingBag className="size-[1.15rem]" />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-accent text-[0.6rem] font-semibold text-accent-foreground">
                  {itemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
