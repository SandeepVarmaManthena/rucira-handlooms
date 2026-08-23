import type { Metadata } from "next";
import { AboutHero } from "@/components/about/about-hero";
import { AboutStory } from "@/components/about/about-story";
import { AboutValues } from "@/components/about/about-values";
import { ImpactStats } from "@/components/home/impact-stats";
import { CtaBanner } from "@/components/motion/cta-banner";

export const metadata: Metadata = {
  title: "About | Rucira Collections",
  description:
    "Why Rucira exists: authentic handloom sarees, sourced directly from master weavers across India, with no middlemen.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <ImpactStats />
      <CtaBanner
        heading="See how it's made."
        description="From raw yarn to finished drape, every saree we sell starts with a real loom and a real family."
        ctaLabel="Read the Journey"
        ctaHref="/journey"
      />
    </>
  );
}
