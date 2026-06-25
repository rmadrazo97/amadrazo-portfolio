"use client";

import { useEffect, useState } from "react";

/**
 * Reports the current viewport width and derived breakpoint flags so inline-
 * styled client components can pick responsive style objects. SSR / static
 * export and the first client render both fall back to `1280` (desktop), so the
 * prerendered markup matches the first hydration pass — no hydration mismatch —
 * and then narrows to the real width on mount.
 *
 * Breakpoints: mobile <= 700, tablet 701–1024, desktop > 1024.
 */
export function useViewport() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const w = width ?? 1280;
  return {
    width: w,
    ready: width !== null,
    isMobile: w <= 700,
    isTablet: w > 700 && w <= 1024,
    isDesktop: w > 1024,
  };
}
