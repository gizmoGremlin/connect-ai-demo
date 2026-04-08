"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Volume2,
  Hand,
  Eye,
  CheckCircle2,
  Shield,
  Cpu,
  Code2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LandingTrace } from "./landing-trace";
import { scenarios } from "@/data/landing-trace-scenarios";

const heroExecSteps = [
  {
    icon: Volume2,
    label: "Voice Control active",
    action: 'Opening "Photos"...',
    screen: "photos",
  },
  {
    icon: Hand,
    label: "Voice Control active",
    action: 'Tapping "Share"...',
    screen: "share",
  },
  {
    icon: Eye,
    label: "Analyzing screen",
    action: "Generating caption...",
    screen: "instagram",
  },
  {
    icon: CheckCircle2,
    label: "Complete",
    action: "Posted with AI caption",
    screen: "done",
  },
];

const heroScenarios = scenarios.slice(0, 3);

function HeroFlowConnector() {
  return (
    <svg width="32" height="4" className="overflow-visible shrink-0">
      <line
        x1="0" y1="2" x2="32" y2="2"
        stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 3"
      />
      <motion.circle
        cy="2" r="2" fill="#22d3ee"
        animate={{ cx: [0, 32], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

function PhoneDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % heroExecSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const current = heroExecSteps[step];
  const isDone = current.screen === "done";

  return (
    <div className="relative">
      {/* Phone + device assembly */}
      <div className="relative w-[190px] sm:w-[200px]">
        {/* Ambient glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-blue-500/5 blur-2xl" />

        {/* iPhone frame */}
        <div className="relative rounded-[2.5rem] border border-zinc-600/50 bg-zinc-900 p-[3px] shadow-2xl shadow-black/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* Side buttons */}
          <div className="absolute -right-[3px] top-[110px] w-[3px] h-[36px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[90px] w-[3px] h-[20px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[120px] w-[3px] h-[20px] rounded-full bg-zinc-700/60" />

          {/* Screen */}
          <div className="relative h-[400px] sm:h-[420px] rounded-[2.25rem] bg-black overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-[20px] w-[76px] rounded-full bg-black border border-zinc-800" />

            {/* Voice Control indicator */}
            <div className="mt-12 mx-4 flex items-center gap-2 rounded-lg bg-zinc-900/80 px-2.5 py-1.5">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-teal-400"
              />
              <span className="text-[9px] font-mono text-teal-400">
                {current.label}
              </span>
            </div>

            {/* Simulated app screen */}
            <div className="flex-1 mx-4 mt-2 rounded-lg bg-zinc-900/40 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.screen}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  {current.screen === "photos" && (
                    <div className="grid grid-cols-3 gap-px p-px h-full">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={
                            i === 0
                              ? "bg-blue-500/20 border border-blue-500/40"
                              : "bg-zinc-800/60"
                          }
                        />
                      ))}
                    </div>
                  )}
                  {current.screen === "share" && (
                    <div className="flex flex-col items-center justify-center h-full gap-2.5 p-4">
                      <div className="w-full h-20 rounded-lg bg-blue-500/15" />
                      <div className="flex gap-2 w-full">
                        {["bg-blue-500/20", "bg-cyan-500/20", "bg-teal-500/20"].map(
                          (bg, i) => (
                            <div
                              key={i}
                              className={`flex-1 h-10 rounded-lg ${bg} ${
                                i === 0 ? "border border-cyan-500/40" : ""
                              }`}
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
                  {current.screen === "instagram" && (
                    <div className="flex flex-col h-full p-4 gap-2.5">
                      <div className="w-full flex-1 rounded-lg bg-blue-500/15" />
                      <div className="space-y-1.5">
                        <div className="h-2.5 w-3/4 rounded bg-zinc-700/60" />
                        <div className="h-2.5 w-1/2 rounded bg-cyan-500/20" />
                      </div>
                    </div>
                  )}
                  {current.screen === "done" && (
                    <div className="flex flex-col items-center justify-center h-full gap-2">
                      <CheckCircle2 className="h-10 w-10 text-teal-400" />
                      <span className="text-xs font-mono text-teal-400">
                        Posted
                      </span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Action overlay */}
            <div className="mx-4 mb-4 mt-2">
              <div
                className={cn(
                  "flex items-center gap-2 rounded-lg px-2.5 py-2",
                  isDone
                    ? "bg-teal-500/10 border border-teal-500/20"
                    : "bg-zinc-900/80 border border-zinc-800/60"
                )}
              >
                {isDone ? (
                  <CheckCircle2 className="h-3 w-3 text-teal-400 shrink-0" />
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="h-3 w-3 rounded-full border border-blue-400 border-t-transparent" />
                  </motion.div>
                )}
                <span
                  className={cn(
                    "text-[9px] font-mono",
                    isDone ? "text-teal-400" : "text-zinc-400"
                  )}
                >
                  {current.action}
                </span>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[5px] w-[100px] rounded-full bg-zinc-600/50" />
          </div>
        </div>

        {/* USB-C connection point */}
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-[10px] bg-zinc-600 rounded-full" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 h-2 w-2 rounded-full bg-blue-400/60 blur-sm"
          />
        </div>

        {/* Connect AI hardware device */}
        <div className="absolute -bottom-[52px] left-1/2 -translate-x-1/2">
          <div className="relative flex items-center justify-center gap-2 w-[90px] h-[38px] rounded-xl border border-zinc-600/60 bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-lg shadow-black/40">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[10px] font-mono font-medium text-zinc-300 tracking-wider">
              CNCT
            </span>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-teal-400 border border-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* Trace + connector overlay — desktop only */}
      <div className="hidden sm:flex items-start gap-1 absolute top-1/4 left-[58%] z-10">
        <div className="mt-14">
          <HeroFlowConnector />
        </div>
        <LandingTrace
          scenarios={heroScenarios}
          trigger="auto"
          size="sm"
          showHeader
          className="w-full max-w-[300px]"
        />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden before:absolute before:inset-0 before:-z-10 before:bg-[radial-gradient(circle_at_1px_1px,_rgb(255_255_255_/_0.03)_1px,_transparent_0)] before:bg-[size:24px_24px]">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-12 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8 lg:pt-28 lg:pb-36">
        <div className="mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
                <Zap className="h-3 w-3" />
                Open Source Scripting Language for iPhone Automation
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-8 text-4xl font-bold tracking-tight leading-[1.1] sm:text-5xl lg:text-6xl lg:leading-[1.05] xl:text-7xl"
            >
              Put Your Phone
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                to Work.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-3 text-lg font-medium text-zinc-300 sm:text-xl"
            >
              Tell it what you need. It handles the rest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              {[
                { icon: Shield, label: "No Jailbreak" },
                { icon: Cpu, label: "USB-C Hardware" },
                { icon: Code2, label: "Open Source DSL" },
              ].map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-3 py-1.5 text-xs text-zinc-400"
                >
                  <pill.icon className="h-3 w-3 text-zinc-500" />
                  {pill.label}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gap-2 text-base"
                )}
              >
                Purchase Device
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/skills"
                className={cn(
                  buttonVariants({ size: "lg", variant: "outline" }),
                  "gap-2 text-base"
                )}
              >
                View Skills
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center pb-28 lg:items-end"
          >
            <PhoneDemo />
            {/* Mobile-only trace */}
            <div className="sm:hidden mt-8 w-full max-w-sm">
              <LandingTrace
                scenarios={heroScenarios}
                trigger="auto"
                size="sm"
                showHeader
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
