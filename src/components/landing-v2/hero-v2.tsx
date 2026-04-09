"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroV2() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.06),transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase text-blue-600"
          >
            Meet Connect AI
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-3xl text-5xl font-bold tracking-tight leading-[1.08] text-gray-900 sm:text-6xl lg:text-7xl"
          >
            Your Phone.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Now on Autopilot.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-gray-500 leading-relaxed sm:text-xl"
          >
            A tiny device that plugs into your iPhone and does the tedious stuff
            for you. No jailbreak. No app store. Just results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 text-base px-8 bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              Order Now &mdash; $99
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "gap-2 text-base border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              <Play className="h-4 w-4" />
              Watch It Work
            </button>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400"
          >
            <span>Free shipping</span>
            <span className="hidden sm:inline text-gray-300">&bull;</span>
            <span>30-day returns</span>
            <span className="hidden sm:inline text-gray-300">&bull;</span>
            <span>Works with iPhone 15 & 16</span>
          </motion.div>

          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-16 w-full max-w-2xl"
          >
            <Image
              src="/generated/hero-product.png"
              alt="Connect AI device"
              width={1344}
              height={768}
              className="relative w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
