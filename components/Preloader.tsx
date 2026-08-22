"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const counter = { value: 0 };
      const tl = gsap.timeline({
        onComplete: () => setDone(true),
      });

      tl.to(counter, {
        value: 100,
        duration: 1.1,
        ease: "power2.inOut",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
          }
        },
      });
      tl.from(
        ".pre-word",
        { yPercent: 120, stagger: 0.08, duration: 0.6, ease: "power3.out" },
        0.15
      );
      tl.to(
        ".pre-inner",
        { opacity: 0, y: -30, duration: 0.35, ease: "power2.in" },
        "+=0.15"
      );
      tl.to(rootRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
      });
    },
    { scope: rootRef }
  );

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      aria-hidden
    >
      <div className="pre-inner flex flex-col items-center gap-6 px-6">
        <div className="flex gap-3 overflow-hidden font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
          <span className="pre-word inline-block">Md</span>
          <span className="pre-word inline-block">Alamgir</span>
          <span className="pre-word inline-block text-lime">Hossen</span>
        </div>
        <div className="flex items-center gap-4 font-mono text-sm text-muted">
          <span className="h-px w-10 bg-line-strong" />
          <span ref={counterRef} className="tabular-nums text-lime">
            000
          </span>
          <span className="h-px w-10 bg-line-strong" />
        </div>
      </div>
    </div>
  );
}
