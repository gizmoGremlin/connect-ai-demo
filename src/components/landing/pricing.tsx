"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Device",
    price: "$99",
    period: "one-time",
    description: "The Connect AI hardware device",
    features: [
      "USB-C & MagSafe connection",
      "Closed audio loop",
      "Works with any iPhone",
      "Bluetooth support",
      "Aluminum case",
    ],
    cta: "Purchase Device",
    href: "#",
    primary: false,
  },
  {
    name: "Cloud",
    price: "$5",
    period: "/month",
    description: "Command center & cloud features",
    features: [
      "AI agent in the ctrl center",
      "Community skills marketplace",
      "Natural language task delegation",
      "Multi-device management",
      "Priority support",
    ],
    cta: "Get Started",
    href: "/signup",
    primary: true,
  },
];

export function Pricing() {
  return (
    <AnimatedSection className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Buy the device, subscribe to the cloud. That&apos;s it.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.primary
                  ? "border-blue-500/40 bg-blue-500/5"
                  : "border-border/60 bg-card/50"
              }`}
            >
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-blue-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={cn(
                  buttonVariants({
                    variant: plan.primary ? "default" : "outline",
                  }),
                  "mt-8 w-full"
                )}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
