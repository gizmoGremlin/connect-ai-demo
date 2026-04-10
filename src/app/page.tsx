import { HeroV2 } from "@/components/landing-v2/hero-v2";
import { ProductFilm } from "@/components/landing-v2/product-film";
import { SocialProof } from "@/components/landing-v2/social-proof";
import { ProblemSolution } from "@/components/landing-v2/problem-solution";
import { VideoSection } from "@/components/landing-v2/video-section";
import { RealLife } from "@/components/landing-v2/real-life";
import { FeatureBento } from "@/components/landing-v2/feature-bento";
import { AiCapabilities } from "@/components/landing-v2/ai-capabilities";
import { OpenScripts } from "@/components/landing-v2/open-scripts";
import { UseCases } from "@/components/landing-v2/use-cases";
import { HowItWorksV2 } from "@/components/landing-v2/how-it-works-v2";
import { Testimonials } from "@/components/landing-v2/testimonials";
import { Specs } from "@/components/landing-v2/specs";
import { PricingV2 } from "@/components/landing-v2/pricing-v2";
import { Faq } from "@/components/landing-v2/faq";
import { FinalCta } from "@/components/landing-v2/final-cta";

export default function Home() {
  return (
    <>
      <HeroV2 />
      <ProductFilm />
      <SocialProof />
      <ProblemSolution />
      <VideoSection />
      <RealLife />
      <FeatureBento />
      <AiCapabilities />
      <OpenScripts />
      <HowItWorksV2 />
      <UseCases />
      <Testimonials />
      <Specs />
      <PricingV2 />
      <Faq />
      <FinalCta />
    </>
  );
}
