"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VideoWithSkeleton } from "./video-with-skeleton";

export function HeroV2() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex flex-col bg-white">
      {/* Brand + Headline — centered */}
      <div className="px-4 pt-10 pb-6 sm:pt-14 sm:pb-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[13px] font-semibold tracking-wide uppercase text-gray-400"
        >
          connect.ai
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl"
        >
          Put Your Phone <span className="text-brand">to Work.</span>
        </motion.h1>
      </div>

      {/* Video */}
      <div className="relative flex-1 flex items-start justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative w-full max-w-5xl"
        >
          <VideoWithSkeleton
            wrapperClassName="aspect-video rounded-2xl sm:rounded-3xl border border-gray-200/40 shadow-2xl shadow-gray-300/30"
            src="/generated/video/seedance-r5/r5-fast-cuts.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-b from-brand-subtle/60 via-transparent to-transparent blur-2xl" />
        </motion.div>
      </div>

      {/* Subtitle + CTA below video */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="px-4 pt-8 pb-10 sm:pt-10 sm:pb-14 flex flex-col items-center gap-5 text-center"
      >
        <p className="text-[16px] text-gray-500 sm:text-[17px]">
          Tell it what you need. It handles the rest.
        </p>

        <Link
          href="/signup"
          className={cn(
            buttonVariants({ size: "lg" }),
            "gap-2 text-[15px] px-8 h-12 rounded-xl bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/10"
          )}
        >
          Order Now &mdash; $99
          <ArrowRight className="h-4 w-4" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {["No Jailbreak", "USB-C Hardware", "Open Source DSL"].map((pill) => (
            <span
              key={pill}
              className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-[12px] font-medium text-gray-500"
            >
              {pill}
            </span>
          ))}
        </div>

        <p className="text-[13px] text-gray-400">
          Free shipping &middot; 30-day returns &middot; iPhone 15 & 16
        </p>
      </motion.div>
    </section>
  );
}
