import { HeroV2 } from "@/components/landing-v2/hero-v2";
import { SocialProof } from "@/components/landing-v2/social-proof";
import { VideoSection } from "@/components/landing-v2/video-section";
import { UseCases } from "@/components/landing-v2/use-cases";
import { HowItWorksV2 } from "@/components/landing-v2/how-it-works-v2";
import { Testimonials } from "@/components/landing-v2/testimonials";
import { Specs } from "@/components/landing-v2/specs";
import { PricingV2 } from "@/components/landing-v2/pricing-v2";
import { Faq } from "@/components/landing-v2/faq";
import { FinalCta } from "@/components/landing-v2/final-cta";

export default function LandingV2() {
  return (
    <>
      <HeroV2 />
      <SocialProof />
      <VideoSection />
      <UseCases />
      <HowItWorksV2 />
      <Testimonials />
      <Specs />
      <PricingV2 />
      <Faq />
      <FinalCta />
    </>
  );
}
