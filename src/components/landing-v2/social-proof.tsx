"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const pressLogos = [
  { name: "TechCrunch", weight: "font-extrabold" },
  { name: "The Verge", weight: "font-bold" },
  { name: "Wired", weight: "font-black italic" },
  { name: "Engadget", weight: "font-bold" },
  { name: "Ars Technica", weight: "font-semibold" },
  { name: "Fast Company", weight: "font-bold" },
  { name: "CNET", weight: "font-black" },
  { name: "Mashable", weight: "font-bold" },
];

export function SocialProof() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* Scrolling press logos */}
        <div className="relative overflow-hidden">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />

          <div className="flex w-max animate-[scroll_25s_linear_infinite]">
            {[...pressLogos, ...pressLogos].map((logo, i) => (
              <span
                key={`${logo.name}-${i}`}
                className={`mx-8 sm:mx-12 text-lg sm:text-xl tracking-tight text-gray-300 select-none whitespace-nowrap ${logo.weight}`}
              >
                {logo.name}
              </span>
            ))}
          </div>
        </div>

        {/* Stars + rating */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 border-t border-gray-100 pt-10 flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-sm text-gray-500">
            Rated <span className="font-semibold text-gray-900">4.9/5</span> by 2,400+ early adopters
          </p>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
