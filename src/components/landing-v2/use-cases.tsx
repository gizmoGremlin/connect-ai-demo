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

const cases = [
  {
    icon: Camera,
    title: "Post to Social Media",
    description:
      "Pick a photo, generate a caption with AI, post to Instagram — hands-free.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: ShoppingCart,
    title: "Watch Prices",
    description:
      "Monitor products on any site. Get a text the moment the price drops.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: MessageSquare,
    title: "Auto-Reply to Messages",
    description:
      "Set rules for when and how to respond. The AI reads context and crafts replies.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Sun,
    title: "Morning Briefings",
    description:
      "Wake up to a summary of weather, news, and calendar — sent right to your texts.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Music,
    title: "Curate Playlists",
    description:
      "Discover trending songs on TikTok and auto-save them to your Spotify library.",
    gradient: "from-teal-500 to-green-500",
  },
  {
    icon: CalendarDays,
    title: "Schedule Anything",
    description:
      "Book appointments, reschedule meetings, RSVP to events — all from plain English.",
    gradient: "from-violet-500 to-indigo-500",
  },
];

export function UseCases() {
  return (
    <section className="border-t border-gray-200 bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Will You Automate?
          </h2>
          <p className="mt-4 text-lg text-gray-500 max-w-xl mx-auto">
            If you can do it on your phone, Connect AI can do it for you.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient}`}
              >
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
