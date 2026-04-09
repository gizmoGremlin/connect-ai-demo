"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingV2() {
  return (
    <section id="pricing" className="bg-gray-50 py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            One Device. One Price.
          </h2>
          <p className="mt-4 text-[17px] text-gray-500">
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
          <div className="rounded-2xl border border-gray-200/60 bg-white p-8 transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50">
            <p className="text-[13px] font-semibold text-gray-400 uppercase tracking-wider">
              The Device
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">$99</span>
              <span className="text-[14px] text-gray-400">one-time</span>
            </div>
            <p className="mt-3 text-[14px] text-gray-500">
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
                  className="flex items-center gap-3 text-[14px] text-gray-600"
                >
                  <Check className="h-4 w-4 text-gray-300 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mt-8 w-full gap-2 rounded-xl border-gray-200 text-gray-700 hover:bg-gray-50 h-11"
              )}
            >
              Order Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Cloud */}
          <div className="relative rounded-2xl border-2 border-gray-900 bg-white p-8 shadow-lg shadow-gray-200/50">
            <div className="absolute -top-3 right-6 rounded-full bg-gray-900 px-3 py-0.5 text-[12px] font-semibold text-white">
              Recommended
            </div>

            <p className="text-[13px] font-semibold text-blue-600 uppercase tracking-wider">
              Device + Cloud
            </p>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-5xl font-bold tracking-tight text-gray-900">$99</span>
              <span className="text-[14px] text-gray-400">
                + $5<span className="text-gray-300">/mo</span>
              </span>
            </div>
            <p className="mt-3 text-[14px] text-gray-500">
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
                  className="flex items-center gap-3 text-[14px] text-gray-600"
                >
                  <Check className="h-4 w-4 text-blue-500 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/signup"
              className={cn(
                buttonVariants(),
                "mt-8 w-full gap-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 h-11 shadow-lg shadow-gray-900/10"
              )}
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
