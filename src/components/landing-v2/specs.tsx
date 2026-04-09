"use client";

import Image from "next/image";
import { motion } from "framer-motion";

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
    <section className="border-t border-gray-200 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Product image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* ARTLIST: product-angle-top — top-down or alt angle product shot */}
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/connect-product.png"
                alt="Connect AI device specifications"
                width={600}
                height={400}
                className="relative w-full h-auto"
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
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Built to Disappear
            </h2>
            <p className="mt-4 text-lg text-gray-500 leading-relaxed">
              Small enough to forget it&apos;s there. Powerful enough to change
              how you use your phone.
            </p>

            <div className="mt-10 space-y-0 divide-y divide-gray-200">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between py-3.5"
                >
                  <span className="text-sm text-gray-400">{spec.label}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
