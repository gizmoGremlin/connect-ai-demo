"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Camera,
  Sun,
  TrendingDown,
  MessageCircle,
  BookOpen,
  ImageIcon,
  Shield,
  Cpu,
  Code2,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LandingTrace } from "./landing-trace";
import { scenarios } from "@/data/landing-trace-scenarios";

const demoSkills = [
  {
    icon: Camera,
    name: "Post to Instagram",
    desc: "Share your latest photo",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: Sun,
    name: "Morning Briefing",
    desc: "Weather, news, and your schedule",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: TrendingDown,
    name: "Track Prices",
    desc: "Get alerts when prices drop",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
  {
    icon: MessageCircle,
    name: "Send a Check-In",
    desc: "Text your favorites good morning",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    icon: BookOpen,
    name: "Research Topics",
    desc: "Search and save articles",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    icon: ImageIcon,
    name: "Backup Photos",
    desc: "Save camera roll to cloud",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
  },
];

const heroScenarios = scenarios.slice(0, 3);

function PhoneDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % demoSkills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const current = demoSkills[step];

  return (
    <div className="relative">
      {/* Phone + device assembly */}
      <div className="relative w-[190px] sm:w-[200px]">
        {/* Ambient glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-blue-500/5 blur-2xl" />

        {/* iPhone frame — edge-to-edge, minimal bezel */}
        <div className="relative rounded-[2.5rem] border border-zinc-600/50 bg-zinc-900 p-[3px] shadow-2xl shadow-black/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* Side buttons */}
          <div className="absolute -right-[3px] top-[110px] w-[3px] h-[36px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[90px] w-[3px] h-[20px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[120px] w-[3px] h-[20px] rounded-full bg-zinc-700/60" />

          {/* Screen */}
          <div className="relative h-[400px] sm:h-[420px] rounded-[2.25rem] bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-[20px] w-[76px] rounded-full bg-black border border-zinc-800" />

            {/* Skill content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col items-center gap-3 text-center px-4"
              >
                <div
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-2xl",
                    current.bg
                  )}
                >
                  <current.icon className={cn("h-7 w-7", current.color)} />
                </div>
                <div>
                  <p className="text-base font-semibold text-zinc-100">
                    {current.name}
                  </p>
                  <p className="mt-1 text-xs text-zinc-500">{current.desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="absolute bottom-8 flex gap-1.5">
              {demoSkills.map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === step ? "w-4 bg-cyan-400" : "w-1.5 bg-zinc-700"
                  )}
                />
              ))}
            </div>

            {/* Home indicator — on screen like real iOS */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[5px] w-[100px] rounded-full bg-zinc-600/50" />
          </div>
        </div>

        {/* USB-C connection point */}
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-[10px] bg-zinc-600 rounded-full" />
          {/* Connection glow */}
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
            {/* Connected indicator */}
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 border border-zinc-800"
            />
          </div>
        </div>
      </div>

      {/* Trace overlay — overlaps phone mid-right, clears the device below */}
      <div className="hidden sm:block absolute top-1/4 left-[70%] z-10">
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
