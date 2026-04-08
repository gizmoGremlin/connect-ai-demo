"use client";

import {
  MessageSquare,
  Brain,
  Code2,
  Volume2,
  Smartphone,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedSection } from "./animated-section";

const nodes = [
  {
    icon: MessageSquare,
    label: "You Ask",
    desc: "Describe what you want in plain English",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  {
    icon: Brain,
    label: "AI Plans",
    desc: "Interprets intent, designs a step-by-step plan",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
  {
    icon: Code2,
    label: "Script Generated",
    desc: "AI writes a .connect script — open source and readable",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
  },
  {
    icon: Volume2,
    label: "Voice Delivered",
    desc: "Spoken to iPhone via USB-C audio",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  {
    icon: Smartphone,
    label: "Phone Acts",
    desc: "Voice Control taps, types, navigates",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/30",
  },
  {
    icon: Eye,
    label: "Agent Observes",
    desc: "Screenshots back for analysis",
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/30",
  },
];

function DashedConnector({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg width="100%" height="2" className="overflow-visible">
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="text-zinc-700"
        />
      </svg>
    </div>
  );
}

function VerticalDash() {
  return (
    <div className="flex justify-center py-1">
      <svg width="2" height="20">
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="text-zinc-700"
        />
      </svg>
    </div>
  );
}

export function AgentPipeline() {
  return (
    <AnimatedSection className="border-t border-border/40 bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How the Agent Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From your words to your phone&apos;s actions.
          </p>
        </div>

        {/* Desktop: horizontal pipeline */}
        <div className="hidden sm:block mt-16">
          <div className="grid grid-cols-6 gap-0 items-start">
            {nodes.map((node, i) => (
              <div key={node.label} className="relative flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.4 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${node.border} ${node.bg}`}
                  >
                    <node.icon className={`h-6 w-6 ${node.color}`} />
                  </div>
                  <p className="mt-3 text-sm font-semibold">{node.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed max-w-[140px]">
                    {node.desc}
                  </p>
                </motion.div>

                {/* Connector line to next node */}
                {i < nodes.length - 1 && (
                  <div className="absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)]">
                    <DashedConnector />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Feedback loop arrow */}
          <div className="mt-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-4 py-1.5"
            >
              <svg width="16" height="12" viewBox="0 0 16 12" className="text-zinc-500">
                <path
                  d="M14 6H4M4 6L7 3M4 6L7 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <span className="text-[10px] font-mono text-zinc-500">
                adapt &amp; continue
              </span>
            </motion.div>
          </div>
        </div>

        {/* Mobile: vertical pipeline */}
        <div className="sm:hidden mt-12 flex flex-col items-center">
          {nodes.map((node, i) => (
            <div key={node.label}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${node.border} ${node.bg}`}
                >
                  <node.icon className={`h-5 w-5 ${node.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold">{node.label}</p>
                  <p className="text-xs text-muted-foreground">{node.desc}</p>
                </div>
              </motion.div>
              {i < nodes.length - 1 && <VerticalDash />}
            </div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-4 flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-800/50 px-4 py-1.5"
          >
            <svg width="12" height="16" viewBox="0 0 12 16" className="text-zinc-500">
              <path
                d="M6 14V4M6 4L3 7M6 4L9 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
            <span className="text-[10px] font-mono text-zinc-500">
              adapt &amp; continue
            </span>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
