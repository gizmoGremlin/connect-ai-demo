"use client";

import { useState, type VideoHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = VideoHTMLAttributes<HTMLVideoElement> & {
  /** Classes applied to the relative wrapper (borders, rounding, shadow, aspect-ratio). */
  wrapperClassName?: string;
};

/**
 * Video element with a shimmering skeleton overlay that fades out once the
 * first frame is available. The wrapper is `relative` so the skeleton can be
 * absolutely positioned on top of the video. Callers should supply an
 * aspect-ratio class (e.g. `aspect-video`) on `wrapperClassName` so the
 * skeleton has a visible box before the video metadata loads.
 */
export function VideoWithSkeleton({
  wrapperClassName,
  className,
  onLoadedData,
  ...videoProps
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <video
        {...videoProps}
        onLoadedData={(e) => {
          setLoaded(true);
          onLoadedData?.(e);
        }}
        className={cn("block h-full w-full", className)}
      />
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 transition-opacity duration-500",
          loaded ? "opacity-0" : "opacity-100 animate-pulse"
        )}
      />
    </div>
  );
}
