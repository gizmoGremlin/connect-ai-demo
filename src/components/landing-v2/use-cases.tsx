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
    gradient: "from-pink-500/20 to-purple-500/20",
    border: "border-pink-500/20",
  },
  {
    icon: ShoppingCart,
    title: "Watch Prices",
    description:
      "Monitor products on any site. Get a text the moment the price drops.",
    gradient: "from-green-500/20 to-emerald-500/20",
    border: "border-green-500/20",
  },
  {
    icon: MessageSquare,
    title: "Auto-Reply to Messages",
    description:
      "Set rules for when and how to respond. The AI reads context and crafts replies.",
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/20",
  },
  {
    icon: Sun,
    title: "Morning Briefings",
    description:
      "Wake up to a summary of weather, news, and calendar — sent right to your texts.",
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/20",
  },
  {
    icon: Music,
    title: "Curate Playlists",
    description:
      "Discover trending songs on TikTok and auto-save them to your Spotify library.",
    gradient: "from-teal-500/20 to-green-500/20",
    border: "border-teal-500/20",
  },
  {
    icon: CalendarDays,
    title: "Schedule Anything",
    description:
      "Book appointments, reschedule meetings, RSVP to events — all from plain English.",
    gradient: "from-violet-500/20 to-indigo-500/20",
    border: "border-violet-500/20",
  },
];

export function UseCases() {
  return (
    <section className="border-t border-zinc-800/60 bg-zinc-950 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What Will You Automate?
          </h2>
          <p className="mt-4 text-lg text-zinc-400 max-w-xl mx-auto">
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
              className={`group relative overflow-hidden rounded-2xl border ${c.border} bg-zinc-900/50 p-6 transition-colors hover:bg-zinc-900`}
            >
              {/* ARTLIST: Each card gets a short looping video thumbnail (3-5s)
                  showing the use case in action on an iPhone screen.
                  Replace the gradient placeholder below with <video> element. */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient}`}
              >
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-100">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {c.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
