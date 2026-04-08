"use client";

import Link from "next/link";
import { Wrench, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

const parts = [
  "ESP32-S3 microcontroller",
  "USB-C audio interface",
  "3D-printed or aluminum case",
  "MagSafe ring magnet",
  "Basic soldering tools",
];

export function CookbookTeaser() {
  return (
    <AnimatedSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-card">
              <Wrench className="h-5 w-5 text-blue-400" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Build Your Own
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Don&apos;t want to buy the device? No problem. Our cookbook walks you
              through building one yourself with off-the-shelf components. We believe
              in open access.
            </p>
            <Link
              href="/cookbook"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 gap-2"
              )}
            >
              View Cookbook
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/50 p-8">
            <h3 className="font-semibold">What You&apos;ll Need</h3>
            <ul className="mt-4 space-y-3">
              {parts.map((part) => (
                <li
                  key={part}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0" />
                  {part}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Estimated build time: 2-3 hours &middot; Cost: ~$30 in parts
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
