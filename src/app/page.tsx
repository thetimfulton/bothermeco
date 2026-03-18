import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import ProductGrid from "@/components/sections/ProductGrid";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FadeIn from "@/components/FadeIn";

export default function Home() {
  return (
    <main>
      <Hero />
      <FadeIn>
        <HowItWorks />
      </FadeIn>
      <FadeIn>
        <ProductGrid />
      </FadeIn>
      <FadeIn>
        <Pricing />
      </FadeIn>
      <FadeIn>
        <Testimonials />
      </FadeIn>
      <FadeIn>
        <FAQ />
      </FadeIn>
    </main>
  );
}
