"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden border-t border-zinc-800/60 bg-zinc-950 py-24 sm:py-32">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          {/* Mini product image */}
          {/* ARTLIST: Replace with a stylized floating product shot,
              slightly rotated, with light rays. Premium feel. */}
          <div className="relative w-48 sm:w-56">
            <div className="absolute -inset-8 bg-blue-500/10 blur-3xl rounded-full" />
            <Image
              src="/connect-product.png"
              alt="Connect AI"
              width={300}
              height={170}
              className="relative w-full h-auto"
            />
          </div>

          <h2 className="mt-10 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Stop Scrolling.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Start Delegating.
            </span>
          </h2>

          <p className="mt-6 max-w-lg text-lg text-zinc-400 leading-relaxed">
            Your phone is the most powerful computer you own. It&apos;s time it
            started working for you — not the other way around.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "lg" }),
                "gap-2 text-base px-8"
              )}
            >
              Order Connect AI &mdash; $99
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <p className="mt-6 text-xs text-zinc-600">
            Free shipping &middot; 30-day money-back guarantee &middot; No
            subscription required
          </p>
        </motion.div>
      </div>
    </section>
  );
}
