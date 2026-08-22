"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { testimonials, type Testimonial } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const avatarHues = [
  "from-lime/40 to-lime/10 text-lime",
  "from-violet/40 to-violet/10 text-violet",
  "from-cyan/40 to-cyan/10 text-cyan",
  "from-amber/40 to-amber/10 text-amber",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

function Card({ t, i }: { t: Testimonial; i: number }) {
  return (
    <article className="glass flex w-[320px] shrink-0 flex-col gap-4 rounded-2xl p-6 md:w-[380px]">
      <div className="flex items-center gap-1 text-lime" aria-label="5 star rating">
        {"★★★★★".split("").map((s, k) => (
          <span key={k} className="text-sm">
            {s}
          </span>
        ))}
      </div>
      <p className="text-sm leading-relaxed text-muted">&ldquo;{t.quote}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 border-t border-line pt-4">
        {t.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.photo}
            alt={t.name}
            className="h-11 w-11 rounded-full border border-line object-cover"
          />
        ) : (
          <span
            className={`flex h-11 w-11 items-center justify-center rounded-full border border-line bg-gradient-to-br font-display text-sm font-bold ${avatarHues[i % avatarHues.length]}`}
          >
            {initials(t.name)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">
            {t.name} <span className="ml-1">{t.flag}</span>
          </p>
          <p className="truncate text-xs text-dim">{t.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);
  const doubled = [...testimonials, ...testimonials];

  useGSAP(
    () => {
      gsap.fromTo(
        ".testi-band",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".testi-band", start: "top 88%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section
      id="testimonials"
      ref={rootRef}
      className="relative overflow-hidden border-y border-line bg-surface/50 py-24 md:py-32"
    >
      <div className="container-x">
        <SectionHeading
          eyebrow="Client Testimonials"
          align="center"
          lead="Real projects, real businesses, worldwide — here's how working together feels."
        >
          What clients <span className="text-lime">say</span>
        </SectionHeading>
      </div>

      <div className="testi-band marquee-paused relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent md:w-32"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent md:w-32"
          aria-hidden
        />
        <div className="marquee-track items-stretch gap-5 pr-5" style={{ animationDuration: "52s" }}>
          {doubled.map((t, i) => (
            <Card key={`${t.name}-${i}`} t={t} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
