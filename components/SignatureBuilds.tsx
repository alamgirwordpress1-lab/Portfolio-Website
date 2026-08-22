"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { revealOnView } from "@/lib/viewAnim";
import { signatureBuilds } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const accentMap: Record<string, { text: string; glow: string; ring: string }> = {
  lime: { text: "text-lime", glow: "bg-lime/[0.07]", ring: "group-hover:border-lime/40" },
  violet: { text: "text-violet", glow: "bg-violet/[0.08]", ring: "group-hover:border-violet/40" },
  cyan: { text: "text-cyan", glow: "bg-cyan/[0.07]", ring: "group-hover:border-cyan/40" },
  amber: { text: "text-amber", glow: "bg-amber/[0.07]", ring: "group-hover:border-amber/40" },
};

export default function SignatureBuilds() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // animos "Orbit Carousel" — cards swing in along an orbital arc (CSS transitions, IO-triggered)
      const grid = rootRef.current?.querySelector(".builds-grid");
      return revealOnView(grid);
    },
    { scope: rootRef }
  );

  return (
    <section id="builds" ref={rootRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Signature Builds"
          lead="The projects that prove engineering depth — custom systems built from scratch, not assembled from templates."
        >
          Engineering, <span className="text-lime">not just websites</span>
        </SectionHeading>

        <div className="builds-grid grid gap-5 md:grid-cols-2">
          {signatureBuilds.map((b, i) => {
            const a = accentMap[b.accent] ?? accentMap.lime;
            return (
              <article
                key={b.title}
                className={`build-card rv rv-orbit card-hover group relative overflow-hidden rounded-3xl border border-line bg-card p-8 md:p-10 ${a.ring}`}
                style={{ "--rvd": i * 160 } as CSSProperties}
              >
                <div
                  className={`absolute -right-16 -top-16 h-48 w-48 rounded-full blur-[70px] transition-opacity duration-500 ${a.glow}`}
                  aria-hidden
                />
                <p className={`font-mono text-xs tracking-wider ${a.text}`}>{b.kind}</p>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
                  {b.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">{b.desc}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {b.tags.map((t) => (
                    <span key={t} className="chip !text-xs">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
