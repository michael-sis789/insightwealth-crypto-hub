"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function track(eventName: string, params: Record<string, string | number | boolean> = {}) {
  window.gtag?.("event", eventName, params);
}

export function AnalyticsEvents() {
  useEffect(() => {
    const sentDepths = new Set<number>();
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const depth = Math.round((window.scrollY / scrollable) * 100);
      [25, 50, 75, 90].forEach((target) => {
        if (depth >= target && !sentDepths.has(target)) {
          sentDepths.add(target);
          track("scroll_depth", { depth: target, path: window.location.pathname });
        }
      });
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest("a,button,input,select") : null;
      if (!target) return;
      const label = target.textContent?.trim().slice(0, 80) || target.getAttribute("aria-label") || target.getAttribute("name") || "unknown";
      const href = target instanceof HTMLAnchorElement ? target.href : "";

      if (target.closest("[data-analytics='language-switch']")) track("language_switch", { label, path: window.location.pathname });
      if (target.closest("[data-analytics='internal-tool-link']")) track("internal_tool_click", { label, path: window.location.pathname });
      if (href.includes("youtube.com") || href.includes("youtu.be")) track("youtube_outbound_click", { href, path: window.location.pathname });
      if (target.closest("form") || target.closest("[data-calculator]")) track("calculator_usage", { label, path: window.location.pathname });
      if (target.closest("a") && label.match(/dashboard|calculator|DCA|ETF|Bull|今日|查看|使用/i)) track("cta_click", { label, path: window.location.pathname });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
