"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See It In Action
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            60 seconds. That&apos;s all it takes to get it.
          </p>
        </motion.div>

        {/* Video placeholder */}
        {/* ARTLIST: Product demo video — 60s edit showing:
            1. Unboxing the sleek aluminum device
            2. Plugging it into iPhone via USB-C
            3. Opening the web dashboard, typing a command
            4. Phone screen executing tasks autonomously
            5. User relaxing while phone works
            Music: Upbeat, tech-forward, minimal electronic */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/50"
        >
          {/* Placeholder gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-all hover:bg-white/20 hover:scale-105">
              <Play className="h-8 w-8 text-white ml-1 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Video timestamp hint */}
          <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs text-zinc-400 backdrop-blur-sm">
            1:02
          </div>
        </motion.div>
      </div>
    </section>
  );
}
