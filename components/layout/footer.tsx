import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { footerNav } from "@/lib/site-config";
import { FacebookGlyph, InstagramGlyph, YoutubeGlyph } from "@/components/social-glyphs";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Authentic handloom sarees, woven by hand and sourced directly
              from master weavers across India — no middlemen, ever.
            </p>
            <div className="mt-5 flex items-center gap-3">
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

          <FooterColumn title="Shop" items={footerNav.shop} />
          <FooterColumn title="Company" items={footerNav.company} />
          <FooterColumn title="Support" items={footerNav.support} />

          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold tracking-wide">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>Kanchipuram, Tamil Nadu, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-primary" />
                <span>+91 90000 00000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-primary" />
                <span>hello@rucirasarees.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Rucira Sarees. Woven with care,
            for the weavers who wove it.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { title: string; href: string }[];
}) {
  return (
    <div className="col-span-1 lg:col-span-2">
      <h3 className="font-heading text-sm font-semibold tracking-wide">
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="transition-colors hover:text-foreground">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
