"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-gray-200 bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Mini product image */}
          <div className="relative w-48 sm:w-56">
            <Image
              src="/connect-product.png"
              alt="Connect AI"
              width={300}
              height={170}
              className="relative w-full h-auto"
            />
          </div>

          <h2 className="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Stop Scrolling.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Start Delegating.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg text-gray-500 leading-relaxed">
            Your phone is the most powerful computer you own. It&apos;s time it
            started working for you — not the other way around.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 text-base px-8 bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              Order Connect AI &mdash; $99
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-gray-400">
            Free shipping &middot; 30-day money-back guarantee &middot; No
            subscription required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
