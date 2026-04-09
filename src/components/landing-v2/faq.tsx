"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Do I need to jailbreak my iPhone?",
    a: "No. Connect AI uses built-in iOS accessibility features (Voice Control) to operate your phone. Your iPhone stays completely stock — no modifications, no security risks.",
  },
  {
    q: "Which iPhones does it work with?",
    a: "Any iPhone with USB-C — that's the iPhone 15 and 16 series. MagSafe is supported but not required; the USB-C connection is what matters.",
  },
  {
    q: "What's the $5/month subscription for?",
    a: "The device itself is a one-time $99 purchase. The optional $5/month Cloud plan gives you the AI agent (natural language commands), the web-based control center, community scripts marketplace, and multi-device management. You can also write and run .connect scripts without the subscription.",
  },
  {
    q: "Can I use my phone while it's running?",
    a: "The device works best when it has full control of the screen. Most people use a spare iPhone or let it run overnight / while they're away. Think of it as a dedicated worker phone.",
  },
  {
    q: "Is the scripting language hard to learn?",
    a: "Not at all. The .connect language reads like plain English pseudocode. Most people pick it up in minutes. And with the AI agent, you can describe what you want in natural language and it writes the script for you.",
  },
  {
    q: "Is it open source?",
    a: "Yes — the .connect scripting language and its runtime are fully open source on GitHub. You can read, audit, and modify every script. We also have a cookbook for building your own device from off-the-shelf parts.",
  },
  {
    q: "What if something goes wrong during a task?",
    a: "The AI agent can see the screen and adapt in real time. If an unexpected popup appears or the app layout changes, it adjusts on the fly. You can also set guardrails and approval steps in your scripts.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-medium text-gray-900 pr-4">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-500 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-gray-200 bg-white py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Questions? Answered.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12"
        >
          {faqs.map((faq) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
