"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Plug It In",
    description:
      "Connect the device to your iPhone via USB-C. It snaps on with MagSafe — takes two seconds.",
  },
  {
    number: "02",
    title: "Tell It What to Do",
    description:
      "Open the web dashboard and type what you want in plain English. The AI writes the automation script for you.",
  },
  {
    number: "03",
    title: "Walk Away",
    description:
      "Your phone executes the task autonomously — tapping, typing, navigating. You just get results.",
  },
];

export function HowItWorksV2() {
  return (
    <section id="how-it-works" className="border-t border-gray-200 bg-white py-20 sm:py-28 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Stupidly Simple
          </h2>
          <p className="mt-4 text-lg text-gray-500">
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
              {/* Image placeholder */}
              {/* ARTLIST: Replace with lifestyle/product image per step */}
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100">
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl font-bold text-gray-200">
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Step number */}
              <div className="mt-6 flex items-center gap-3">
                <span className="text-sm font-mono font-bold text-blue-600">
                  {step.number}
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <h3 className="mt-3 text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
