"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { adsEnabled, adsenseClient, adSlots } from "@/lib/ads";

function AdUnit({ slot, className }) {
  const element = useRef(null);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    // Wait for a measurable container, including when initially hidden.
    const observer = new ResizeObserver(() => {
      if (node.getBoundingClientRect().width <= 0 || node.dataset.adRequested) return;
      node.dataset.adRequested = "true";
      observer.disconnect();
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // Ad blockers or unavailable ad inventory must not break image tools.
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <aside aria-label="Advertisement" className={`my-8 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-900 ${className}`}>
      <p className="pt-2 text-center text-[10px] uppercase tracking-widest text-gray-500">Advertisement</p>
      <ins
        ref={element}
        className="adsbygoogle"
        style={{ display: "block", minHeight: 100 }}
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

export default function AdSlot({ type = "in-content", className = "" }) {
  const pathname = usePathname();
  const slot = adSlots[type];
  if (!adsEnabled || !/^\d+$/.test(slot || "")) return null;
  // A fresh DOM element is required for each client-side page navigation.
  return <AdUnit key={`${pathname}:${slot}`} slot={slot} className={className} />;
}
