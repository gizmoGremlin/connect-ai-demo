"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeader } from "./section-header";

const testimonials = [
  {
    name: "Sarah K.",
    role: "Content Creator",
    avatar: "SK",
    stars: 5,
    text: "I used to spend 45 minutes a day posting across platforms. Now I describe what I want and go make coffee. This thing is unreal.",
  },
  {
    name: "Marcus T.",
    role: "Small Business Owner",
    avatar: "MT",
    stars: 5,
    text: "Price monitoring alone saved me hundreds last month. Set it up once, forget it. Alerts come in like magic.",
  },
  {
    name: "Priya R.",
    role: "Graduate Student",
    avatar: "PR",
    stars: 5,
    text: "I have an old iPhone just for this now. It backs up my research, sends reminders, and organizes my notes. Best $99 I ever spent.",
  },
  {
    name: "James L.",
    role: "Real Estate Agent",
    avatar: "JL",
    stars: 5,
    text: "I schedule showing confirmations, follow up with clients, and post listings — all automated. My colleagues think I have an assistant.",
  },
  {
    name: "Emma D.",
    role: "Freelance Designer",
    avatar: "ED",
    stars: 4,
    text: "The community scripts are amazing. Found one that auto-saves design inspiration from Instagram to my Pinterest boards. Brilliant.",
  },
  {
    name: "Alex W.",
    role: "Developer",
    avatar: "AW",
    stars: 5,
    text: "Open source scripting language sold me. I've written custom scripts that no other automation tool could handle. The .connect DSL is elegant.",
  },
];

export function Testimonials() {
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
            eyebrow="Testimonials"
            title="People Are Obsessed"
            subtitle="Don't take our word for it."
          />
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-2xl border border-gray-200/60 bg-white p-6 transition-shadow duration-200 hover:shadow-md hover:shadow-gray-200/50"
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`h-3.5 w-3.5 ${
                      j < t.stars
                        ? "fill-amber-400 text-amber-400"
                        : "fill-gray-100 text-gray-100"
                    }`}
                  />
                ))}
              </div>

              <p className="mt-4 text-[14px] text-gray-600 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-black">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
