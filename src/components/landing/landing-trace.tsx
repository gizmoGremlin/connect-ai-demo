"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  ListOrdered,
  Loader2,
  Zap,
} from "lucide-react";
import type { TraceScenario } from "@/data/landing-trace-scenarios";

interface LandingTraceProps {
  scenarios: TraceScenario[];
  cycleInterval?: number;
  trigger?: "auto" | "inView";
  size?: "sm" | "md";
  showHeader?: boolean;
  className?: string;
}

type RenderedEntry = {
  type: "thinking" | "plan" | "action" | "result";
  content: string;
  status: "active" | "done";
};

export function LandingTrace({
  scenarios,
  cycleInterval = 12000,
  trigger = "auto",
  size = "sm",
  showHeader = false,
  className = "",
}: LandingTraceProps) {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [entries, setEntries] = useState<RenderedEntry[]>([]);
  const [fading, setFading] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const shouldRun = trigger === "auto" || isInView;

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const runScenario = useCallback(
    (idx: number) => {
      clearTimers();
      setEntries([]);
      setFading(false);

      const scenario = scenarios[idx % scenarios.length];
      const t = timersRef.current;

      scenario.entries.forEach((entry, i) => {
        t.push(
          setTimeout(() => {
            setEntries((prev) => {
              // Mark previous active entries as done
              const updated = prev.map((e) =>
                e.status === "active" ? { ...e, status: "done" as const } : e
              );
              return [
                ...updated,
                { type: entry.type, content: entry.content, status: "active" },
              ];
            });
          }, entry.delay)
        );
      });

      // After last entry, mark it done
      const lastDelay =
        scenario.entries[scenario.entries.length - 1]?.delay ?? 0;
      t.push(
        setTimeout(() => {
          setEntries((prev) =>
            prev.map((e) =>
              e.status === "active" ? { ...e, status: "done" as const } : e
            )
          );
        }, lastDelay + 1200)
      );

      // Fade out and cycle
      t.push(
        setTimeout(() => {
          setFading(true);
        }, cycleInterval - 600)
      );

      t.push(
        setTimeout(() => {
          setScenarioIdx((i) => (i + 1) % scenarios.length);
        }, cycleInterval)
      );
    },
    [scenarios, cycleInterval, clearTimers]
  );

  useEffect(() => {
    if (shouldRun) {
      runScenario(scenarioIdx);
    } else {
      clearTimers();
      setEntries([]);
      setFading(false);
    }
    return clearTimers;
  }, [shouldRun, scenarioIdx, runScenario, clearTimers]);

  const iconSize = size === "sm" ? "h-3 w-3" : "h-3.5 w-3.5";
  const textSize = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div
      ref={containerRef}
      className={`rounded-xl border border-zinc-700/60 bg-zinc-950/90 backdrop-blur-sm p-4 shadow-2xl shadow-black/60 ${className}`}
    >
      {showHeader && (
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 rounded-full bg-blue-500/60" />
          <div className="h-2 w-2 rounded-full bg-cyan-500/60" />
          <div className="h-2 w-2 rounded-full bg-teal-500/60" />
          <span className="ml-2 text-[9px] text-zinc-600 font-mono">
            ctrl center
          </span>
          {entries.some((e) => e.status === "active") && (
            <Loader2 className="ml-auto h-2.5 w-2.5 animate-spin text-blue-400" />
          )}
          {entries.length > 0 &&
            entries.every((e) => e.status === "done") && (
              <CheckCircle2 className="ml-auto h-2.5 w-2.5 text-teal-400" />
            )}
        </div>
      )}

      <div
        className={`space-y-1.5 font-mono ${size === "sm" ? "min-h-[120px]" : "min-h-[160px]"}`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={scenarioIdx}
            initial={{ opacity: 0 }}
            animate={{ opacity: fading ? 0 : 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-1.5"
          >
            {entries.map((entry, i) => (
              <motion.div
                key={`${scenarioIdx}-${i}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <TraceRow
                  entry={entry}
                  iconSize={iconSize}
                  textSize={textSize}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TraceRow({
  entry,
  iconSize,
  textSize,
}: {
  entry: RenderedEntry;
  iconSize: string;
  textSize: string;
}) {
  const isActive = entry.status === "active";

  switch (entry.type) {
    case "thinking":
      return (
        <div className="flex items-start gap-1.5">
          <Brain
            className={`${iconSize} shrink-0 mt-0.5 text-cyan-400 ${isActive ? "animate-pulse" : "opacity-50"}`}
          />
          <p className={`${textSize} italic text-zinc-500 leading-relaxed`}>
            {entry.content}
          </p>
        </div>
      );

    case "plan":
      return (
        <div className="flex items-start gap-1.5">
          {isActive ? (
            <ListOrdered
              className={`${iconSize} shrink-0 mt-0.5 text-blue-400 animate-pulse`}
            />
          ) : (
            <CheckCircle2
              className={`${iconSize} shrink-0 mt-0.5 text-blue-400/60`}
            />
          )}
          <p
            className={`${textSize} ${isActive ? "text-zinc-300" : "text-zinc-600"}`}
          >
            {entry.content}
          </p>
        </div>
      );

    case "action":
      return (
        <div className="flex items-start gap-1.5">
          {isActive ? (
            <Loader2
              className={`${iconSize} shrink-0 mt-0.5 text-blue-400 animate-spin`}
            />
          ) : (
            <CheckCircle2
              className={`${iconSize} shrink-0 mt-0.5 text-teal-400`}
            />
          )}
          <p
            className={`${textSize} font-medium ${isActive ? "text-blue-300" : "text-zinc-500"}`}
          >
            {entry.content}
          </p>
        </div>
      );

    case "result":
      return (
        <div className="rounded-md border border-teal-500/20 bg-teal-500/5 px-2 py-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2
              className={`${iconSize} text-teal-400 shrink-0`}
            />
            <p className={`${textSize} text-teal-300`}>{entry.content}</p>
          </div>
        </div>
      );
  }
}
