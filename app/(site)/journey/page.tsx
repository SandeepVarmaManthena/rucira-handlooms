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
    "From raw thread to finished drape — see exactly how a Rucira saree is made, and meet the weavers behind it.",
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
