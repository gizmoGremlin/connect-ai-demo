"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/lib/mock-auth";
import { cn } from "@/lib/utils";

const links = [
  { href: "/skills", label: "Skills" },
  { href: "/cookbook", label: "Cookbook" },
  { href: "/#pricing", label: "Pricing" },
  { href: "#", label: "GitHub" },
];

function ConnectLogo({ size = 28 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-lg bg-gray-900"
      style={{ height: size, width: size }}
    >
      <svg
        viewBox="0 0 16 16"
        className="fill-white"
        style={{ height: size * 0.5, width: size * 0.5 }}
      >
        <rect x="4" y="1" width="4" height="4" rx="0.5" />
        <rect x="1" y="6" width="4" height="4" rx="0.5" />
        <rect x="4" y="11" width="4" height="4" rx="0.5" />
      </svg>
    </div>
  );
}

function CtrlCenterButton({ className }: { className?: string }) {
  return (
    <Link
      href="/dashboard"
      className={cn(
        "group relative inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[13px] font-medium text-gray-700 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 active:translate-y-px",
        className
      )}
    >
      <span className="inline-flex items-center justify-center rounded-[4px] border border-gray-200 bg-gray-50 px-1 py-px font-mono text-[10px] leading-none text-gray-500">
        ctrl
      </span>
      <span className="tracking-wide">Center</span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-white/60 backdrop-blur-sm border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight text-gray-900"
        >
          <ConnectLogo />
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
          {isAuthenticated ? (
            <CtrlCenterButton />
          ) : (
            <>
              <Link
                href="/login"
                className="text-[13px] font-medium text-gray-500 transition-colors hover:text-gray-900"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "rounded-lg bg-gray-900 text-white hover:bg-gray-800 text-[13px] h-9 px-4"
                )}
              >
                Get Started
              </Link>
            </>
          )}
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
            <div className="flex flex-col gap-2 pt-4 border-t border-gray-200/60">
              {isAuthenticated ? (
                <CtrlCenterButton />
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-sm text-gray-500 transition-colors hover:text-gray-900"
                    onClick={() => setOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ size: "sm" }),
                      "rounded-lg bg-gray-900 text-white hover:bg-gray-800"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
