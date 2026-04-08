"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Brain, Loader2, Send, ArrowRight, Code2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockScript = `skill "Post to Instagram" {
  open app "Photos"
  tap "Recents"
  tap first_photo

  tap "Share"
  tap "Instagram"
  wait 2s

  screenshot -> analyze
  type analysis.caption
  tap "Share"
}`;

export function AiPromptBox() {
  const [prompt, setPrompt] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "generating" | "done">("idle");
  const [visibleLines, setVisibleLines] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    const t = timerRef.current;
    t.length = 0;
    setPhase("thinking");
    setVisibleLines(0);

    t.push(
      setTimeout(() => {
        setPhase("generating");
        const lines = mockScript.split("\n");
        lines.forEach((_, i) => {
          t.push(
            setTimeout(() => setVisibleLines(i + 1), (i + 1) * 60)
          );
        });
        t.push(
          setTimeout(() => setPhase("done"), (lines.length + 1) * 60 + 200)
        );
      }, 1200)
    );
  };

  const handleReset = () => {
    timerRef.current.forEach(clearTimeout);
    setPhase("idle");
    setPrompt("");
    setVisibleLines(0);
  };

  const scriptLines = mockScript.split("\n");

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
        <Brain className="h-4 w-4" />
        AI Script Generator
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Describe what you want your phone to do. The AI agent writes a{" "}
        <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-xs text-cyan-400">
          .connect
        </code>{" "}
        script for it.
      </p>

      {phase === "idle" && (
        <>
          <Textarea
            className="mt-4 min-h-[80px] resize-none bg-background/50"
            placeholder="e.g., Post my latest photo to Instagram with a summer caption..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            className="mt-3 gap-2"
            onClick={handleGenerate}
            disabled={!prompt.trim()}
          >
            <Send className="h-4 w-4" />
            Generate Script
          </Button>
        </>
      )}

      {phase === "thinking" && (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-700/60 bg-zinc-800/30 px-4 py-2.5">
            <p className="text-sm text-zinc-300 italic">&quot;{prompt}&quot;</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            Interpreting your request...
          </div>
        </div>
      )}

      {(phase === "generating" || phase === "done") && (
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-zinc-700/60 bg-zinc-800/30 px-4 py-2.5">
            <p className="text-sm text-zinc-300 italic">&quot;{prompt}&quot;</p>
          </div>

          {/* Generated script */}
          <div className="rounded-xl border border-border/40 bg-zinc-950 overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border/30 px-4 py-2">
              <Code2 className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[11px] font-mono text-muted-foreground">
                generated-skill.connect
              </span>
              {phase === "generating" && (
                <Loader2 className="h-3 w-3 animate-spin text-blue-400 ml-auto" />
              )}
            </div>
            <pre className="p-4 text-[12px] font-mono leading-relaxed text-zinc-400 overflow-x-auto min-h-[120px]">
              {scriptLines.slice(0, visibleLines).join("\n")}
              {phase === "generating" && (
                <span className="animate-pulse text-cyan-400">|</span>
              )}
            </pre>
          </div>

          {phase === "done" && (
            <div className="flex items-center gap-2">
              <Link
                href="/signup"
                className={cn(buttonVariants({ size: "sm" }), "gap-2")}
              >
                <Bookmark className="h-3 w-3" />
                Save & Install
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Try another
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
