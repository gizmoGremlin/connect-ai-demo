"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

export function CtaBanner() {
  return (
    <AnimatedSection className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 via-background to-cyan-500/10 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Put Your Phone to Work?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Join the community building the future of AI-powered phone delegation.
            Tell your phone what to do — and actually mean it.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className={cn(buttonVariants({ size: "lg" }), "gap-2 text-base")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "gap-2 text-base"
              )}
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
