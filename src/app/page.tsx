import { Hero } from "@/components/landing/hero";
import { CommandCenter } from "@/components/landing/command-center";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { AgentPipeline } from "@/components/landing/agent-pipeline";
import { ThreeWays } from "@/components/landing/three-ways";
import { OpenSource } from "@/components/landing/open-source";
import { CookbookTeaser } from "@/components/landing/cookbook-teaser";
import { Pricing } from "@/components/landing/pricing";
import { CtaBanner } from "@/components/landing/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <CommandCenter />
      <HowItWorks />
      <Features />
      <AgentPipeline />
      <ThreeWays />
      <OpenSource />
      <CookbookTeaser />
      <Pricing />
      <CtaBanner />
    </>
  );
}
