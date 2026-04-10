"use client";

import { useReducer, useRef, useEffect, useCallback } from "react";
import {
  Brain,
  Loader2,
  Code2,
  CheckCircle2,
  Send,
  Volume2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  getAgentResponse,
  type MockAgentResponse,
} from "@/data/mock-agent-responses";
import type { TraceEntry } from "./execution-trace";

type Status =
  | "idle"
  | "thinking"
  | "planning"
  | "generating"
  | "executing"
  | "done";

interface State {
  status: Status;
  prompt: string;
  inputValue: string;
  response: MockAgentResponse | null;
  visiblePlanSteps: number;
  visibleScriptLines: number;
  executionProgress: number;
}

type Action =
  | { type: "SET_INPUT"; value: string }
  | { type: "SUBMIT" }
  | { type: "SET_STATUS"; status: Status }
  | { type: "SET_RESPONSE"; response: MockAgentResponse }
  | { type: "SHOW_PLAN_STEP" }
  | { type: "SHOW_SCRIPT_LINE" }
  | { type: "ADVANCE_EXECUTION" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.value };
    case "SUBMIT":
      return {
        ...state,
        status: "thinking",
        prompt: state.inputValue,
        inputValue: "",
        response: null,
        visiblePlanSteps: 0,
        visibleScriptLines: 0,
        executionProgress: 0,
      };
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "SET_RESPONSE":
      return { ...state, response: action.response };
    case "SHOW_PLAN_STEP":
      return { ...state, visiblePlanSteps: state.visiblePlanSteps + 1 };
    case "SHOW_SCRIPT_LINE":
      return { ...state, visibleScriptLines: state.visibleScriptLines + 1 };
    case "ADVANCE_EXECUTION":
      return {
        ...state,
        executionProgress: state.executionProgress + 1,
      };
    case "RESET":
      return { ...state, status: "idle", prompt: "", response: null };
    default:
      return state;
  }
}

const initialState: State = {
  status: "idle",
  prompt: "",
  inputValue: "",
  response: null,
  visiblePlanSteps: 0,
  visibleScriptLines: 0,
  executionProgress: 0,
};

const statusLabels: Record<Status, string> = {
  idle: "Ready",
  thinking: "Understanding...",
  planning: "Planning...",
  generating: "Generating script...",
  executing: "Executing...",
  done: "Complete",
};

/* ── Blast Off detection ── */
function isBlastOff(prompt: string): boolean {
  const lower = prompt.toLowerCase();
  return (
    lower.includes("blast off") ||
    lower.includes("blastoff") ||
    lower.includes("take a screenshot") ||
    lower.includes("take screenshot")
  );
}

const blastOffResponse: MockAgentResponse = {
  plan: [
    "Connect to TTS service",
    "Generate voice command: 'Take screenshot'",
    "Play audio through speaker",
    "Wait for phone response",
  ],
  script: `skill "Blast Off" {
  connect voice_ai
  generate_tts "Take screenshot"
  play_audio output
  wait_for_response 5s
  capture_result
}`,
  summary:
    "Voice command delivered. Hold your iPhone near the speaker — it should take a screenshot.",
};

/* ── Trace helpers ── */
let traceIdCounter = 0;
function makeEntry(
  type: TraceEntry["type"],
  content: string,
  status: TraceEntry["status"] = "active"
): TraceEntry {
  return {
    id: `t-${++traceIdCounter}`,
    type,
    content,
    timestamp: Date.now(),
    status,
  };
}

export function AgentChat({
  deviceName,
  onTraceUpdate,
}: {
  deviceName?: string;
  onTraceUpdate?: (entries: TraceEntry[]) => void;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const chatRef = useRef<HTMLDivElement>(null);
  const traceRef = useRef<TraceEntry[]>([]);

  const pushTrace = useCallback(
    (entry: TraceEntry) => {
      traceRef.current = [...traceRef.current, entry];
      onTraceUpdate?.(traceRef.current);
    },
    [onTraceUpdate]
  );

  const updateLastTrace = useCallback(
    (updates: Partial<TraceEntry>) => {
      const entries = [...traceRef.current];
      const last = entries[entries.length - 1];
      if (last) {
        entries[entries.length - 1] = { ...last, ...updates };
        traceRef.current = entries;
        onTraceUpdate?.(entries);
      }
    },
    [onTraceUpdate]
  );

  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [
    state.status,
    state.visiblePlanSteps,
    state.visibleScriptLines,
    state.executionProgress,
  ]);

  /* ── Blast Off execution (real TTS) ── */
  const runBlastOff = useCallback(async () => {
    const response = blastOffResponse;
    dispatch({ type: "SET_RESPONSE", response });
    dispatch({ type: "SET_STATUS", status: "planning" });

    // Reset trace
    traceRef.current = [];
    onTraceUpdate?.([]);

    // Thinking traces
    pushTrace(
      makeEntry(
        "thinking",
        "Analyzing request... The user wants to capture a screenshot on their connected iPhone."
      )
    );

    await delay(800);
    updateLastTrace({ status: "done" });
    pushTrace(
      makeEntry(
        "thinking",
        "Selecting skill: Blast Off — uses TTS voice command via hardware speaker."
      )
    );

    await delay(600);
    updateLastTrace({ status: "done" });

    // Plan traces
    for (let i = 0; i < response.plan.length; i++) {
      pushTrace(makeEntry("plan", response.plan[i], "done"));
      dispatch({ type: "SHOW_PLAN_STEP" });
      await delay(250);
    }

    // Generating
    dispatch({ type: "SET_STATUS", status: "generating" });
    const lines = response.script.split("\n");
    for (let i = 0; i < lines.length; i++) {
      dispatch({ type: "SHOW_SCRIPT_LINE" });
      await delay(80);
    }

    // Executing — real TTS
    dispatch({ type: "SET_STATUS", status: "executing" });
    pushTrace(makeEntry("action", "Connecting to Voice AI..."));
    dispatch({ type: "ADVANCE_EXECUTION" });

    await delay(800);
    updateLastTrace({ status: "done" });
    pushTrace(makeEntry("action", "Generating voice command: 'Take screenshot'"));
    dispatch({ type: "ADVANCE_EXECUTION" });

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: "Take screenshot" }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }));
        throw new Error(err.error || `HTTP ${res.status}`);
      }

      updateLastTrace({ status: "done" });
      pushTrace(
        makeEntry(
          "action",
          "Playing audio — hold your iPhone to the speaker"
        )
      );
      dispatch({ type: "ADVANCE_EXECUTION" });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);

      await new Promise<void>((resolve, reject) => {
        audio.onended = () => {
          URL.revokeObjectURL(url);
          resolve();
        };
        audio.onerror = () => {
          URL.revokeObjectURL(url);
          reject(new Error("Audio playback failed"));
        };
        audio.play().catch(reject);
      });

      updateLastTrace({ status: "done" });
      dispatch({ type: "ADVANCE_EXECUTION" });

      pushTrace(
        makeEntry(
          "result",
          "Voice command delivered. Check your iPhone for the screenshot.",
          "done"
        )
      );
      dispatch({ type: "SET_STATUS", status: "done" });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unknown error";
      updateLastTrace({ status: "done" });
      pushTrace(
        makeEntry("error", `Failed: ${message}`, "done")
      );
      dispatch({ type: "SET_STATUS", status: "done" });
    }
  }, [onTraceUpdate, pushTrace, updateLastTrace]);

  /* ── Mock execution (existing flow) ── */
  const runMock = (inputValue: string) => {
    const response = getAgentResponse(inputValue);
    const t = timersRef.current;
    t.length = 0;

    t.push(
      setTimeout(() => {
        dispatch({ type: "SET_RESPONSE", response });
        dispatch({ type: "SET_STATUS", status: "planning" });

        response.plan.forEach((_, i) => {
          t.push(
            setTimeout(
              () => dispatch({ type: "SHOW_PLAN_STEP" }),
              (i + 1) * 300
            )
          );
        });

        const planDone = (response.plan.length + 1) * 300 + 200;
        t.push(
          setTimeout(() => {
            dispatch({ type: "SET_STATUS", status: "generating" });

            const lines = response.script.split("\n");
            lines.forEach((_, i) => {
              t.push(
                setTimeout(
                  () => dispatch({ type: "SHOW_SCRIPT_LINE" }),
                  (i + 1) * 80
                )
              );
            });

            const scriptDone = (lines.length + 1) * 80 + 300;
            t.push(
              setTimeout(() => {
                dispatch({ type: "SET_STATUS", status: "executing" });

                response.plan.forEach((_, i) => {
                  t.push(
                    setTimeout(
                      () => dispatch({ type: "ADVANCE_EXECUTION" }),
                      (i + 1) * 400
                    )
                  );
                });

                t.push(
                  setTimeout(() => {
                    dispatch({ type: "SET_STATUS", status: "done" });
                  }, (response.plan.length + 1) * 400)
                );
              }, scriptDone)
            );
          }, planDone)
        );
      }, 1000)
    );
  };

  /* ── Submit handler ── */
  const handleSubmit = () => {
    if (!state.inputValue.trim()) return;
    const input = state.inputValue;
    dispatch({ type: "SUBMIT" });

    if (isBlastOff(input)) {
      runBlastOff();
    } else {
      runMock(input);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-5 py-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-blue-500" />
          <span className="text-sm font-semibold">AI Agent</span>
        </div>
        <div className="flex items-center gap-2">
          {deviceName && (
            <span className="text-xs text-muted-foreground font-mono">
              {deviceName}
            </span>
          )}
          <div
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium ${
              state.status === "idle"
                ? "bg-gray-100 text-gray-500"
                : state.status === "done"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-blue-50 text-blue-600"
            }`}
          >
            {state.status !== "idle" && state.status !== "done" && (
              <Loader2 className="h-3 w-3 animate-spin" />
            )}
            {state.status === "done" && (
              <CheckCircle2 className="h-3 w-3" />
            )}
            {statusLabels[state.status]}
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={chatRef}
        className="flex-1 min-h-[300px] max-h-[480px] overflow-y-auto p-5 space-y-4"
      >
        {state.status === "idle" && !state.prompt && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <Brain className="h-10 w-10 text-gray-300 mb-3" />
            <p className="text-sm text-muted-foreground">
              Describe what you want your phone to do.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try{" "}
              <button
                type="button"
                className="text-blue-500 hover:underline"
                onClick={() => {
                  dispatch({ type: "SET_INPUT", value: "Blast off" });
                }}
              >
                &quot;Blast off&quot;
              </button>{" "}
              to test the voice pipeline, or{" "}
              <Link href="/skills" className="text-blue-500 hover:underline">
                browse skills
              </Link>
            </p>
          </div>
        )}

        {state.prompt && (
          <>
            {/* User prompt */}
            <div className="flex justify-end">
              <div className="rounded-2xl rounded-tr-sm bg-blue-50 border border-blue-200 px-4 py-2.5 max-w-[85%]">
                <p className="text-sm text-gray-900">{state.prompt}</p>
              </div>
            </div>

            {/* Thinking */}
            {state.status === "thinking" && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Brain className="h-4 w-4 text-blue-500 animate-pulse" />
                Understanding your request...
              </div>
            )}

            {/* Plan */}
            {state.response && state.status !== "thinking" && (
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Plan
                </p>
                <div className="space-y-1.5">
                  {state.response.plan.map((step, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-sm transition-all duration-200 ${
                        i < state.visiblePlanSteps
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                    >
                      {state.status === "executing" ||
                      state.status === "done" ? (
                        <CheckCircle2
                          className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                            i < state.executionProgress
                              ? "text-emerald-600"
                              : "text-gray-300"
                          }`}
                        />
                      ) : (
                        <span className="text-xs text-gray-400 w-4 text-right shrink-0">
                          {i + 1}.
                        </span>
                      )}
                      <span className="text-gray-700">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Script */}
            {state.response &&
              (state.status === "generating" ||
                state.status === "executing" ||
                state.status === "done") && (
                <div className="rounded-xl border border-emerald-200 overflow-hidden">
                  <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50/40 px-4 py-2">
                    <Code2 className="h-3.5 w-3.5 text-emerald-600" />
                    <span className="text-[11px] font-mono text-emerald-600/80">
                      generated-skill.connect
                    </span>
                    {state.status === "generating" && (
                      <Loader2 className="h-3 w-3 animate-spin text-blue-500 ml-auto" />
                    )}
                    {state.status === "done" && (
                      <button
                        type="button"
                        className="ml-auto flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2 py-0.5 text-[10px] font-medium text-blue-600 hover:bg-blue-100 transition-colors"
                        onClick={() =>
                          import("sonner").then(({ toast }) =>
                            toast.success("Script saved to your skills")
                          )
                        }
                      >
                        <Bookmark className="h-2.5 w-2.5" />
                        Save as Skill
                      </button>
                    )}
                  </div>
                  <pre className="bg-gray-50 p-4 text-xs font-mono leading-relaxed overflow-x-auto text-gray-700">
                    {state.response.script
                      .split("\n")
                      .slice(0, state.visibleScriptLines)
                      .join("\n")}
                    {state.status === "generating" && (
                      <span className="animate-pulse text-emerald-600">|</span>
                    )}
                  </pre>
                </div>
              )}

            {/* Executing */}
            {state.status === "executing" && (
              <div className="flex items-center gap-2 text-sm">
                {isBlastOff(state.prompt) ? (
                  <>
                    <Volume2 className="h-4 w-4 text-blue-500 animate-pulse" />
                    <span className="text-gray-500">
                      Executing voice pipeline...
                    </span>
                  </>
                ) : (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    <span className="text-gray-500">
                      Executing on {deviceName || "device"}...
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Done */}
            {state.status === "done" && state.response && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-600">
                    Done
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-gray-500">
                  {state.response.summary}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder='e.g. "Blast off" to test voice pipeline...'
            value={state.inputValue}
            onChange={(e) =>
              dispatch({ type: "SET_INPUT", value: e.target.value })
            }
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none text-sm"
            rows={1}
            disabled={state.status !== "idle" && state.status !== "done"}
          />
          <Button
            size="icon"
            onClick={handleSubmit}
            disabled={
              !state.inputValue.trim() ||
              (state.status !== "idle" && state.status !== "done")
            }
            className="shrink-0 h-[44px] w-[44px]"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
