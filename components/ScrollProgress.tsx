"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        scrub: 0.4,
      },
    });
  });

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-[95] h-[2px] w-full origin-left scale-x-0 bg-lime"
      aria-hidden
    />
  );
}
