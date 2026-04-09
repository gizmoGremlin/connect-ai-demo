"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";

/* ── Scattered "manual task" cards for the problem side ── */
const manualTasks = [
  {
    text: "Open Instagram \u2192 new post \u2192 select photo \u2192 write caption \u2192 add hashtags \u2192 share",
    rotate: "-2deg",
    pos: "top-6 left-4",
  },
  {
    text: "Check 3 competitor sites for price changes every morning",
    rotate: "1.5deg",
    pos: "top-28 right-3",
  },
  {
    text: "Copy from Safari \u2192 switch to Notes \u2192 paste \u2192 switch back \u2192 repeat",
    rotate: "-1deg",
    pos: "top-48 left-8",
  },
  {
    text: "Send the same follow-up DM to 12 people one by one",
    rotate: "2.5deg",
    pos: "bottom-24 right-6",
  },
  {
    text: "Screenshot receipt \u2192 crop \u2192 open expense app \u2192 upload \u2192 categorize",
    rotate: "-1.5deg",
    pos: "bottom-8 left-3",
  },
];

export function ProblemSolution() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
            A Hardware Agent for the
            <br />
            Device You Already Own.
          </h2>
          <p className="mt-5 text-[17px] text-gray-500 leading-relaxed">
            Not an app. Not a shortcut. A physical device that sees your screen,
            understands your goals, and operates your phone like a second pair of
            hands.
          </p>
        </motion.div>

        {/* Split comparison */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
          {/* LEFT — The problem */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 via-gray-300/80 to-blue-200/40 p-6 sm:p-8 min-h-[380px]"
          >
            <p className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
              Without Connect AI
            </p>
            <p className="mt-1.5 text-[13px] text-gray-400">
              Every task is a dozen taps
            </p>

            {/* Scattered task cards */}
            <div className="relative mt-6 h-[280px]">
              {manualTasks.map((task, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  style={{ rotate: task.rotate }}
                  className={`absolute ${task.pos} max-w-[240px] rounded-xl border border-gray-300/50 bg-white/70 backdrop-blur-sm px-3 py-2 shadow-sm`}
                >
                  <span className="text-[11px] leading-snug text-gray-400 font-mono">
                    {task.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — The solution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="relative rounded-2xl overflow-hidden border border-gray-200/60 bg-gray-50 p-6 sm:p-8 min-h-[380px] flex flex-col"
          >
            <p className="text-[13px] font-semibold text-blue-600 uppercase tracking-wider">
              With Connect AI
            </p>
            <p className="mt-1.5 text-[13px] text-gray-400">
              One sentence. Done.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center gap-6">
              {/* Command prompt */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="w-full max-w-sm"
              >
                <div className="rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <Sparkles className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <p className="text-[14px] text-gray-700 leading-relaxed font-mono">
                      &ldquo;Check competitor pricing and save a comparison to
                      Notes&rdquo;
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Result */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="w-full max-w-sm"
              >
                <div className="rounded-xl border border-emerald-200/60 bg-emerald-50/50 px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="text-[13px] font-medium text-emerald-700">
                        Done
                      </p>
                      <p className="text-[11px] text-emerald-500/80 mt-0.5">
                        3 sites checked &middot; report saved to Notes
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
