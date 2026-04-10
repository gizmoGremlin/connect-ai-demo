"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Search,
  Star,
  GitFork,
  Sun,
  ShoppingCart,
  Camera,
  Wrench,
  Cpu,
  Box,
} from "lucide-react";

/* ── Code editor mockup — light theme ── */
function CodeEditorMockup() {
  return (
    <div className="w-[260px] sm:w-[280px]">
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg shadow-gray-200/50">
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-gray-100 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-red-400" />
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="h-2 w-2 rounded-full bg-green-400" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Code2 className="h-2.5 w-2.5 text-gray-400 mr-1" />
            <span className="text-[10px] font-mono text-gray-400">
              price-watch.connect
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-mono text-emerald-600">
              running
            </span>
          </div>
        </div>

        {/* Code body */}
        <div className="p-3 sm:p-4 bg-gray-50/50">
          <pre className="text-[10px] sm:text-[11px] font-mono leading-relaxed">
            <span className="text-emerald-600">skill</span>
            <span className="text-gray-700"> </span>
            <span className="text-amber-600">&quot;Price Watch&quot;</span>
            <span className="text-gray-700">{" {"}</span>
            {"\n"}
            <span className="text-gray-700">{"  "}</span>
            <span className="text-emerald-600">set</span>
            <span className="text-gray-700"> target = </span>
            <span className="text-blue-600">49.99</span>
            {"\n\n"}
            <span className="text-gray-700">{"  "}</span>
            <span className="text-emerald-600">open</span>
            <span className="text-gray-700"> app </span>
            <span className="text-amber-600">&quot;Safari&quot;</span>
            {"\n"}
            <span className="text-gray-700">{"  "}</span>
            <span className="text-emerald-600">navigate</span>
            <span className="text-gray-700"> </span>
            <span className="text-amber-600">&quot;amazon.com/dp/...&quot;</span>
            {"\n"}
            <span className="text-gray-700">{"  "}</span>
            <span className="text-emerald-600">screenshot</span>
            <span className="text-gray-400"> -&gt; </span>
            <span className="text-emerald-600">analyze</span>
            {"\n\n"}
            <span className="text-gray-700">{"  "}</span>
            <span className="text-violet-600">if</span>
            <span className="text-gray-700"> analysis.price &lt;= target </span>
            <span className="text-gray-700">{"{"}</span>
            {"\n"}
            <span className="text-gray-700">{"    "}</span>
            <span className="text-emerald-600">open</span>
            <span className="text-gray-700"> app </span>
            <span className="text-amber-600">&quot;Messages&quot;</span>
            {"\n"}
            <span className="text-gray-700">{"    "}</span>
            <span className="text-emerald-600">type</span>
            <span className="text-gray-700"> </span>
            <span className="text-amber-600">&quot;Price dropped!&quot;</span>
            {"\n"}
            <span className="text-gray-700">{"    "}</span>
            <span className="text-emerald-600">tap</span>
            <span className="text-gray-700"> </span>
            <span className="text-amber-600">&quot;Send&quot;</span>
            {"\n"}
            <span className="text-gray-700">{"  }"}</span>
            {"\n"}
            <span className="text-gray-700">{"}"}</span>
          </pre>
        </div>
      </div>
    </div>
  );
}

/* ── Community browser mockup — light theme ── */
const communitySkills = [
  {
    icon: Sun,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    name: "Morning Briefing",
    author: "connectai",
    installs: "4,123",
  },
  {
    icon: ShoppingCart,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    name: "Price Watcher",
    author: "marcust",
    installs: "3,891",
  },
  {
    icon: Camera,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    name: "Auto-Post Photos",
    author: "sarahk",
    installs: "2,547",
  },
];

function CommunityBrowserMockup() {
  return (
    <div className="w-[220px] sm:w-[240px]">
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-lg shadow-gray-200/50">
        {/* Search bar */}
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-lg bg-gray-50 border border-gray-200 px-2.5 py-1.5">
            <Search className="h-3 w-3 text-gray-400 shrink-0" />
            <span className="text-[10px] font-mono text-gray-400">
              Search 2,400+ skills...
            </span>
          </div>
        </div>

        {/* Skill cards */}
        <div className="px-3 pb-3 space-y-2">
          {communitySkills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50/50 px-2.5 py-2"
            >
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${skill.iconBg}`}
              >
                <skill.icon className={`h-3.5 w-3.5 ${skill.iconColor}`} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium text-gray-800 truncate">
                  {skill.name}
                </p>
                <p className="text-[9px] text-gray-400">
                  by {skill.author} &middot; {skill.installs}
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-[9px] font-medium text-emerald-600">
                Install
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 4 feature cards ── */
const features = [
  {
    title: (
      <>
        A DSL that reads like{" "}
        <span className="text-emerald-600">plain English.</span>
      </>
    ),
    desc: "Variables, loops, conditionals, and built-in AI vision \u2014 all in readable pseudocode you can learn in minutes. If you can describe it, you can script it.",
    mockup: (
      <div className="space-y-2.5 p-4">
        {[
          { plain: "Check the price", code: 'screenshot -> analyze' },
          { plain: "Is it low enough?", code: "if analysis.price <= target" },
          { plain: "Let me know", code: 'type "Price dropped!"' },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="flex-1 rounded-lg bg-white border border-gray-200 px-2.5 py-1.5">
              <span className="text-[10px] text-gray-400 italic">
                {row.plain}
              </span>
            </div>
            <span className="text-[10px] text-gray-300 shrink-0">&rarr;</span>
            <div className="flex-1 rounded-lg bg-emerald-50 border border-emerald-100 px-2.5 py-1.5">
              <span className="text-[10px] font-mono text-emerald-600">
                {row.code}
              </span>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: (
      <>
        Thousands of skills.{" "}
        <span className="text-blue-600">One tap to run.</span>
      </>
    ),
    desc: "Price monitoring, social posting, morning briefings, message auto-replies \u2014 browse community-built skills or fork one and make it yours.",
    mockup: (
      <div className="p-4">
        {/* Category pills */}
        <div className="flex items-center gap-1.5 mb-3">
          {["Social", "Finance", "Productivity", "Photos"].map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-white border border-gray-200 px-2 py-0.5 text-[8px] text-gray-500"
            >
              {cat}
            </span>
          ))}
        </div>
        {/* Mini skill grid */}
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { emoji: "\u{1F305}", name: "Morning Brief", count: "4.1k" },
            { emoji: "\u{1F4B0}", name: "Price Watch", count: "3.9k" },
            { emoji: "\u{1F4F8}", name: "Auto-Post", count: "2.5k" },
            { emoji: "\u{1F4CB}", name: "Meeting Notes", count: "2.1k" },
            { emoji: "\u{1F514}", name: "DM Alerts", count: "1.8k" },
            { emoji: "\u{1F4CA}", name: "Analytics", count: "1.4k" },
          ].map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-1.5 rounded-lg bg-white border border-gray-200 px-2 py-1.5"
            >
              <span className="text-[10px]">{s.emoji}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[9px] font-medium text-gray-700 truncate">
                  {s.name}
                </p>
                <p className="text-[7px] text-gray-400">{s.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        Open source.{" "}
        <span className="text-violet-600">Top to bottom.</span>
      </>
    ),
    desc: "The .connect language, runtime, and every community script are on GitHub. Read every line, audit every automation, contribute back.",
    mockup: (
      <div className="p-4">
        {/* Repo header */}
        <div className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-2.5 py-2 mb-3">
          <GitFork className="h-3 w-3 text-gray-400 shrink-0" />
          <span className="text-[10px] font-mono text-gray-700 flex-1 truncate">
            connectai/.connect-lang
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
              <Star className="h-2.5 w-2.5 text-amber-400" /> 2.4k
            </span>
            <span className="flex items-center gap-0.5 text-[9px] text-gray-400">
              <GitFork className="h-2.5 w-2.5" /> 380
            </span>
          </div>
        </div>

        {/* Contribution heatmap */}
        <div className="mb-3">
          <p className="text-[8px] text-gray-400 mb-1.5">Contributions</p>
          <div className="flex gap-[3px]">
            {Array.from({ length: 7 }).map((_, col) => (
              <div key={col} className="flex flex-col gap-[3px]">
                {Array.from({ length: 5 }).map((_, row) => {
                  const intensity = [
                    [0, 1, 2, 1, 0],
                    [1, 2, 3, 2, 1],
                    [2, 3, 3, 1, 2],
                    [1, 2, 1, 3, 2],
                    [0, 3, 2, 2, 1],
                    [2, 1, 3, 2, 3],
                    [1, 2, 2, 3, 1],
                  ][col][row];
                  const colors = [
                    "bg-gray-100",
                    "bg-emerald-100",
                    "bg-emerald-300",
                    "bg-emerald-500",
                  ];
                  return (
                    <div
                      key={row}
                      className={`h-2 w-2 rounded-[2px] ${colors[intensity]}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Recent commits */}
        <div className="space-y-1.5">
          {[
            "feat: add repeat-until loop construct",
            "fix: screenshot timing on iOS 18",
            "docs: update quickstart guide",
          ].map((msg, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-violet-500 shrink-0" />
              <span className="text-[9px] font-mono text-gray-500 truncate">
                {msg}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: (
      <>
        Don&apos;t buy it.{" "}
        <span className="text-cyan-600">Build it yourself.</span>
      </>
    ),
    desc: "Our cookbook walks you through building a Connect AI device from off-the-shelf parts for ~$30. ESP32, a USB-C audio bridge, and a 3D-printed case. We believe in open access.",
    mockup: (
      <div className="p-4">
        {/* Parts list */}
        <div className="space-y-1.5 mb-3">
          {[
            { icon: Cpu, name: "ESP32-S3 DevKit", price: "~$8", color: "text-blue-500", bg: "bg-blue-50" },
            { icon: Box, name: "USB-C Audio Bridge", price: "~$12", color: "text-amber-500", bg: "bg-amber-50" },
            { icon: Wrench, name: "3D Printed Case + MagSafe", price: "~$8", color: "text-emerald-500", bg: "bg-emerald-50" },
          ].map((part) => (
            <div
              key={part.name}
              className="flex items-center gap-2 rounded-lg bg-white border border-gray-200 px-2.5 py-1.5"
            >
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${part.bg}`}>
                <part.icon className={`h-3 w-3 ${part.color}`} />
              </div>
              <span className="flex-1 text-[10px] text-gray-700">{part.name}</span>
              <span className="text-[10px] font-mono text-gray-400">{part.price}</span>
            </div>
          ))}
        </div>
        {/* Total + time */}
        <div className="rounded-lg bg-cyan-50 border border-cyan-100 px-2.5 py-2 text-center">
          <p className="text-[11px] font-medium text-cyan-700">~$30 in parts &middot; 2&ndash;3 hours</p>
          <p className="text-[9px] text-cyan-500 mt-0.5">Full guide + STL files + firmware included</p>
        </div>
      </div>
    ),
  },
];

export function OpenScripts() {
  return (
    <section className="bg-gray-50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <p className="text-[14px] font-medium italic text-emerald-600">
            Open Source &amp; Community-Driven
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            Read Every Line.
            <br />
            Build Every Part.
          </h2>
          <p className="mt-5 text-[17px] text-gray-500 leading-relaxed max-w-2xl">
            The{" "}
            <code className="rounded bg-gray-200 px-1.5 py-0.5 font-mono text-sm text-emerald-600">
              .connect
            </code>{" "}
            scripting language, the runtime, and the hardware itself are fully
            open source. Browse thousands of community skills, write your own in
            a readable DSL, or build the entire device from off-the-shelf parts.
          </p>
        </motion.div>

        {/* Center visual: code editor + community browser */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-10"
        >
          <CodeEditorMockup />
          <CommunityBrowserMockup />
        </motion.div>

        {/* 4 feature cards — 2x2 grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white"
            >
              {/* CSS mockup visual */}
              <div className="aspect-[16/10] overflow-hidden bg-gray-50">
                {f.mockup}
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
