"use client";

import { motion } from "framer-motion";
import {
  Zap,
  Brain,
} from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { LandingTrace } from "./landing-trace";
import { scenarios } from "@/data/landing-trace-scenarios";

/* ── Step 1 Graphic: Device plugging into iPhone ── */
function PlugInGraphic() {
  return (
    <div className="relative mx-auto flex h-[200px] w-[180px] items-center justify-center">
      {/* Blue glow behind connection */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 h-16 w-16 rounded-full bg-blue-500/15 blur-xl" />

      {/* iPhone body — modern edge-to-edge */}
      <div className="relative h-[160px] w-[76px] rounded-[20px] border border-zinc-600/50 bg-zinc-900 p-[2px] shadow-2xl shadow-black/50">
        {/* Screen */}
        <div className="relative h-full w-full rounded-[18px] bg-black overflow-hidden">
          {/* Dynamic Island */}
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 h-[8px] w-[28px] rounded-full bg-black border border-zinc-800" />
          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[32px] rounded-full bg-zinc-600/40" />
        </div>
      </div>

      {/* Connect AI puck — attached to the right side */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-600 bg-zinc-800 shadow-lg">
          <Zap className="h-5 w-5 text-blue-400" />
        </div>
        {/* USB-C cable line */}
        <svg
          className="absolute -left-3 top-1/2 -translate-y-1/2"
          width="14"
          height="4"
          viewBox="0 0 14 4"
        >
          <line
            x1="0"
            y1="2"
            x2="14"
            y2="2"
            stroke="#3f3f46"
            strokeWidth="2"
            strokeDasharray="3 2"
          />
        </svg>
      </div>

      {/* "Connected" indicator */}
      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
        <span className="text-[9px] font-mono text-blue-400">connected</span>
      </motion.div>
    </div>
  );
}

/* ── Step 2 Graphic: Natural language → .connect script ── */
function TellItGraphic() {
  return (
    <div className="relative mx-auto flex h-[200px] w-[220px] flex-col items-center justify-center gap-2">
      {/* Natural language prompt */}
      <div className="w-full rounded-lg border border-zinc-700/80 bg-zinc-900 px-3 py-2 shadow-lg">
        <p className="text-[10px] text-zinc-500 mb-1">You say:</p>
        <p className="text-[11px] font-medium text-zinc-300">&quot;Post my latest photo to Instagram&quot;</p>
      </div>

      {/* Arrow */}
      <div className="flex flex-col items-center">
        <svg width="2" height="16">
          <line x1="1" y1="0" x2="1" y2="16" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
        <div className="flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2 py-0.5">
          <Brain className="h-2.5 w-2.5 text-cyan-400" />
          <span className="text-[8px] font-mono text-cyan-400">AI generates</span>
        </div>
        <svg width="2" height="16">
          <line x1="1" y1="0" x2="1" y2="16" stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      </div>

      {/* Generated script */}
      <div className="w-full rounded-lg border border-cyan-500/20 bg-zinc-950 px-3 py-2 shadow-lg">
        <p className="text-[9px] text-cyan-400/60 font-mono mb-1">post-to-ig.connect</p>
        <pre className="text-[10px] font-mono leading-relaxed text-zinc-400">
{`skill "Post to IG" {
  open app "Photos"
  tap first_photo
  tap "Share" > "Instagram"
  screenshot -> analyze
  type analysis.caption
  tap "Post"
}`}
        </pre>
      </div>
    </div>
  );
}

/* ── Step 3 Graphic: Agent trace running a task ── */
const goScenario = [scenarios[3]]; // coffee shop — short, different from hero

function GoGraphic() {
  return (
    <div className="relative mx-auto flex h-[200px] w-[200px] flex-col items-center justify-center">
      {/* Mini phone silhouette at top */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-[36px] w-[18px] rounded-[5px] border border-zinc-700/60 bg-zinc-900">
          <div className="mx-auto mt-1 h-0.5 w-2 rounded-full bg-zinc-800" />
          <div className="mx-0.5 mt-0.5 h-[20px] rounded-[2px] bg-zinc-950" />
        </div>
        <div className="flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5">
          <div className="h-1 w-1 rounded-full bg-emerald-400" />
          <span className="text-[7px] font-mono text-blue-400">running</span>
        </div>
      </div>

      {/* Compact trace */}
      <LandingTrace
        scenarios={goScenario}
        cycleInterval={10000}
        trigger="inView"
        size="sm"
        showHeader={false}
        className="w-full"
      />
    </div>
  );
}

const steps = [
  {
    graphic: PlugInGraphic,
    title: "Plug In",
    description:
      "Connect the device to your iPhone via USB-C. It snaps on with MagSafe and creates a direct audio channel — your AI's voice becomes your phone's input.",
  },
  {
    graphic: TellItGraphic,
    title: "AI Writes the Script",
    description:
      "Describe what you want in plain English. The AI agent turns it into a .connect script — a readable, open source language that controls your phone step by step.",
  },
  {
    graphic: GoGraphic,
    title: "Sit Back",
    description:
      "Your AI operates the phone like you would — tapping, typing, navigating apps. It can see the screen and adapt if something changes. You just get results.",
  },
];

export function HowItWorks() {
  return (
    <AnimatedSection className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. That&apos;s it.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Connector line — desktop */}
          <div className="absolute top-[100px] left-[16.67%] right-[16.67%] hidden sm:block">
            <div className="h-px w-full border-t border-dashed border-zinc-700/60" />
          </div>

          <div className="grid gap-12 sm:grid-cols-3 sm:gap-8">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-col items-center text-center"
              >
                {/* Graphic */}
                <step.graphic />

                {/* Step number */}
                <div className="mt-6 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-[10px] font-bold text-zinc-400">
                  {i + 1}
                </div>

                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
