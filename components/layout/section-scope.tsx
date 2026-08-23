"use client";

import { usePathname } from "next/navigation";

export type Section = "handlooms" | "officewear";

function sectionFor(pathname: string): Section | undefined {
  if (pathname === "/handlooms" || pathname.startsWith("/handlooms/")) return "handlooms";
  if (pathname === "/officewear" || pathname.startsWith("/officewear/")) return "officewear";
  // Journey/story and weaver-story content is Handlooms-owned in the brand's
  // own architecture, not a neutral cross-section page like cart/checkout.
  if (pathname === "/journey" || pathname.startsWith("/journey/")) return "handlooms";
  if (pathname === "/weavers" || pathname.startsWith("/weavers/")) return "handlooms";
  return undefined;
}

/**
 * Tags an ancestor of the header/footer with the active section so
 * `[data-section]` tokens in globals.css re-skin the whole chrome. Cart,
 * checkout and account routes fall outside both prefixes and stay neutral.
 */
export function SectionScope({ children }: { children: React.ReactNode }) {
  const section = sectionFor(usePathname());
  return (
    <div data-section={section} className="flex min-h-full flex-1 flex-col">
      {children}
    </div>
  );
}
