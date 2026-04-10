"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Brain,
  Code2,
  Smartphone,
  CheckCircle2,
  Eye,
  Zap,
  Globe,
  FileText,
  Camera,
} from "lucide-react";
import { SectionHeader } from "./section-header";

/* ── Trace steps — research scenario with feedback ── */
const traceSteps = [
  { type: "thinking", icon: Brain, text: "User wants to research competitor pricing" },
  { type: "plan", icon: Code2, text: "Open Safari → navigate to competitor site" },
  { type: "plan", icon: Code2, text: "Screenshot pricing page → analyze" },
  { type: "plan", icon: Code2, text: "Save comparison to Notes" },
  { type: "action", icon: Zap, text: "Opening Safari..." },
  { type: "action", icon: Zap, text: "Navigating to competitor.com/pricing" },
  { type: "feedback", icon: Eye, text: "Screen captured — analyzing layout..." },
  { type: "thinking", icon: Brain, text: "Found 3 tiers. Pro plan: $29 → $39" },
  { type: "action", icon: Zap, text: "Saving comparison to Notes..." },
  { type: "result", icon: CheckCircle2, text: "Price report saved. Pro tier increased 34%." },
];

// Delays for each trace step appearance (ms)
const traceDelays = [0, 1000, 1500, 2000, 2800, 4000, 5500, 7000, 8500, 10000];

/* ── Phone screen states synced with trace ── */
const phoneStates = [
  { id: "home", label: "Home screen", icon: Smartphone, color: "bg-brand" },
  { id: "safari", label: "Opening Safari", icon: Globe, color: "bg-brand" },
  { id: "safari", label: "Opening Safari", icon: Globe, color: "bg-brand" },
  { id: "safari", label: "Opening Safari", icon: Globe, color: "bg-brand" },
  { id: "navigating", label: "Navigating...", icon: Globe, color: "bg-brand" },
  { id: "pricing", label: "Pricing page", icon: Globe, color: "bg-cyan-400" },
  { id: "screenshot", label: "Capturing screen", icon: Camera, color: "bg-cyan-400" },
  { id: "analyzing", label: "Analyzing...", icon: Eye, color: "bg-violet-400" },
  { id: "notes", label: "Saving to Notes", icon: FileText, color: "bg-amber-400" },
  { id: "done", label: "Complete", icon: CheckCircle2, color: "bg-emerald-400" },
];

const typeColors: Record<string, string> = {
  thinking: "text-violet-600 bg-violet-50 border-violet-100",
  plan: "text-brand bg-brand-subtle border-brand/20",
  action: "text-amber-600 bg-amber-50 border-amber-100",
  feedback: "text-cyan-600 bg-cyan-50 border-cyan-100",
  result: "text-emerald-600 bg-emerald-50 border-emerald-100",
};

/* ── Flow connectors ── */
function FlowDot({ direction }: { direction: "right" | "left" }) {
  const isRight = direction === "right";
  return (
    <svg width="40" height="2" className="overflow-visible shrink-0">
      <line x1="0" y1="1" x2="40" y2="1" stroke="#d1d5db" strokeWidth="1.5" strokeDasharray="4 3" />
      <motion.circle cy="1" r="2" fill={isRight ? "var(--brand)" : "#06b6d4"}
        animate={{ cx: isRight ? [0, 40] : [40, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

/* ── Mini iPhone inside ctrl center (like v1) ── */
function MiniPhone({ stateIdx }: { stateIdx: number }) {
  const current = phoneStates[stateIdx];
  const Icon = current.icon;
  const isDone = current.id === "done";

  return (
    <div className="flex flex-col items-center">
      <div className="w-[90px]">
        <div className="rounded-[1.2rem] border border-gray-200 bg-gray-50 p-[2px]">
          <div className="relative h-[170px] rounded-[1.05rem] bg-white overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 h-[8px] w-[32px] rounded-full bg-gray-100" />

            {/* Screen content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + stateIdx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center gap-1.5"
              >
                {isDone ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : current.id === "screenshot" ? (
                  <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: 2 }}>
                    <Camera className="h-5 w-5 text-cyan-500" />
                  </motion.div>
                ) : current.id === "analyzing" ? (
                  <Eye className="h-5 w-5 text-violet-500" />
                ) : current.id === "pricing" || current.id === "navigating" ? (
                  <>
                    <Globe className="h-4 w-4 text-brand" />
                    <div className="mx-2 space-y-1 w-full px-3">
                      <div className="h-1.5 w-full rounded bg-gray-100" />
                      <div className="h-1.5 w-3/4 rounded bg-gray-100" />
                      <div className="h-1.5 w-1/2 rounded bg-gray-100" />
                    </div>
                  </>
                ) : current.id === "notes" ? (
                  <>
                    <FileText className="h-4 w-4 text-amber-500" />
                    <div className="mx-2 space-y-1 w-full px-3">
                      <div className="h-1.5 w-full rounded bg-amber-50" />
                      <div className="h-1.5 w-2/3 rounded bg-amber-50" />
                    </div>
                  </>
                ) : (
                  <div className="mx-2 grid grid-cols-3 gap-1 w-full px-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="aspect-square rounded bg-gray-50" />
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Status bar */}
            <div className="mx-1.5 mb-1.5 flex items-center gap-1 rounded bg-gray-50 px-1.5 py-0.5">
              <div className={`h-1 w-1 rounded-full ${current.color}`} />
              <span className="text-[6px] font-mono text-gray-400 truncate">
                {current.label}
              </span>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[3px] w-[36px] rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
      <span className="mt-1.5 text-[9px] font-mono text-gray-400">iPhone state</span>
    </div>
  );
}

/* ── Ctrl Center Panel (two-column: trace + mini phone, like v1) ── */
function CtrlCenterPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [visibleCount, setVisibleCount] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!inView) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const runCycle = () => {
      setVisibleCount(0);
      timersRef.current = [];
      traceDelays.forEach((delay, i) => {
        timersRef.current.push(setTimeout(() => setVisibleCount(i + 1), delay));
      });
      timersRef.current.push(setTimeout(() => runCycle(), 13000));
    };

    runCycle();
    return () => timersRef.current.forEach(clearTimeout);
  }, [inView]);

  return (
    <div ref={ref} className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-2.5">
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-2 w-2 rounded-full bg-emerald-400"
        />
        <span className="text-[12px] font-mono font-medium text-gray-600">
          ctrl center
        </span>
        <span className="ml-auto text-[11px] font-mono text-gray-400">
          iPhone connected
        </span>
      </div>

      {/* Two-column: trace + mini phone */}
      <div className="flex">
        {/* Left: Trace */}
        <div className="flex-1 min-w-0 border-r border-gray-100 px-4 py-3 space-y-1.5 min-h-[260px] overflow-hidden">
          <AnimatePresence>
            {traceSteps.slice(0, visibleCount).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex items-start gap-2 rounded-lg border px-2.5 py-1.5 ${typeColors[step.type]}`}
              >
                <step.icon className="h-3 w-3 shrink-0 mt-0.5" strokeWidth={2} />
                <span className="text-[11px] leading-tight font-mono">
                  {step.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Right: Mini phone */}
        <div className="flex items-center justify-center px-4 py-3 shrink-0">
          <MiniPhone stateIdx={Math.min(visibleCount, phoneStates.length - 1)} />
        </div>
      </div>

      {/* Skill file indicator */}
      <div className="flex items-center gap-2 border-t border-brand/20 bg-brand-subtle/50 px-4 py-2">
        <Code2 className="h-3 w-3 text-brand" />
        <span className="text-[11px] font-mono text-brand">
          competitor-research.connect
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-1 w-1 rounded-full bg-emerald-400"
          />
          running
        </span>
      </div>
    </div>
  );
}

/* ── Execution Phone (standalone, right side) ── */
function ExecutionPhone() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.3 });
  const [stateIdx, setStateIdx] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!inView) return;
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    const runCycle = () => {
      setStateIdx(0);
      timersRef.current = [];
      traceDelays.forEach((delay, i) => {
        timersRef.current.push(setTimeout(() => setStateIdx(i), delay));
      });
      timersRef.current.push(setTimeout(() => runCycle(), 13000));
    };

    runCycle();
    return () => timersRef.current.forEach(clearTimeout);
  }, [inView]);

  const current = phoneStates[stateIdx];
  const Icon = current.icon;
  const isDone = current.id === "done";
  const isCapture = current.id === "screenshot";

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-[160px]">
        {/* Phone frame */}
        <div className="rounded-[2rem] border-2 border-gray-200 bg-gray-50 p-[3px] shadow-lg shadow-gray-200/50">
          <div className="relative h-[320px] rounded-[1.75rem] bg-white overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-10 h-[12px] w-[50px] rounded-full bg-gray-100" />

            {/* Screen */}
            <div className="flex-1 mt-8 mx-2 rounded-lg bg-gray-50 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id + stateIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center h-full gap-2"
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />
                      <span className="text-[10px] font-mono text-emerald-500">Saved</span>
                    </>
                  ) : isCapture ? (
                    <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 0.4, repeat: 3 }}>
                      <Camera className="h-7 w-7 text-cyan-500" />
                    </motion.div>
                  ) : current.id === "analyzing" ? (
                    <>
                      <Eye className="h-6 w-6 text-violet-500" />
                      <motion.div
                        animate={{ width: ["20%", "80%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                        className="h-1.5 rounded bg-violet-200 mx-6"
                        style={{ width: "60%" }}
                      />
                    </>
                  ) : current.id === "pricing" || current.id === "navigating" ? (
                    <div className="w-full px-4 space-y-2">
                      <div className="h-3 w-full rounded bg-gray-100" />
                      <div className="h-2 w-full rounded bg-gray-100" />
                      <div className="h-2 w-3/4 rounded bg-gray-100" />
                      <div className="mt-3 grid grid-cols-3 gap-2">
                        <div className="h-12 rounded-lg bg-brand-subtle" />
                        <div className="h-12 rounded-lg bg-brand-subtle" />
                        <div className="h-12 rounded-lg bg-brand-subtle" />
                      </div>
                      <div className="h-2 w-1/2 rounded bg-gray-100" />
                    </div>
                  ) : current.id === "notes" ? (
                    <div className="w-full px-4 space-y-2">
                      <FileText className="h-5 w-5 text-amber-500 mx-auto" />
                      <div className="h-2 w-full rounded bg-amber-50" />
                      <div className="h-2 w-2/3 rounded bg-amber-50" />
                      <div className="h-2 w-4/5 rounded bg-amber-50" />
                    </div>
                  ) : (
                    <div className="w-full px-4 grid grid-cols-4 gap-2">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="aspect-square rounded-lg bg-gray-100" />
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Status bar */}
            <div className="mx-2 mb-2 mt-1.5 flex items-center gap-1.5 rounded-lg bg-gray-50 px-2 py-1">
              <div className={`h-1.5 w-1.5 rounded-full ${current.color}`} />
              <span className="text-[9px] font-mono text-gray-500">{current.label}</span>
            </div>

            {/* Home indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 h-[4px] w-[60px] rounded-full bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Feedback indicator when capturing */}
      {isCapture && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 flex items-center gap-1.5 rounded-full bg-cyan-50 border border-cyan-200 px-3 py-1"
        >
          <Eye className="h-3 w-3 text-cyan-500" />
          <span className="text-[10px] font-mono text-cyan-600">→ sending to agent</span>
        </motion.div>
      )}
    </div>
  );
}

const features = [
  { icon: Brain, label: "You ask", desc: "Describe any goal in plain English", color: "text-violet-500 bg-violet-50" },
  { icon: Code2, label: "It plans", desc: "Agent breaks the goal into steps", color: "text-brand bg-brand-subtle" },
  { icon: Smartphone, label: "It acts", desc: "Taps, swipes, and types on your iPhone", color: "text-emerald-500 bg-emerald-50" },
  { icon: Eye, label: "It reports", desc: "Sends results back to you", color: "text-cyan-500 bg-cyan-50" },
];

export function VideoSection() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            eyebrow="How It Works"
            title="Say What You Need. It Handles the Rest."
            subtitle="Describe any goal in plain English — “check competitor pricing”, “post to all my socials”, “back up my photos” — and the agent figures out every tap, swipe, and screenshot on its own."
            linkHref="#demo"
            linkLabel="See the full demo"
          />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {features.map((f) => (
              <span key={f.label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium ${f.color}`}>
                <f.icon className="h-3.5 w-3.5" strokeWidth={2} />
                {f.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Flow: Ctrl Center ↔ Phone */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-14"
        >
          {/* Desktop */}
          <div className="hidden lg:flex items-start justify-center gap-0">
            <div className="flex-1 max-w-[480px]">
              <CtrlCenterPanel />
            </div>

            {/* Bidirectional connectors */}
            <div className="flex flex-col items-center justify-center gap-4 pt-32 shrink-0 px-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-mono text-gray-400">cmds</span>
                <FlowDot direction="right" />
              </div>
              <div className="flex items-center gap-1.5">
                <FlowDot direction="left" />
                <span className="text-[9px] font-mono text-cyan-400">feedback</span>
              </div>
            </div>

            <div className="shrink-0">
              <ExecutionPhone />
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex flex-col items-center gap-4">
            <CtrlCenterPanel />
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-mono text-gray-400">commands ↓</span>
              <span className="text-[10px] font-mono text-cyan-400">↑ feedback</span>
            </div>
            <ExecutionPhone />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
