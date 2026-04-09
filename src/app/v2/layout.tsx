"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = document.getElementById("v2-scroll-root");
    if (!el) return;
    const onScroll = () => setScrolled(el.scrollTop > 16);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/v2"
          className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight text-gray-900"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-900">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="white">
              <rect x="4" y="1" width="4" height="4" rx="0.5" />
              <rect x="1" y="6" width="4" height="4" rx="0.5" />
              <rect x="4" y="11" width="4" height="4" rx="0.5" />
            </svg>
          </div>
          Connect AI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
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
              "gap-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-[13px] h-9 px-4"
            )}
          >
            Order Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-gray-500 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-200/60 bg-white/95 backdrop-blur-xl px-4 pb-6 pt-4 md:hidden">
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
                "mt-2 gap-1.5 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
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
    <footer className="border-t border-gray-100 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-gray-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-900">
              <svg viewBox="0 0 16 16" className="h-3 w-3" fill="white">
                <rect x="4" y="1" width="4" height="4" rx="0.5" />
                <rect x="1" y="6" width="4" height="4" rx="0.5" />
                <rect x="4" y="11" width="4" height="4" rx="0.5" />
              </svg>
            </div>
            Connect AI
          </div>
          <div className="flex gap-8 text-[13px] text-gray-400">
            <a href="#" className="transition-colors hover:text-gray-600 cursor-pointer">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-gray-600 cursor-pointer">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-gray-600 cursor-pointer">
              Support
            </a>
          </div>
          <p className="text-[13px] text-gray-400">
            &copy; 2026 Connect AI
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
      id="v2-scroll-root"
      className="force-light fixed inset-0 z-50 overflow-y-auto bg-white text-gray-900"
      style={{ colorScheme: "light" }}
    >
      <NavbarV2 />
      <main>{children}</main>
      <FooterV2 />
    </div>
  );
}
