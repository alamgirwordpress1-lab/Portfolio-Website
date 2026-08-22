"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { techIcons } from "@/lib/icons";

function glyphFill(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.55 ? "#0b0d12" : "#ffffff";
}

/** animos "Orbit" — tech icons circling on a flat ring, kept upright. */

const ORBIT_ICONS = [
  "WordPress",
  "WooCommerce",
  "Next.js",
  "React",
  "Elementor",
  "Shopify",
  "GraphQL",
  "PHP",
  "Laravel",
  "Webflow",
];

export default function OrbitRing({
  className = "",
  size = "min(88vw, 780px)",
  radius = "min(44vw, 390px)",
  delay = 0,
}: {
  className?: string;
  size?: string;
  radius?: string;
  delay?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) {
        gsap.to(".orbit-spin", { rotation: 360, duration: 46, ease: "none", repeat: -1 });
        gsap.to(".orbit-icon", { rotation: "-=360", duration: 46, ease: "none", repeat: -1 });
      }
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1, scale: 1, duration: 1.4, delay, ease: "power2.out" }
      );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full border border-line-strong" />
      <div
        className="absolute inset-[15%] rounded-full border border-dashed border-lime/20"
        style={{
          background:
            "radial-gradient(circle, rgba(200,243,29,0.3) 0%, rgba(200,243,29,0.17) 55%, rgba(200,243,29,0.07) 80%, transparent 100%)",
        }}
      />
      <div className="orbit-spin relative h-full w-full">
        {ORBIT_ICONS.map((n, i) => {
          const angle = (360 / ORBIT_ICONS.length) * i;
          const icon = techIcons[n];
          if (!icon) return null;
          return (
            <div
              key={n}
              className="absolute left-1/2 top-1/2 h-0 w-0"
              style={{ transform: `rotate(${angle}deg) translateX(${radius})` }}
            >
              <div
                className="orbit-icon absolute left-0 top-0 flex items-center justify-center rounded-2xl border border-white/25 p-3.5 shadow-[0_8px_28px_rgba(0,0,0,0.6),0_0_24px_rgba(200,243,29,0.18)]"
                style={{
                  transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                  backgroundColor: `#${icon.hex}`,
                }}
              >
                <svg
                  role="img"
                  aria-label={icon.title}
                  viewBox="0 0 24 24"
                  width={26}
                  height={26}
                  fill={glyphFill(icon.hex)}
                >
                  <path d={icon.path} />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
