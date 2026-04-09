"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroV2() {
  return (
    <section className="relative overflow-hidden">
      {/* Background video placeholder — replace with Artlist hero video */}
      <div className="absolute inset-0 -z-10">
        {/* ARTLIST: Dark, cinematic slow-mo of someone placing the device on their iPhone,
            the screen lighting up, tasks cascading. Moody, shallow depth of field. */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.15),transparent)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24 lg:pt-36 lg:pb-32">
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-widest uppercase text-blue-400"
          >
            Meet Connect AI
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-3xl text-5xl font-bold tracking-tight leading-[1.08] sm:text-6xl lg:text-7xl"
          >
            Your Phone.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Now on Autopilot.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 max-w-xl text-lg text-zinc-400 leading-relaxed sm:text-xl"
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
                "gap-2 text-base px-8"
              )}
            >
              Order Now &mdash; $99
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "gap-2 text-base"
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
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-500"
          >
            <span>Free shipping</span>
            <span className="hidden sm:inline text-zinc-700">&bull;</span>
            <span>30-day returns</span>
            <span className="hidden sm:inline text-zinc-700">&bull;</span>
            <span>Works with iPhone 15 & 16</span>
          </motion.div>

          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative mt-16 w-full max-w-2xl"
          >
            {/* Glow underneath product */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent blur-3xl" />
            <div className="absolute -inset-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent rounded-3xl blur-2xl" />

            <Image
              src="/connect-product.png"
              alt="Connect AI device"
              width={800}
              height={450}
              className="relative w-full h-auto"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent" />
    </section>
  );
}
