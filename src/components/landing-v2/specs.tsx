"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./section-header";

const specs = [
  { label: "Connection", value: "USB-C + MagSafe" },
  { label: "Material", value: "CNC Aluminum" },
  { label: "Weight", value: "28g" },
  { label: "Compatibility", value: "iPhone 15 & 16 series" },
  { label: "Audio", value: "Closed-loop (no speaker needed)" },
  { label: "Bluetooth", value: "5.3 LE" },
  { label: "Processor", value: "ESP32-S3" },
  { label: "Jailbreak Required", value: "No" },
];

export function Specs() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Product video */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <video
                src="/generated/video/seedance-r5/r5-undock-full.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
              />
            </div>
          </motion.div>

          {/* Specs list */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              align="left"
              eyebrow="Specifications"
              title="Built to Disappear"
              subtitle="Small enough to forget it's there. Powerful enough to change how you use your phone."
            />

            <div className="mt-10 divide-y divide-gray-100">
              {specs.map((spec, i) => (
                <motion.div
                  key={spec.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="text-[14px] text-gray-400">{spec.label}</span>
                  <span className="text-[14px] font-medium text-black">
                    {spec.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
