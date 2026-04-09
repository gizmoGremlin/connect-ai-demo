"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const pressLogos = [
  { name: "TechCrunch", width: "w-24" },
  { name: "The Verge", width: "w-20" },
  { name: "Wired", width: "w-16" },
  { name: "Engadget", width: "w-20" },
  { name: "Ars Technica", width: "w-24" },
];

export function SocialProof() {
  return (
    <section className="relative border-y border-zinc-800/60 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-8 sm:flex-row sm:justify-between"
        >
          {/* Rating */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
              <span className="ml-2 text-sm font-medium text-zinc-300">
                4.9
              </span>
            </div>
            <p className="text-xs text-zinc-500">
              Rated by 2,400+ early adopters
            </p>
          </div>

          {/* Press logos — placeholders */}
          {/* ARTLIST: Replace with actual press/brand logo images */}
          <div className="flex items-center gap-8 overflow-x-auto">
            {pressLogos.map((logo) => (
              <div
                key={logo.name}
                className={`${logo.width} h-6 shrink-0 flex items-center justify-center`}
              >
                <span className="text-xs font-semibold tracking-wider text-zinc-600 uppercase">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
