"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapSetup";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dotRef.current || !ringRef.current) return;

    const dotX = gsap.quickTo(dotRef.current, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dotRef.current, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ringRef.current, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ringRef.current, "y", { duration: 0.45, ease: "power3" });

    const move = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-magnetic], [role='button']");
      gsap.to(ringRef.current, {
        scale: interactive ? 2.1 : 1,
        opacity: interactive ? 0.35 : 1,
        duration: 0.3,
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-[3px] -mt-[3px] h-[6px] w-[6px] rounded-full bg-lime"
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[98] -ml-[18px] -mt-[18px] h-[36px] w-[36px] rounded-full border border-lime/50"
        aria-hidden
      />
    </>
  );
}
