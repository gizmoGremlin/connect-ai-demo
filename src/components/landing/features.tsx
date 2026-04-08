"use client";

import {
  Shield,
  Brain,
  Eye,
  Code2,
  Users,
  Layers,
} from "lucide-react";
import { AnimatedSection } from "./animated-section";

const features = [
  {
    icon: Shield,
    title: "No Jailbreak",
    description: "Works with stock iOS using built-in accessibility features. No modifications to your iPhone required.",
  },
  {
    icon: Brain,
    title: "AI Agent Inside",
    description: "Describe what you want in plain English. The AI interprets your intent, writes a .connect script, and executes it — adapting in real time if something changes.",
  },
  {
    icon: Eye,
    title: "Sees Your Screen",
    description: "The agent takes screenshots and analyzes what's on screen. It makes decisions mid-task based on what it sees — just like you would.",
  },
  {
    icon: Code2,
    title: "Open Source Language",
    description: "The .connect scripting language is fully open source on GitHub. Read the scripts, modify them, write your own from scratch — no black boxes.",
  },
  {
    icon: Users,
    title: "Community Scripts",
    description: "Browse hundreds of .connect scripts shared by the community. Install with one click, or fork and customize. Share your own creations back.",
  },
  {
    icon: Layers,
    title: "Multi-Device",
    description: "Manage multiple devices from one account. Assign different skills to different iPhones.",
  },
];

export function Features() {
  return (
    <AnimatedSection>
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete platform for delegating tasks to your phone
          </p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-blue-500/30 hover:bg-card"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 bg-background transition-colors group-hover:border-blue-500/30">
                <f.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
