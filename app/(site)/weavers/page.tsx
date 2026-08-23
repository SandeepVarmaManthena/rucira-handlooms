import type { Metadata } from "next";
import { WeaversHero } from "@/components/weavers/weavers-hero";
import { ImpactStats } from "@/components/home/impact-stats";
import { FeaturedWeaver } from "@/components/weavers/featured-weaver";
import { WeaverRoster } from "@/components/weavers/weaver-roster";
import { HowWeWork } from "@/components/weavers/how-we-work";
import { CtaBanner } from "@/components/motion/cta-banner";

export const metadata: Metadata = {
  title: "The Weavers | Rucira Collections",
  description:
    "Meet the artisan families behind every Rucira saree — direct relationships, fair pay, no middlemen.",
};

export default function WeaversPage() {
  return (
    <>
      <WeaversHero />
      <ImpactStats />
      <FeaturedWeaver />
      <WeaverRoster />
      <HowWeWork />
      <CtaBanner
        heading="See the craft for yourself."
        description="From raw yarn to finished drape — the process behind every saree in our collection."
        ctaLabel="Explore the Journey"
        ctaHref="/journey"
      />
    </>
  );
}
