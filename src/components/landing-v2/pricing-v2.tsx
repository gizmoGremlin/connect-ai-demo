"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingV2() {
  return (
    <section className="border-t border-zinc-800/60 bg-zinc-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One Device. One Price.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            No hidden fees. No contracts. Just plug in and go.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {/* Device */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8">
            <p className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
              The Device
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-zinc-100">$99</span>
              <span className="text-sm text-zinc-500">one-time</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Everything you need to start automating.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "CNC aluminum hardware",
                "USB-C & MagSafe connection",
                "Closed audio loop",
                "Bluetooth 5.3",
                "Works with stock iOS",
                "Free shipping",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <Check className="h-4 w-4 text-zinc-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 w-full gap-2"
              )}
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cloud */}
          <div className="relative rounded-2xl border border-blue-500/30 bg-blue-500/5 p-8">
            <div className="absolute -top-3 right-6 rounded-full bg-blue-500 px-3 py-0.5 text-xs font-semibold text-white">
              Recommended
            </div>

            <p className="text-sm font-medium text-blue-400 uppercase tracking-wider">
              Device + Cloud
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold text-zinc-100">$99</span>
              <span className="text-sm text-zinc-500">
                + $5<span className="text-zinc-600">/mo</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Unlock the full AI-powered experience.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                "Everything in Device",
                "AI agent (natural language)",
                "Web control center",
                "Community scripts marketplace",
                "Multi-device management",
                "Priority support",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-3 text-sm text-zinc-300"
                >
                  <Check className="h-4 w-4 text-blue-400 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className={cn(buttonVariants(), "mt-8 w-full gap-2")}
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
