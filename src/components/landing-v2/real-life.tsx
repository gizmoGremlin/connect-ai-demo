"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "./section-header";

const slides = [
  {
    src: "/generated/lifestyle/01-morning-routine.png",
    title: "Morning Routine",
    desc: "Your briefing is ready before your coffee is.",
  },
  {
    src: "/generated/lifestyle/02-at-the-desk.png",
    title: "Deep Work",
    desc: "Your phone handles the busywork while you focus.",
  },
  {
    src: "/generated/lifestyle/03-content-creator.png",
    title: "Content Creation",
    desc: "Post everywhere at once without touching your phone.",
  },
  {
    src: "/generated/lifestyle/04-small-business.png",
    title: "Small Business",
    desc: "Monitor prices, reply to customers, post updates \u2014 on autopilot.",
  },
  {
    src: "/generated/lifestyle/05-on-the-go.png",
    title: "On the Go",
    desc: "Set it before you leave. Results when you arrive.",
  },
  {
    src: "/generated/lifestyle/06-student.png",
    title: "Research",
    desc: "Let it gather sources while you write.",
  },
];

export function RealLife() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 1;
    setActiveIdx(Math.round(scrollLeft / cardWidth));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, [updateActive]);

  const scroll = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth;
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  const scrollTo = (idx: number) => {
    const el = scrollRef.current;
    if (!el || !el.firstElementChild) return;
    const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth;
    el.scrollTo({ left: idx * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="In the Wild"
            title="See Connect AI in Real Life"
            subtitle="Real moments from real people putting their phones to work."
          />
        </motion.div>

        {/* Carousel wrapper */}
        <div className="relative mt-14">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-white to-transparent" />

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
            style={{ scrollbarWidth: "none" }}
          >
            {slides.map((slide) => (
              <div
                key={slide.title}
                className="w-[280px] sm:w-[300px] shrink-0 snap-start"
              >
                <div className="overflow-hidden rounded-2xl border border-gray-200/60">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={slide.src}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                </div>
                <div className="mt-3 px-1">
                  <p className="text-[15px] font-semibold text-black">
                    {slide.title}
                  </p>
                  <p className="mt-0.5 text-[13px] text-gray-500">
                    {slide.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Previous"
            className="absolute -left-3 top-[35%] z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50 sm:flex"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Next"
            className="absolute -right-3 top-[35%] z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50 sm:flex"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              onClick={() => scrollTo(i)}
              aria-label={`Go to ${slide.title}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === activeIdx ? "bg-gray-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
