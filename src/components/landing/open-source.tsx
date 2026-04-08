"use client";

import { GitFork, MessageCircle, Code2, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

const examples = [
  {
    file: "tiktok-engage.connect",
    title: "Loops & AI Analysis",
    description: "Scroll TikTok, analyze each video, and engage when sentiment is positive.",
    code: `skill "TikTok Auto-Engage" {
  open app "TikTok"
  wait 2s

  repeat 10 {
    swipe up
    wait 3s

    screenshot -> analyze
    if analysis.sentiment == "positive" {
      double_tap  // Like
      tap "comment"
      type analysis.response
      tap "send"
    }
  }
}`,
    annotations: [
      { line: "repeat 10 {", note: "Loop constructs" },
      { line: "screenshot -> analyze", note: "Built-in AI vision" },
      { line: "if analysis.sentiment", note: "Conditional logic from AI" },
    ],
  },
  {
    file: "price-alert.connect",
    title: "Variables & Conditions",
    description: "Check a product price and send an alert when it drops below target.",
    code: `skill "Price Watch" {
  set target = 49.99

  open app "Safari"
  navigate "amazon.com/dp/B0EXAMPLE"
  wait 3s

  screenshot -> analyze
  set price = analysis.price

  if price <= target {
    open app "Messages"
    tap "Mom"
    type "Price dropped to $" + price
    tap "Send"
  }
}`,
    annotations: [
      { line: "set target = 49.99", note: "Variables" },
      { line: "navigate", note: "URL navigation" },
      { line: "set price = analysis.price", note: "Extract data from screen" },
    ],
  },
  {
    file: "backup-photos.connect",
    title: "Simple & Readable",
    description: "Select today's photos and upload them to Google Drive.",
    code: `skill "Photo Backup" {
  open app "Photos"
  tap "Recents"
  select where date == today

  tap "Share"
  tap "Drive"
  tap folder "Backups"
  tap "Upload"
  wait_until complete
}`,
    annotations: [
      { line: "select where date == today", note: "Query syntax" },
      { line: "wait_until complete", note: "Smart waiting" },
    ],
  },
];

export function OpenSource() {
  return (
    <AnimatedSection className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            A Language You Can Actually Read
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
            The{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-cyan-400">
              .connect
            </code>{" "}
            scripting language is designed to be understood at a glance. Loops,
            conditions, AI vision, and app control — all in plain, readable syntax.
            Fully open source on GitHub.
          </p>
        </div>

        {/* Script examples */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {examples.map((ex) => (
            <div
              key={ex.file}
              className="flex flex-col rounded-2xl border border-border/60 bg-card/50 overflow-hidden"
            >
              {/* Header */}
              <div className="border-b border-border/40 px-5 py-3">
                <div className="flex items-center gap-2">
                  <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                  <span className="text-xs font-mono text-muted-foreground">
                    {ex.file}
                  </span>
                </div>
                <h3 className="mt-1.5 text-sm font-semibold">{ex.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {ex.description}
                </p>
              </div>

              {/* Code */}
              <div className="flex-1 bg-zinc-950 p-4">
                <pre className="text-[11px] font-mono leading-relaxed text-zinc-400 overflow-x-auto">
                  {ex.code}
                </pre>
              </div>

              {/* Annotations */}
              <div className="border-t border-border/40 px-4 py-3 space-y-1.5">
                {ex.annotations.map((a) => (
                  <div
                    key={a.note}
                    className="flex items-center gap-2 text-[10px]"
                  >
                    <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-cyan-400 truncate max-w-[140px]">
                      {a.line}
                    </code>
                    <span className="text-zinc-500">{a.note}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <GitFork className="h-4 w-4" />
            Language Spec on GitHub
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
          >
            <MessageCircle className="h-4 w-4" />
            Join Discord
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}
