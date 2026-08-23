import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type SectionHeroCta =
  | { label: string; href: string; disabled?: false }
  | { label: string; disabled: true };

/**
 * The hero band shared by every section landing page — breadcrumb, eyebrow,
 * heading, description, two CTAs, image. Structurally identical between
 * Handlooms and Officewear in the approved design; only copy/links differ.
 */
export function SectionHero({
  sectionLabel,
  eyebrow,
  heading,
  description,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
}: {
  sectionLabel: string;
  eyebrow: string;
  heading: React.ReactNode;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: SectionHeroCta;
  secondaryCta: SectionHeroCta;
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-9 pt-10 sm:px-6 sm:pt-11 lg:px-8">
      <div className="mb-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <span className="text-foreground">{sectionLabel}</span>
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-11">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
          <h1 className="mt-3 font-heading text-[2.1rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[2.6rem] lg:text-[2.8rem]">
            {heading}
          </h1>
          <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <HeroCta cta={primaryCta} variant="default" />
            <HeroCta cta={secondaryCta} variant="outline" />
          </div>
        </div>

        <div className="relative aspect-[4/3.2] overflow-hidden rounded-3xl bg-muted">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

function HeroCta({
  cta,
  variant,
}: {
  cta: SectionHeroCta;
  variant: "default" | "outline";
}) {
  if (cta.disabled) {
    return (
      <Button
        size="lg"
        variant={variant}
        disabled
        className="h-11 rounded-xl px-5 text-sm font-medium"
      >
        {cta.label}
      </Button>
    );
  }
  return (
    <Button
      size="lg"
      variant={variant}
      className="h-11 rounded-xl px-5 text-sm font-medium"
      render={<Link href={cta.href} />}
      nativeButton={false}
    >
      {cta.label}
    </Button>
  );
}
