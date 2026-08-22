"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { revealOnView } from "@/lib/viewAnim";
import { services } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function ServiceIcon({ kind }: { kind: string }) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "theme":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2.5" />
          <path d="M3 9h18M9 9v12" />
        </svg>
      );
    case "plugin":
      return (
        <svg {...common}>
          <path d="M9 3v4M15 3v4M7 7h10v5a5 5 0 0 1-10 0V7Z" />
          <path d="M12 17v4" />
        </svg>
      );
    case "widget":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
          <path d="M17.25 13.5v7.5M13.5 17.25H21" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1.4" />
          <circle cx="17" cy="20" r="1.4" />
          <path d="M3 3h2.5l2.2 12.5a1.6 1.6 0 0 0 1.6 1.3h7.9a1.6 1.6 0 0 0 1.6-1.3L20.5 8H6.1" />
        </svg>
      );
    case "headless":
      return (
        <svg {...common}>
          <rect x="2.5" y="4" width="8" height="16" rx="1.5" />
          <rect x="13.5" y="4" width="8" height="16" rx="1.5" />
          <path d="M10.5 12h3" strokeDasharray="1.5 2" />
        </svg>
      );
    case "stack":
      return (
        <svg {...common}>
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12.5 9 5 9-5" />
          <path d="m3 17 9 5 9-5" opacity="0.5" />
        </svg>
      );
    case "seo":
      return (
        <svg {...common}>
          <circle cx="10.5" cy="10.5" r="7" />
          <path d="m21 21-5-5" />
          <path d="M7.5 12.5v-2M10.5 12.5v-4M13.5 12.5V7" />
        </svg>
      );
    case "ai":
      return (
        <svg {...common}>
          <path d="M12 3c.6 3.9 2.4 5.9 6.5 6.5-4.1.7-5.9 2.7-6.5 6.5-.6-3.8-2.4-5.8-6.5-6.5C9.6 8.9 11.4 6.9 12 3Z" />
          <path d="M18.5 15.5c.3 1.8 1.2 2.8 3 3-1.8.3-2.7 1.3-3 3-.3-1.7-1.2-2.7-3-3 1.8-.2 2.7-1.2 3-3Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // animos "Grid Reveal" — cells wipe open across the grid (CSS transitions, IO-triggered)
      const grid = rootRef.current?.querySelector(".services-grid");
      return revealOnView(grid);
    },
    { scope: rootRef }
  );

  return (
    <section id="services" ref={rootRef} className="relative overflow-hidden py-24 md:py-32">
      <div
        className="absolute right-0 top-24 h-[420px] w-[420px] rounded-full bg-violet/[0.05] blur-[130px]"
        aria-hidden
      />
      <div className="container-x">
        <SectionHeading
          eyebrow="Services"
          lead="Everything a modern web business needs — from the WordPress admin your team already knows to the Next.js frontend your users deserve."
        >
          How I can help <span className="text-lime">your business</span>
        </SectionHeading>

        <div className="services-grid grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="service-card rv rv-clip card-hover group relative overflow-hidden rounded-2xl border border-line bg-card p-7"
              style={{ "--rvd": i * 100 } as CSSProperties}
            >
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <span className="absolute right-6 top-6 font-mono text-xs text-dim/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mb-5 inline-flex rounded-xl bg-lime-soft p-3 text-lime transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                <ServiceIcon kind={s.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
