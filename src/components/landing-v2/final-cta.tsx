"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gray-50 py-24 sm:py-32">
      {/* Subtle radial */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(59,130,246,0.04),transparent)]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Mini product video */}
          <div className="w-56 sm:w-64 overflow-hidden rounded-xl border border-gray-200/60 shadow-lg shadow-gray-200/40">
            <video
              src="/generated/video/seedance-r5/r5-spin-reveal.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            />
          </div>

          <h2 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Stop Scrolling.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-blue-700 to-blue-500">
              Start Delegating.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-[17px] text-gray-500 leading-relaxed">
            Your phone is the most powerful computer you own. It&apos;s time it
            started working for you — not the other way around.
          </p>

          <div className="mt-10">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 text-[15px] px-8 h-12 rounded-xl bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10 transition-all hover:shadow-xl hover:shadow-gray-900/15"
              )}
            >
              Order Connect AI &mdash; $99
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-6 text-[13px] text-gray-400">
            Free shipping &middot; 30-day money-back guarantee &middot; No
            subscription required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
