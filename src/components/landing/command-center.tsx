"use client";

import { useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import {
  Zap,
  Code2,
  CheckCircle2,
  Smartphone,
  Wifi,
  Volume2,
  Hand,
  Eye,
} from "lucide-react";
import { AnimatedSection } from "./animated-section";
import { LandingTrace } from "./landing-trace";
import { scenarios } from "@/data/landing-trace-scenarios";

// Use Instagram + Coffee Shop — different from hero (0,1,2)
const centerScenarios = [scenarios[0], scenarios[3]];

const skillScript = `skill "Post to IG" {
  open app "Photos"
  tap first_photo
  tap "Share" > "Instagram"
  screenshot -> analyze
  type analysis.caption
  tap "Post"
}`;

/* ── Phone screen states for the mini preview inside ctrl center ── */
const phoneStates = [
  { id: "off", label: "", statusColor: "" },
  { id: "wake", label: "Waking up...", statusColor: "bg-blue-400" },
  { id: "home", label: "Home screen", statusColor: "bg-blue-400" },
  { id: "photos", label: "Photos app", statusColor: "bg-cyan-400" },
  { id: "share", label: "Share sheet", statusColor: "bg-cyan-400" },
  { id: "instagram", label: "Instagram", statusColor: "bg-teal-400" },
  { id: "caption", label: "Writing caption", statusColor: "bg-teal-400" },
  { id: "done", label: "Posted", statusColor: "bg-teal-400" },
];

// Timing roughly syncs with the Instagram trace scenario
const phoneTimings = [0, 800, 1600, 2400, 3600, 5000, 5800, 6800];

/* ── Phone execution states for the standalone phone on the right ── */
const execSteps = [
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

/* ── Mini iPhone state viewer ── */
function MiniPhone() {
  const [stateIdx, setStateIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!inView) return;

    const runCycle = () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      setStateIdx(0);

      phoneTimings.forEach((delay, i) => {
        timersRef.current.push(
          setTimeout(() => setStateIdx(i), delay)
        );
      });

      // Reset cycle to match the trace's 14s interval
      timersRef.current.push(
        setTimeout(() => runCycle(), 14000)
      );
    };

    runCycle();
    return () => timersRef.current.forEach(clearTimeout);
  }, [inView]);

  const current = phoneStates[stateIdx];
  const isOff = current.id === "off";

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* Mini iPhone */}
      <div className="relative w-[100px]">
        <div className="rounded-[1.4rem] border border-zinc-600/50 bg-zinc-900 p-[2px] shadow-xl shadow-black/40">
          <div className="relative h-[200px] rounded-[1.25rem] bg-black overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-[10px] w-[36px] rounded-full bg-black border border-zinc-800" />

            {/* Screen content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col"
              >
                {isOff ? (
                  /* Off — all black */
                  <div className="flex-1" />
                ) : current.id === "wake" ? (
                  /* Waking — subtle glow */
                  <div className="flex-1 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-8 w-8 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center"
                    >
                      <Smartphone className="h-3.5 w-3.5 text-blue-400" />
                    </motion.div>
                  </div>
                ) : current.id === "home" ? (
                  /* Home screen — app grid */
                  <div className="flex-1 mt-8 mx-2 grid grid-cols-3 gap-1.5 content-start p-1">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-md bg-zinc-800/80" />
                    ))}
                  </div>
                ) : current.id === "photos" ? (
                  /* Photos — grid of thumbnails */
                  <div className="flex-1 mt-7 mx-1.5">
                    <div className="grid grid-cols-3 gap-px h-full">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div
                          key={i}
                          className={
                            i === 0
                              ? "bg-blue-500/25 border border-blue-400/40"
                              : "bg-zinc-800/60"
                          }
                        />
                      ))}
                    </div>
                  </div>
                ) : current.id === "share" ? (
                  /* Share sheet */
                  <div className="flex-1 mt-7 mx-2 flex flex-col justify-end pb-2 gap-1.5">
                    <div className="h-10 rounded-lg bg-zinc-800/60" />
                    <div className="flex gap-1.5">
                      {["bg-blue-500/20", "bg-cyan-500/20", "bg-teal-500/20"].map((bg, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-7 rounded-md ${bg} ${
                            i === 0 ? "border border-cyan-500/40" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : current.id === "instagram" ? (
                  /* Instagram — image + fields */
                  <div className="flex-1 mt-7 mx-2 flex flex-col gap-1.5 py-1">
                    <div className="flex-1 rounded-md bg-blue-500/15" />
                    <div className="h-2 w-3/4 rounded bg-zinc-700/60" />
                    <div className="h-2 w-1/2 rounded bg-zinc-700/40" />
                  </div>
                ) : current.id === "caption" ? (
                  /* Typing caption */
                  <div className="flex-1 mt-7 mx-2 flex flex-col gap-1.5 py-1">
                    <div className="flex-1 rounded-md bg-blue-500/15" />
                    <div className="h-2 w-3/4 rounded bg-zinc-700/60" />
                    <motion.div
                      animate={{ width: ["30%", "70%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                      className="h-2 rounded bg-cyan-500/30"
                    />
                  </div>
                ) : (
                  /* Done */
                  <div className="flex-1 flex flex-col items-center justify-center gap-1">
                    <CheckCircle2 className="h-5 w-5 text-teal-400" />
                    <span className="text-[7px] font-mono text-teal-400">
                      Posted
                    </span>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Status bar at bottom (when not off) */}
            {!isOff && current.label && (
              <div className="mx-1.5 mb-1.5 flex items-center gap-1 rounded-md bg-zinc-900/80 px-1.5 py-0.5">
                <div className={`h-1 w-1 rounded-full ${current.statusColor}`} />
                <span className="text-[6px] font-mono text-zinc-500 truncate">
                  {current.label}
                </span>
              </div>
            )}

            {/* Home indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[40px] rounded-full bg-zinc-600/50" />
          </div>
        </div>
      </div>

      {/* Label below phone */}
      <span className="mt-2 text-[9px] font-mono text-zinc-600">
        iPhone state
      </span>
    </div>
  );
}

/* ── Ctrl Center Panel (two-column: trace + mini phone) ── */
function CtrlCenterPanel() {
  return (
    <div className="w-full">
      {/* Device status bar */}
      <div className="flex items-center gap-2 rounded-t-xl border border-b-0 border-zinc-700/40 bg-zinc-900/80 px-3 py-2">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1.5 w-1.5 rounded-full bg-teal-400"
        />
        <span className="text-[10px] font-mono text-zinc-400">
          iPhone 15 Pro connected
        </span>
        <span className="ml-auto text-[9px] font-mono text-zinc-600">
          CNCT v1.2
        </span>
      </div>

      {/* Two-column body: trace + mini phone */}
      <div className="flex border-x border-zinc-700/60 bg-zinc-950/90">
        {/* Left: Trace */}
        <div className="flex-1 min-w-0 [&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none">
          <LandingTrace
            scenarios={centerScenarios}
            cycleInterval={14000}
            trigger="inView"
            size="md"
            showHeader
          />
        </div>

        {/* Divider */}
        <div className="w-px bg-zinc-700/40" />

        {/* Right: Mini phone preview */}
        <div className="flex items-center justify-center px-4 py-3 shrink-0">
          <MiniPhone />
        </div>
      </div>

      {/* Skill file indicator */}
      <div className="flex items-center gap-2 rounded-b-xl border border-t-0 border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
        <Code2 className="h-3 w-3 text-cyan-400" />
        <span className="text-[10px] font-mono text-cyan-400">
          post-to-ig.connect
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[9px] font-mono text-teal-400">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1 w-1 rounded-full bg-teal-400"
          />
          running
        </span>
      </div>
    </div>
  );
}

/* ── Horizontal flow connector with traveling dot ── */
function FlowConnector({ direction = "right" }: { direction?: "right" | "down" }) {
  if (direction === "down") {
    return (
      <div className="flex justify-center py-2">
        <svg width="2" height="32" className="overflow-visible">
          <line
            x1="1" y1="0" x2="1" y2="32"
            stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 3"
          />
          <motion.circle
            cx="1" r="2.5" fill="#22d3ee"
            animate={{ cy: [0, 32], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex items-center px-1">
      <svg width="48" height="4" className="overflow-visible">
        <line
          x1="0" y1="2" x2="48" y2="2"
          stroke="#3f3f46" strokeWidth="1.5" strokeDasharray="4 3"
        />
        <motion.circle
          cy="2" r="2.5" fill="#22d3ee"
          animate={{ cx: [0, 48], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* ── Skill Dispatch Card ── */
function SkillDispatchCard({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.015, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="w-full max-w-[200px] rounded-xl border border-cyan-500/30 bg-zinc-950/90 backdrop-blur-sm shadow-2xl shadow-black/60 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/60 px-3 py-2">
        <Code2 className="h-3 w-3 text-cyan-400" />
        <span className="text-[10px] font-mono text-cyan-400/80">
          post-to-ig.connect
        </span>
      </div>

      {/* Code preview */}
      {!compact && (
        <pre className="px-3 py-2 text-[9px] font-mono leading-relaxed text-zinc-500 overflow-hidden max-h-[100px]">
          {skillScript}
        </pre>
      )}

      {/* Status */}
      <div className="flex items-center gap-1.5 border-t border-zinc-800/60 px-3 py-1.5">
        <CheckCircle2 className="h-2.5 w-2.5 text-teal-400" />
        <span className="text-[9px] font-mono text-teal-400">dispatched</span>
      </div>
    </motion.div>
  );
}

/* ── Execution Phone Mockup ── */
function ExecutionPhone() {
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % execSteps.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [inView]);

  const current = execSteps[step];
  const isDone = current.screen === "done";

  return (
    <div ref={ref} className="relative">
      <div className="relative w-[170px] sm:w-[180px]">
        {/* Ambient glow */}
        <div className="absolute -inset-4 rounded-[3rem] bg-cyan-500/5 blur-2xl" />

        {/* iPhone frame */}
        <div className="relative rounded-[2.5rem] border border-zinc-600/50 bg-zinc-900 p-[3px] shadow-2xl shadow-black/50 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
          {/* Side buttons */}
          <div className="absolute -right-[3px] top-[90px] w-[3px] h-[28px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[70px] w-[3px] h-[16px] rounded-full bg-zinc-700/60" />
          <div className="absolute -left-[3px] top-[95px] w-[3px] h-[16px] rounded-full bg-zinc-700/60" />

          {/* Screen */}
          <div className="relative h-[340px] sm:h-[360px] rounded-[2.25rem] bg-black overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 h-[18px] w-[68px] rounded-full bg-black border border-zinc-800" />

            {/* Voice Control indicator */}
            <div className="mt-10 mx-3 flex items-center gap-1.5 rounded-lg bg-zinc-900/80 px-2 py-1">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-teal-400"
              />
              <span className="text-[8px] font-mono text-teal-400">
                {current.label}
              </span>
            </div>

            {/* Simulated app content */}
            <div className="flex-1 mx-3 mt-2 rounded-lg bg-zinc-900/40 overflow-hidden">
              {current.screen === "photos" && (
                <div className="grid grid-cols-3 gap-px p-px h-full">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        i === 0
                          ? "bg-blue-500/20 border border-blue-500/40"
                          : "bg-zinc-800/60"
                      }`}
                    />
                  ))}
                </div>
              )}
              {current.screen === "share" && (
                <div className="flex flex-col items-center justify-center h-full gap-2 p-3">
                  <div className="w-full h-16 rounded-lg bg-blue-500/15" />
                  <div className="flex gap-2 w-full">
                    {["bg-blue-500/20", "bg-cyan-500/20", "bg-teal-500/20"].map(
                      (bg, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-8 rounded-lg ${bg} ${
                            i === 0 ? "border border-cyan-500/40" : ""
                          }`}
                        />
                      )
                    )}
                  </div>
                </div>
              )}
              {current.screen === "instagram" && (
                <div className="flex flex-col h-full p-3 gap-2">
                  <div className="w-full flex-1 rounded-lg bg-blue-500/15" />
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 rounded bg-zinc-700/60" />
                    <div className="h-2 w-1/2 rounded bg-cyan-500/20" />
                  </div>
                </div>
              )}
              {current.screen === "done" && (
                <div className="flex flex-col items-center justify-center h-full gap-2">
                  <CheckCircle2 className="h-8 w-8 text-teal-400" />
                  <span className="text-[10px] font-mono text-teal-400">
                    Posted
                  </span>
                </div>
              )}
            </div>

            {/* Action overlay */}
            <div className="mx-3 mb-3 mt-2">
              <div
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 ${
                  isDone
                    ? "bg-teal-500/10 border border-teal-500/20"
                    : "bg-zinc-900/80 border border-zinc-800/60"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="h-2.5 w-2.5 text-teal-400 shrink-0" />
                ) : (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <div className="h-2.5 w-2.5 rounded-full border border-blue-400 border-t-transparent" />
                  </motion.div>
                )}
                <span
                  className={`text-[8px] font-mono ${
                    isDone ? "text-teal-400" : "text-zinc-400"
                  }`}
                >
                  {current.action}
                </span>
              </div>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 h-[4px] w-[80px] rounded-full bg-zinc-600/50" />
          </div>
        </div>

        {/* USB-C connection */}
        <div className="absolute -bottom-[10px] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[2px] h-[10px] bg-zinc-600 rounded-full" />
          <motion.div
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-0 h-2 w-2 rounded-full bg-blue-400/60 blur-sm"
          />
        </div>

        {/* CNCT device */}
        <div className="absolute -bottom-[48px] left-1/2 -translate-x-1/2">
          <div className="relative flex items-center justify-center gap-2 w-[80px] h-[34px] rounded-xl border border-zinc-600/60 bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-lg shadow-black/40">
            <Zap className="h-3 w-3 text-blue-400" />
            <span className="text-[9px] font-mono font-medium text-zinc-300 tracking-wider">
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
    </div>
  );
}

/* ── Main Section ── */
export function CommandCenter() {
  return (
    <AnimatedSection className="border-t border-border/40 bg-card/30">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        {/* Background glows */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute left-[10%] top-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/8 blur-[120px]" />
          <div className="absolute right-[10%] top-1/2 h-[300px] w-[300px] rounded-full bg-cyan-500/6 blur-[100px]" />
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your AI, Running the Show
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            The{" "}
            <span className="inline-flex items-center rounded-[4px] border border-zinc-500/60 bg-gradient-to-b from-zinc-600 to-zinc-700 px-1.5 py-0.5 font-mono text-sm leading-none text-zinc-300 shadow-[0_2px_0_0_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              ctrl
            </span>{" "}
            center is where your agent thinks, plans, and acts. Watch it grab a
            skill and send commands to your phone — in real time.
          </p>
        </div>

        {/* Desktop layout: horizontal flow */}
        <div className="hidden lg:flex items-center justify-center gap-0 mt-16">
          {/* Ctrl Center Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-full max-w-[480px] shrink-0"
          >
            <CtrlCenterPanel />
          </motion.div>

          {/* Connector 1 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <FlowConnector direction="right" />
          </motion.div>

          {/* Skill card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="shrink-0"
          >
            <SkillDispatchCard />
          </motion.div>

          {/* Connector 2 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.4 }}
          >
            <FlowConnector direction="right" />
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="shrink-0 pb-16"
          >
            <ExecutionPhone />
          </motion.div>
        </div>

        {/* Mobile / Tablet layout: vertical flow */}
        <div className="lg:hidden mt-12 flex flex-col items-center gap-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-[400px]"
          >
            <CtrlCenterPanel />
          </motion.div>

          <FlowConnector direction="down" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <SkillDispatchCard compact />
          </motion.div>

          <FlowConnector direction="down" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="pb-16"
          >
            <ExecutionPhone />
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
