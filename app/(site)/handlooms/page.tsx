import type { Metadata } from "next";
import { SectionHero } from "@/components/sections/section-hero";
import { WeaveGrid } from "@/components/handlooms/weave-grid";
import { NewOnTheLoom } from "@/components/handlooms/new-on-the-loom";
import { JourneyTeaser } from "@/components/handlooms/journey-teaser";

export const metadata: Metadata = {
  title: "Handlooms | Rucira Collections",
  description:
    "Eight handloom weaving traditions, sourced directly from the villages that make them — Kanjivaram, Banarasi, Tussar, Kota Doria and more.",
};

export default function HandloomsPage() {
  return (
    <>
      <SectionHero
        sectionLabel="Handlooms"
        eyebrow="Handlooms"
        heading={
          <>
            Eight traditions.
            <br />
            One loom at a time.
          </>
        }
        description="Every weave here has its own origin, its own process and its own cluster of villages. Start with the cloth, or start with the story."
        image="/images/saree/Banarasi-Silk.jpg"
        imageAlt="A handwoven Banarasi silk saree draped to show its zari border"
        primaryCta={{ label: "Shop all handlooms", href: "/shop" }}
        secondaryCta={{ label: "Read the journeys", href: "/journey" }}
      />
      <WeaveGrid />
      <NewOnTheLoom />
      <JourneyTeaser />
    </>
  );
}
