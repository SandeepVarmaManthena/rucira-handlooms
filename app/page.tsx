import { Hero } from "@/components/home/hero";
import { CategoryGrid } from "@/components/home/category-grid";
import { WeaverStory } from "@/components/home/weaver-story";
import { FeaturedProducts } from "@/components/home/featured-products";
import { CraftProcess } from "@/components/home/craft-process";
import { ImpactStats } from "@/components/home/impact-stats";
import { Testimonials } from "@/components/home/testimonials";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <WeaverStory />
      <FeaturedProducts />
      <CraftProcess />
      <ImpactStats />
      <Testimonials />
      <Newsletter />
    </>
  );
}
