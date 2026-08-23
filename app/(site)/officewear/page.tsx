import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/section-hero";
import { CategoryBands } from "@/components/officewear/category-bands";
import { NewThisWeek } from "@/components/officewear/new-this-week";
import { TrustStrip } from "@/components/officewear/trust-strip";

export const metadata: Metadata = {
  title: "Officewear | Rucira Collections",
  description:
    "Handloom sarees and unstitched dress materials in crisp cottons and easy blends, cut for the working week.",
};

export default function OfficewearPage() {
  return (
    <>
      <SectionHero
        sectionLabel="Officewear"
        eyebrow="Officewear"
        heading={
          <>
            Handloom that
            <br />
            turns up to work.
          </>
        }
        description="Crisp cottons and easy blends that hold a press through a long day — sarees and unstitched dress materials, priced for more than one."
        image="/images/saree/Mangalagiri-Cotton.jpg"
        imageAlt="A handloom Mangalagiri cotton saree in a crisp, everyday drape"
        primaryCta={{ label: "Shop sarees", disabled: true }}
        secondaryCta={{ label: "Dress materials", disabled: true }}
      />
      <CategoryBands />
      <NewThisWeek />
      <TrustStrip />
    </>
  );
}
