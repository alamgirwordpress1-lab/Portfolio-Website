"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { headlessFlow, modernStacks } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function HeadlessFlow() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".flow-node",
        { opacity: 0, y: 40, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.18,
          ease: "back.out(1.4)",
          clearProps: "all",
          scrollTrigger: { trigger: ".flow-row", start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".flow-connector",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 0.5,
          stagger: 0.18,
          delay: 0.3,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".flow-row", start: "top 78%", once: true },
        }
      );
      gsap.fromTo(
        ".stack-card",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.09,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".stacks-grid", start: "top 82%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section id="stacks" ref={rootRef} className="relative overflow-hidden border-y border-line bg-surface/50 py-24 md:py-32">
      <div
        className="absolute left-1/2 top-0 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-lime/[0.04] blur-[120px]"
        aria-hidden
      />
      <div className="container-x">
        <SectionHeading
          eyebrow="Headless & Modern Stacks"
          lead="Your client keeps the WordPress admin they already love. Their customers get a Next.js frontend that loads instantly and ranks. That's the architecture I ship in 2026."
        >
          How I build for <span className="text-lime">the modern web</span>
        </SectionHeading>

        <div className="flow-row flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
          {headlessFlow.map((n, i) => (
            <div key={n.step} className="contents">
              <div className="flow-node card-hover relative flex-1 rounded-2xl border border-line bg-card p-6">
                <span className="font-mono text-xs text-lime">0{i + 1}</span>
                <h3 className="mt-2 font-display text-lg font-semibold text-ink">{n.step}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{n.desc}</p>
              </div>
              {i < headlessFlow.length - 1 && (
                <div className="flow-connector relative mx-auto h-8 w-px shrink-0 lg:mx-0 lg:h-px lg:w-12">
                  <svg
                    className="absolute inset-0 h-full w-full overflow-visible"
                    aria-hidden
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="100%"
                      className="lg:hidden"
                      stroke="#c8f31d"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                      style={{ animation: "flow-dash 1.2s linear infinite" }}
                    />
                    <line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                      className="hidden lg:block"
                      stroke="#c8f31d"
                      strokeWidth="2"
                      strokeDasharray="4 6"
                      style={{ animation: "flow-dash 1.2s linear infinite" }}
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="stacks-grid mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {modernStacks.map((s) => (
            <article
              key={s.name}
              className="stack-card card-hover group rounded-2xl border border-line bg-card p-6"
            >
              <h3 className="font-display text-base font-semibold text-ink">{s.name}</h3>
              <p className="mt-3 rounded-lg border border-line bg-bg px-3 py-2 font-mono text-[11px] leading-relaxed text-lime md:text-xs">
                {s.stack}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.use}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
