import type { Metadata } from "next";
import { JourneyHero } from "@/components/journey/journey-hero";
import { Philosophy } from "@/components/journey/philosophy";
import { ProcessTimeline } from "@/components/journey/process-timeline";
import { Certifications } from "@/components/journey/certifications";
import { WeaverSpotlight } from "@/components/journey/weaver-spotlight";
import { WeavingRegions } from "@/components/journey/weaving-regions";
import { Faq } from "@/components/journey/faq";
import { JourneyCta } from "@/components/journey/journey-cta";

export const metadata: Metadata = {
  title: "Our Journey — Rucira Sarees",
  description:
    "See how each Rucira saree is made, from fibre to finish, and meet the artisan families behind the weave.",
};

export default function JourneyPage() {
  return (
    <>
      <JourneyHero />
      <Philosophy />
      <ProcessTimeline />
      <Certifications />
      <WeaverSpotlight />
      <WeavingRegions />
      <Faq />
      <JourneyCta />
    </>
  );
}
