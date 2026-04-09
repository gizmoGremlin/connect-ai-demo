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
    color: "bg-rose-50 text-rose-600",
  },
  {
    icon: ShoppingCart,
    title: "Watch Prices",
    description:
      "Monitor products on any site. Get a text the moment the price drops.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: MessageSquare,
    title: "Auto-Reply to Messages",
    description:
      "Set rules for when and how to respond. The AI reads context and crafts replies.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Sun,
    title: "Morning Briefings",
    description:
      "Wake up to a summary of weather, news, and calendar — sent right to your texts.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Music,
    title: "Curate Playlists",
    description:
      "Discover trending songs on TikTok and auto-save them to your Spotify library.",
    color: "bg-teal-50 text-teal-600",
  },
  {
    icon: CalendarDays,
    title: "Schedule Anything",
    description:
      "Book appointments, reschedule meetings, RSVP to events — all from plain English.",
    color: "bg-violet-50 text-violet-600",
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
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What Will You Automate?
          </h2>
          <p className="mt-4 text-[17px] text-gray-500 max-w-lg mx-auto">
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
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-gray-200/50 hover:border-gray-300/60"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${c.color}`}
              >
                <c.icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900">
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
