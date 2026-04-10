"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { SectionHeader } from "./section-header";
import { VideoWithSkeleton } from "./video-with-skeleton";

export function ProductFilm() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-3xl border border-gray-200/60 bg-gray-50/60 p-6 sm:p-10">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeader
                align="left"
                eyebrow="Introducing"
                title={
                  <>
                    Connect&nbsp;AI.
                    <br />
                    A phone that works for you.
                  </>
                }
                subtitle="Tell it what you need. Walk away. Come back to results."
                linkHref="#final-cta"
                linkLabel="Watch the film"
              />
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <VideoWithSkeleton
                wrapperClassName="aspect-video rounded-2xl border border-gray-200 shadow-lg shadow-gray-200/40"
                src="/generated/video/product-film/placeholder.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="object-cover"
              />

              {/* Decorative play-button overlay */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm">
                  <Play className="ml-0.5 h-5 w-5 fill-black text-black" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
