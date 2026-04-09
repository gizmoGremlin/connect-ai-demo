"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Plug It In",
    description:
      "Connect the device to your iPhone via USB-C. It snaps on with MagSafe — takes two seconds.",
    /* ARTLIST: Close-up video of the device clicking into an iPhone via USB-C.
       Satisfying tactile feel. Shallow depth of field. 3-5s loop. */
  },
  {
    number: "02",
    title: "Tell It What to Do",
    description:
      "Open the web dashboard and type what you want in plain English. The AI writes the automation script for you.",
    /* ARTLIST: Screen recording of someone typing a natural language command
       in the dashboard, the AI generating a script. Clean UI focus. 3-5s loop. */
  },
  {
    number: "03",
    title: "Walk Away",
    description:
      "Your phone executes the task autonomously — tapping, typing, navigating. You just get results.",
    /* ARTLIST: Wide shot of someone at a coffee shop, phone on table executing
       tasks on its own, person reading a book. Lifestyle feel. 3-5s loop. */
  },
];

export function HowItWorksV2() {
  return (
    <section className="border-t border-zinc-800/60 bg-zinc-900/50 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Stupidly Simple
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            If you can charge your phone, you can use this.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative flex flex-col"
            >
              {/* Video/image placeholder */}
              {/* ARTLIST: Replace with looping video for each step */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
                <div className="flex h-full items-center justify-center bg-gradient-to-br from-zinc-800 to-zinc-900">
                  <span className="text-6xl font-bold text-zinc-800">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step number */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-blue-400">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-zinc-800" />
              </div>

              <h3 className="mt-3 text-xl font-semibold text-zinc-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
