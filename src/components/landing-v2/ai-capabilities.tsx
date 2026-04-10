"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Brain, ListChecks, Activity, CheckCircle2, Zap, Eye } from "lucide-react";
import { SectionHeader } from "./section-header";

/* ── Phone mockup with dark command UI ── */
function PhoneMockup() {
  return (
    <div className="w-[200px] sm:w-[240px]">
      <div className="rounded-[2.2rem] border-2 border-gray-800 bg-gray-900 p-[3px] shadow-2xl shadow-gray-900/30">
        <div className="relative h-[420px] sm:h-[480px] rounded-[1.95rem] bg-gray-950 overflow-hidden flex flex-col">
          {/* Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 h-[14px] w-[56px] rounded-full bg-gray-900" />

          {/* Status bar */}
          <div className="mt-8 mx-4 flex items-center justify-between text-[9px] font-mono text-gray-500">
            <span>9:41</span>
            <span>ctrl center</span>
            <span className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              live
            </span>
          </div>

          {/* Chat interface */}
          <div className="flex-1 mx-3 mt-3 space-y-2.5 overflow-hidden">
            {/* User message */}
            <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand px-3 py-2">
              <p className="text-[10px] text-brand-foreground leading-snug">
                Check competitor pricing and save a report to Notes
              </p>
            </div>

            {/* Agent trace */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-800/80 px-2.5 py-1.5">
                <Brain className="h-2.5 w-2.5 text-violet-400 shrink-0" />
                <span className="text-[9px] text-violet-300 font-mono">Analyzing request...</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-800/80 px-2.5 py-1.5">
                <ListChecks className="h-2.5 w-2.5 text-brand shrink-0" />
                <span className="text-[9px] text-brand font-mono">Plan: 3 sites → compare → save</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-800/80 px-2.5 py-1.5">
                <Zap className="h-2.5 w-2.5 text-amber-400 shrink-0" />
                <span className="text-[9px] text-amber-300 font-mono">Opening Safari...</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-800/80 px-2.5 py-1.5">
                <Eye className="h-2.5 w-2.5 text-cyan-400 shrink-0" />
                <span className="text-[9px] text-cyan-300 font-mono">Reading pricing page...</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-gray-800/80 px-2.5 py-1.5">
                <Zap className="h-2.5 w-2.5 text-amber-400 shrink-0" />
                <span className="text-[9px] text-amber-300 font-mono">Navigating to competitor #2...</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-emerald-900/40 border border-emerald-800/30 px-2.5 py-1.5">
                <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400 shrink-0" />
                <span className="text-[9px] text-emerald-300 font-mono">Report saved to Notes ✓</span>
              </div>
            </div>
          </div>

          {/* Input bar */}
          <div className="mx-3 mb-3 mt-2 flex items-center gap-2 rounded-full bg-gray-800 px-3 py-2">
            <span className="text-[9px] text-gray-500 font-mono">Tell your phone what to do...</span>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[4px] w-[60px] rounded-full bg-gray-700" />
        </div>
      </div>
    </div>
  );
}

/* ── 3 feature cards with CSS mockup visuals ── */
const features = [
  {
    title: (
      <>
        It doesn&apos;t just follow commands.{" "}
        <span className="text-brand">It thinks.</span>
      </>
    ),
    desc: "From simple requests to complex goals, your agent reasons through each step — understanding context, not just keywords.",
    mockup: (
      <div className="space-y-2 p-4">
        <div className="flex items-center gap-2 rounded-lg bg-violet-50 border border-violet-100 px-3 py-2">
          <Brain className="h-3.5 w-3.5 text-violet-500 shrink-0" />
          <span className="text-[11px] font-mono text-violet-600">Understanding intent...</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-subtle border border-brand/20 px-3 py-2">
          <ListChecks className="h-3.5 w-3.5 text-brand shrink-0" />
          <span className="text-[11px] font-mono text-brand">Breaking into 4 steps</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-brand-subtle border border-brand/20 px-3 py-2">
          <ListChecks className="h-3.5 w-3.5 text-brand shrink-0" />
          <span className="text-[11px] font-mono text-brand">Selecting best approach</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-100 px-3 py-2">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          <span className="text-[11px] font-mono text-emerald-600">Plan ready → executing</span>
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        Turn any goal into{" "}
        <span className="text-brand">a sequence of actions.</span>
      </>
    ),
    desc: "Connect AI breaks down abstract goals into concrete phone operations — taps, swipes, screenshots, and text input.",
    mockup: (
      <div className="space-y-2 p-4">
        <div className="rounded-lg bg-gray-100 border border-gray-200 px-3 py-2 text-center">
          <span className="text-[11px] font-mono text-gray-500">&ldquo;Post this to all my socials&rdquo;</span>
        </div>
        <div className="flex justify-center">
          <div className="h-4 w-px bg-gray-300" />
        </div>
        {["Open Instagram → new post", "Select photo → add caption", "Share → switch to Twitter"].map((step, i) => (
          <div key={i} className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-3 py-2">
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-brand-subtle text-[8px] font-bold text-brand shrink-0">
              {i + 1}
            </div>
            <span className="text-[11px] font-mono text-gray-600">{step}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: (
      <>
        See results in real time{" "}
        <span className="text-brand">as it works.</span>
      </>
    ),
    desc: "Watch the live execution trace as your agent operates. Every action, every screen read, every decision — transparent and visible.",
    mockup: (
      <div className="p-4">
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          {/* Mini header */}
          <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 py-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] font-mono text-gray-400">live trace</span>
          </div>
          {/* Status items */}
          <div className="divide-y divide-gray-50">
            {[
              { icon: Zap, text: "Opened Safari", color: "text-amber-500", time: "0.8s" },
              { icon: Eye, text: "Read pricing page", color: "text-cyan-500", time: "2.1s" },
              { icon: Zap, text: "Screenshot captured", color: "text-amber-500", time: "3.4s" },
              { icon: Brain, text: "Analyzing data...", color: "text-violet-500", time: "5.0s" },
              { icon: CheckCircle2, text: "Saved to Notes", color: "text-emerald-500", time: "6.2s" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-1.5">
                <item.icon className={`h-3 w-3 shrink-0 ${item.color}`} />
                <span className="flex-1 text-[10px] font-mono text-gray-600">{item.text}</span>
                <span className="text-[9px] font-mono text-gray-300">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export function AiCapabilities() {
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
            align="left"
            eyebrow="Connect AI Agent"
            title={
              <>
                AI That Doesn&apos;t Just Listen.
                <br />
                It Acts.
              </>
            }
            subtitle="Powered by the latest language models. Your agent understands context, reads your screen, and operates your phone like you would — but faster."
          />
        </motion.div>

        {/* Center visual: phone mockup + product shot */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10"
        >
          <PhoneMockup />
          <div className="relative w-[180px] sm:w-[220px] aspect-square overflow-hidden rounded-2xl">
            <Image
              src="/generated/bento/02-beauty-shot.png"
              alt="Connect AI device"
              fill
              className="object-cover"
              sizes="220px"
            />
          </div>
        </motion.div>

        {/* 3 feature cards */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-gray-200/60 bg-gray-50"
            >
              {/* CSS mockup visual */}
              <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                {f.mockup}
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-black leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
