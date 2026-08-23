import { CtaBanner } from "@/components/motion/cta-banner";

export function JourneyCta() {
  return (
    <CtaBanner
      heading="Ready to bring one home?"
      description="Every saree in our collection comes with a story, a maker and a craft tradition behind it."
      ctaLabel="Shop the Collection"
      ctaHref="/shop"
    />
  );
}
