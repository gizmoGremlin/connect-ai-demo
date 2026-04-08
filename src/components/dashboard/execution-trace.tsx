"use client";

import { useEffect, useRef } from "react";
import {
  Brain,
  CheckCircle2,
  AlertCircle,
  Terminal,
  Loader2,
  ListOrdered,
  Zap,
  ImageIcon,
} from "lucide-react";

export type TraceEntry = {
  id: string;
  type: "thinking" | "plan" | "action" | "result" | "error";
  content: string;
  timestamp: number;
  status: "pending" | "active" | "done";
};

export function ExecutionTrace({ entries }: { entries: TraceEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const hasResult = entries.some(
    (e) => e.type === "result" && e.status === "done"
  );

  return (
    <div className="flex h-full flex-col rounded-xl border border-border/60 bg-zinc-950/50">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-border/40 px-4 py-3">
        <Terminal className="h-4 w-4 text-zinc-500" />
        <span className="text-sm font-medium text-zinc-300">
          Execution Trace
        </span>
        {entries.some((e) => e.status === "active") && (
          <Loader2 className="ml-auto h-3.5 w-3.5 animate-spin text-blue-400" />
        )}
        {hasResult && (
          <CheckCircle2 className="ml-auto h-3.5 w-3.5 text-emerald-400" />
        )}
      </div>

      {/* Trace log */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5 min-h-0"
      >
        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <Terminal className="h-8 w-8 text-zinc-700" />
            <p className="mt-3 text-sm text-zinc-600">
              Run a skill to see the execution trace here.
            </p>
          </div>
        ) : (
          entries.map((entry) => <TraceRow key={entry.id} entry={entry} />)
        )}

        {/* Screenshot placeholder */}
        {hasResult && (
          <div className="mt-4 rounded-lg border border-dashed border-zinc-700/60 bg-zinc-900/30 p-4 text-center">
            <ImageIcon className="mx-auto h-6 w-6 text-zinc-600" />
            <p className="mt-2 text-xs text-zinc-600">
              Screenshot (hardware required)
            </p>
            <p className="mt-1 text-[10px] text-zinc-700">
              In production, the device captures and returns the phone screen
              here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function TraceRow({ entry }: { entry: TraceEntry }) {
  const isActive = entry.status === "active";
  const isDone = entry.status === "done";

  switch (entry.type) {
    case "thinking":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-0.5 shrink-0">
            {isActive ? (
              <Brain className="h-3.5 w-3.5 text-purple-400 animate-pulse" />
            ) : (
              <Brain className="h-3.5 w-3.5 text-purple-400/50" />
            )}
          </div>
          <p
            className={`text-xs italic leading-relaxed ${
              isActive ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {entry.content}
          </p>
        </div>
      );

    case "plan":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-0.5 shrink-0">
            {isDone ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-blue-400" />
            ) : isActive ? (
              <ListOrdered className="h-3.5 w-3.5 text-blue-400 animate-pulse" />
            ) : (
              <ListOrdered className="h-3.5 w-3.5 text-zinc-600" />
            )}
          </div>
          <p
            className={`text-xs font-mono ${
              isDone
                ? "text-zinc-500"
                : isActive
                  ? "text-zinc-300"
                  : "text-zinc-600"
            }`}
          >
            {entry.content}
          </p>
        </div>
      );

    case "action":
      return (
        <div className="flex items-start gap-2">
          <div className="mt-0.5 shrink-0">
            {isDone ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            ) : isActive ? (
              <Loader2 className="h-3.5 w-3.5 text-blue-400 animate-spin" />
            ) : (
              <Zap className="h-3.5 w-3.5 text-zinc-600" />
            )}
          </div>
          <p
            className={`text-xs font-medium ${
              isDone
                ? "text-zinc-500"
                : isActive
                  ? "text-blue-300"
                  : "text-zinc-600"
            }`}
          >
            {entry.content}
          </p>
        </div>
      );

    case "result":
      return (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <p className="text-xs text-emerald-300">{entry.content}</p>
          </div>
        </div>
      );

    case "error":
      return (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />
            <p className="text-xs text-red-300">{entry.content}</p>
          </div>
        </div>
      );
  }
}
