"use client";

import { motion } from "framer-motion";
import {
  Camera,
  ShoppingCart,
  MessageSquare,
  Sun,
  Music,
  CalendarDays,
} from "lucide-react";
import { SectionHeader } from "./section-header";

const cases = [
  {
    icon: Camera,
    title: "Post to Social Media",
    description:
      "Pick a photo, generate a caption with AI, post to Instagram — hands-free.",
  },
  {
    icon: ShoppingCart,
    title: "Watch Prices",
    description:
      "Monitor products on any site. Get a text the moment the price drops.",
  },
  {
    icon: MessageSquare,
    title: "Auto-Reply to Messages",
    description:
      "Set rules for when and how to respond. The AI reads context and crafts replies.",
  },
  {
    icon: Sun,
    title: "Morning Briefings",
    description:
      "Wake up to a summary of weather, news, and calendar — sent right to your texts.",
  },
  {
    icon: Music,
    title: "Curate Playlists",
    description:
      "Discover trending songs on TikTok and auto-save them to your Spotify library.",
  },
  {
    icon: CalendarDays,
    title: "Schedule Anything",
    description:
      "Book appointments, reschedule meetings, RSVP to events — all from plain English.",
  },
];

export function UseCases() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="Use Cases"
            title="What Will You Automate?"
            subtitle="If you can do it on your phone, Connect AI can do it for you."
          />
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/60"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-subtle text-brand">
                <c.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="text-[15px] font-semibold text-black">
                {c.title}
              </h3>
              <p className="mt-2 text-[14px] text-gray-500 leading-relaxed">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
