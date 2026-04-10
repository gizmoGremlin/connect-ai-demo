"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Sarah K.",
    location: "Portland, OR",
    stars: 5,
    title: "Shocking how well this works",
    text: "I used to spend 45 minutes a day posting across platforms. Now I describe what I want and go make coffee. This thing is unreal.",
    img: "/generated/reviews/01-sarah.png",
  },
  {
    name: "Marcus T.",
    location: "Atlanta, GA",
    stars: 5,
    title: "Pays for itself in a week",
    text: "Price monitoring alone saved me hundreds last month. Set it up once, forget it. Alerts come in like magic.",
    img: "/generated/reviews/02-marcus.png",
  },
  {
    name: "Priya R.",
    location: "Boston, MA",
    stars: 5,
    title: "Best $99 I ever spent",
    text: "I have an old iPhone just for this now. It backs up my research, sends reminders, and organizes my notes.",
    img: "/generated/reviews/03-priya.png",
  },
  {
    name: "James L.",
    location: "Austin, TX",
    stars: 5,
    title: "My colleagues think I have an assistant",
    text: "I schedule showing confirmations, follow up with clients, and post listings — all automated.",
    img: "/generated/reviews/04-james.png",
  },
];

export function FeatureBento() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-[14px] font-medium italic text-blue-600">
            Designed to disappear
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Simple on the Outside.
            <br />
            Genius Inside.
          </h2>
          <p className="mt-5 text-[17px] text-gray-500 leading-relaxed max-w-2xl">
            A thin aluminum plate, a USB-C connection, and an AI that operates
            your phone like you would &mdash; tapping, swiping, and typing so
            you don&apos;t have to.
          </p>
        </motion.div>

        {/* Hero flat-lay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 overflow-hidden rounded-2xl"
        >
          <div className="relative aspect-[21/9]">
            <Image
              src="/generated/bento/00-hero-flatlay.png"
              alt="Connect AI device flat-lay"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1152px"
              priority
            />
          </div>
        </motion.div>

        {/* Bento grid — asymmetric */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* ── Row 1: Large left (7) + 2 stacked right (5) ── */}

          {/* Card A — large, horizontal layout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-7 lg:row-span-2"
          >
            <div className="flex h-full flex-col lg:flex-row">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:w-[55%] shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src="/generated/bento/01-hand-phone.png"
                  alt="Hand holding phone with Connect AI"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="inline-block w-fit rounded-full bg-violet-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-violet-600">
                  Your Brain, But Automated
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
                  Tell It What to Do
                </h3>
                <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
                  Describe any task in plain English. Your AI figures out every
                  tap, swipe, and screenshot.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card B — small, product beauty shot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-900">
              <Image
                src="/generated/bento/02-beauty-shot.png"
                alt="Connect AI device beauty shot"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-gray-600">
                Hardware
              </span>
              <h3 className="mt-3 text-[17px] font-bold text-gray-900">
                CNC Aluminum. 28 Grams.
              </h3>
              <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">
                Precision-machined, impossibly thin. Disappears on the back of
                your iPhone.
              </p>
            </div>
          </motion.div>

          {/* Card C — small, code editor */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/generated/bento/03-connect-scripts.png"
                alt=".connect scripting language"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                Open Source
              </span>
              <h3 className="mt-3 text-[17px] font-bold text-gray-900">
                .connect Scripts
              </h3>
              <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">
                A scripting language anyone can learn. Write it, share it, remix
                it.
              </p>
            </div>
          </motion.div>

          {/* ── Row 2: 2 stacked left (5) + Large right (7) — reversed ── */}

          {/* Card D — small, dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/generated/bento/04-dashboard.png"
                alt="Connect AI dashboard"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-block rounded-full bg-cyan-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-cyan-600">
                Screen Vision
              </span>
              <h3 className="mt-3 text-[17px] font-bold text-gray-900">
                It Sees What You See
              </h3>
              <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">
                Real-time screen reading. The agent knows exactly what&apos;s on
                your phone and adapts.
              </p>
            </div>
          </motion.div>

          {/* Card E — large, horizontal layout, community */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-7 lg:row-span-2"
          >
            <div className="flex h-full flex-col lg:flex-row-reverse">
              <div className="relative aspect-[4/3] lg:aspect-auto lg:w-[55%] shrink-0 overflow-hidden bg-gray-100">
                <Image
                  src="/generated/bento/05-community.png"
                  alt="Community scripts marketplace"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 600px"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:p-8">
                <span className="inline-block w-fit rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-600">
                  Community
                </span>
                <h3 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">
                  Thousands Ready to Run
                </h3>
                <p className="mt-2 text-[15px] text-gray-500 leading-relaxed">
                  Browse community-built automations or create your own. Price
                  monitoring, social posting, research &mdash; one tap away.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card F — small, privacy / cable */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group overflow-hidden rounded-2xl border border-gray-200/60 bg-white transition-shadow duration-200 hover:shadow-lg hover:shadow-gray-200/50 lg:col-span-5"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
              <Image
                src="/generated/bento/06-cable-macro.png"
                alt="USB-C direct connection"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-amber-600">
                Privacy
              </span>
              <h3 className="mt-3 text-[17px] font-bold text-gray-900">
                Your Data Stays Local
              </h3>
              <p className="mt-1.5 text-[14px] text-gray-500 leading-relaxed">
                Everything runs through the USB-C cable. No cloud. No data
                leaves your phone.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── Customer reviews carousel ── */}
        <ReviewCarousel />
      </div>
    </section>
  );
}

function ReviewCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActive = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth
      : 1;
    setActiveIdx(Math.round(el.scrollLeft / cardWidth));
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-20"
    >
      {/* Header */}
      <div className="text-center">
        <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          2,400+ Early Adopters
        </h3>
        <p className="mt-2 text-[14px] text-gray-400">
          Let customers speak for us
        </p>
      </div>

      {/* Cards */}
      <div className="relative mt-10">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {reviews.map((r) => (
            <div
              key={r.name}
              className="w-[280px] sm:w-[300px] shrink-0 snap-start overflow-hidden rounded-2xl border border-gray-200/60 bg-white"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={r.img}
                  alt={r.name}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>

              {/* Review content */}
              <div className="p-5">
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < r.stars
                          ? "fill-amber-400 text-amber-400"
                          : "fill-gray-100 text-gray-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Name + location */}
                <p className="mt-3 text-[13px] text-gray-500">
                  {r.name} &middot; {r.location}
                </p>

                {/* Title */}
                <h4 className="mt-1.5 text-[15px] font-bold text-gray-900">
                  {r.title}
                </h4>

                {/* Text */}
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
                  {r.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Arrows */}
        <button
          onClick={() => scroll(-1)}
          aria-label="Previous"
          className="absolute -left-3 top-[30%] z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50 sm:flex"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Next"
          className="absolute -right-3 top-[30%] z-20 hidden h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm transition-colors hover:bg-gray-50 sm:flex"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {reviews.map((r, i) => (
          <button
            key={r.name}
            onClick={() => {
              const el = scrollRef.current;
              if (!el || !el.firstElementChild) return;
              const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth;
              el.scrollTo({ left: i * cardWidth, behavior: "smooth" });
            }}
            aria-label={`Go to ${r.name}`}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === activeIdx ? "bg-gray-900" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  );
}
