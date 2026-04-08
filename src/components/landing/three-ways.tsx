"use client";

import Link from "next/link";
import { ArrowRight, Brain, Users, Code2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "./animated-section";
import { cn } from "@/lib/utils";

const sharedScript = `skill "Morning Briefing" {
  open app "Weather"
  screenshot -> analyze
  save analysis.forecast

  open app "News"
  screenshot -> analyze
  save analysis.headlines

  open app "Messages"
  type summary(forecast, headlines)
  tap "Send"
}`;

const ways = [
  {
    icon: Brain,
    label: "Ask the AI",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    description:
      "Describe what you want in plain English. The AI agent interprets your intent and generates a .connect script automatically.",
    demo: (
      <div className="space-y-2">
        <div className="rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-3 py-2">
          <p className="text-xs text-zinc-400 italic">
            &quot;Every morning, check the weather and news, then text me a summary&quot;
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-px flex-1 border-t border-dashed border-zinc-700/60" />
          <span className="text-[9px] font-mono text-purple-400 shrink-0">
            AI generates
          </span>
          <div className="h-px flex-1 border-t border-dashed border-zinc-700/60" />
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    label: "Browse the Community",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    description:
      "Install pre-built .connect scripts shared by other users. One-click install, or fork and customize to fit your needs.",
    demo: (
      <div className="flex items-center gap-2 rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-3 py-2">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
          <span className="text-xs">&#9728;</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-zinc-300 truncate">
            Morning Briefing
          </p>
          <p className="text-[10px] text-zinc-500">
            by connectai &middot; 4,123 installs
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-blue-500/10 border border-blue-500/30 px-2 py-0.5 text-[9px] font-medium text-blue-400">
          Install
        </span>
      </div>
    ),
  },
  {
    icon: Code2,
    label: "Write Your Own",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    description:
      "The .connect language is open source, readable, and designed to be learned in minutes. If you can read pseudocode, you can write scripts.",
    demo: (
      <div className="rounded-lg border border-zinc-700/60 bg-zinc-800/50 px-3 py-2">
        <div className="flex items-center gap-1.5 text-[9px] text-cyan-400/60 font-mono mb-1">
          <Code2 className="h-2.5 w-2.5" />
          my-skill.connect
        </div>
        <pre className="text-[10px] font-mono leading-relaxed text-zinc-500">
{`skill "My Custom Skill" {
  open app "Safari"
  tap "Search"
  type query
  ...
}`}
        </pre>
      </div>
    ),
  },
];

export function ThreeWays() {
  return (
    <AnimatedSection className="border-t border-border/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Three Ways to Get a Skill
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Every skill on Connect AI is a{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-cyan-400">
              .connect
            </code>{" "}
            script. Get one however fits your style.
          </p>
        </div>

        {/* Three columns */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {ways.map((way) => (
            <div
              key={way.label}
              className="group flex flex-col rounded-2xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-blue-500/20"
            >
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl border",
                    way.border,
                    way.bg
                  )}
                >
                  <way.icon className={cn("h-5 w-5", way.color)} />
                </div>
                <h3 className="text-lg font-semibold">{way.label}</h3>
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {way.description}
              </p>

              {/* Demo area */}
              <div className="mt-4">{way.demo}</div>

              {/* All converge on the same script */}
              <div className="mt-auto pt-4">
                <div className="rounded-lg border border-border/40 bg-zinc-950 p-3">
                  <pre className="text-[10px] font-mono leading-relaxed text-zinc-400 overflow-x-auto">
                    {sharedScript}
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/skills"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "gap-2"
            )}
          >
            Browse All Scripts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </AnimatedSection>
  );
}
