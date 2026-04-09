"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/v2#how-it-works", label: "How It Works" },
  { href: "/v2#pricing", label: "Pricing" },
  { href: "/v2#faq", label: "FAQ" },
  { href: "#", label: "GitHub" },
];

function NavbarV2() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/v2"
          className="flex items-center gap-2 font-bold text-lg tracking-tight text-gray-900"
        >
          <Zap className="h-5 w-5 text-blue-600" />
          Connect AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm text-gray-500 transition-colors hover:text-gray-900"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/signup"
            className={cn(
              buttonVariants({ size: "sm" }),
              "gap-1.5 bg-gray-900 text-white hover:bg-gray-800"
            )}
          >
            Order Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-500"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200 bg-white px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/signup"
              className={cn(
                buttonVariants({ size: "sm" }),
                "mt-2 gap-1.5 bg-gray-900 text-white hover:bg-gray-800"
              )}
            >
              Order Now
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function FooterV2() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <Zap className="h-4 w-4 text-blue-600" />
            Connect AI
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600">
              Support
            </a>
          </div>
          <p className="text-xs text-gray-400">
            &copy; 2026 Connect AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="force-light fixed inset-0 z-50 overflow-y-auto bg-white text-gray-900"
      style={{ colorScheme: "light" }}
    >
      <NavbarV2 />
      <main>{children}</main>
      <FooterV2 />
    </div>
  );
}
