"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  linkHref?: string;
  linkLabel?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  linkHref,
  linkLabel,
  align = "center",
  className,
}: SectionHeaderProps) {
  const alignment =
    align === "center"
      ? "text-center items-center mx-auto"
      : "text-left items-start";

  return (
    <div className={cn("flex flex-col max-w-3xl", alignment, className)}>
      {eyebrow ? (
        <p className="text-[13px] font-semibold uppercase tracking-wider text-brand">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-[16px] text-gray-500 sm:text-[17px]">
          {subtitle}
        </p>
      ) : null}
      {linkHref && linkLabel ? (
        <Link
          href={linkHref}
          className="mt-4 inline-flex items-center gap-1 text-[14px] font-semibold text-brand hover:text-brand-hover transition-colors"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
