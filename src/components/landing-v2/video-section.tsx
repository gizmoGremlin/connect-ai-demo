"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";

export function VideoSection() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            See It In Action
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            60 seconds. That&apos;s all it takes to get it.
          </p>
        </motion.div>

        {/* Video placeholder */}
        {/* ARTLIST: video-thumb-demo — device plugged into iPhone, screen glowing */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-12 aspect-video overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg"
        >
          {/* Placeholder gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200" />

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="group flex h-20 w-20 items-center justify-center rounded-full bg-gray-900/80 backdrop-blur-sm transition-all hover:bg-gray-900 hover:scale-105">
              <Play className="h-8 w-8 text-white ml-1 transition-transform group-hover:scale-110" />
            </button>
          </div>

          {/* Video timestamp hint */}
          <div className="absolute bottom-4 right-4 rounded-full bg-gray-900/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
            1:02
          </div>
        </motion.div>
      </div>
    </section>
  );
}
