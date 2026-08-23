"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { mountFadeUp } from "@/lib/motion";
import { FacebookGlyph, InstagramGlyph, YoutubeGlyph } from "@/components/social-glyphs";

type ContactDetail = {
  icon: typeof MapPin;
  label: string;
  href?: string;
};

const DETAILS: ContactDetail[] = [
  { icon: MapPin, label: "Kanchipuram, Tamil Nadu, India" },
  { icon: Phone, label: "+91 90000 00000", href: "tel:+919000000000" },
  { icon: Mail, label: "hello@rucirasarees.com", href: "mailto:hello@rucirasarees.com" },
];

export function ContactInfo() {
  return (
    <motion.div {...mountFadeUp(0.1)} className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <h2 className="font-heading text-lg font-semibold">Reach us directly</h2>
      <ul className="mt-5 space-y-4 text-sm">
        {DETAILS.map(({ icon: Icon, label, href }) => (
          <li key={label} className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-4" />
            </span>
            {href ? (
              <Link href={href} className="pt-1.5 text-foreground/90 transition-colors hover:text-primary">
                {label}
              </Link>
            ) : (
              <span className="pt-1.5 text-foreground/90">{label}</span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Follow along
        </p>
        <div className="mt-3 flex items-center gap-3">
          {[InstagramGlyph, FacebookGlyph, YoutubeGlyph].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              aria-label="Social link"
              className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Icon className="size-4" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
