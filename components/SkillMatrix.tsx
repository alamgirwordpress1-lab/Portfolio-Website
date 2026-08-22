"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { revealOnView } from "@/lib/viewAnim";
import { skillGroups } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function SkillMatrix() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // animos "Pop Grid" — boxes pop with a springy scale (CSS transitions, IO-triggered)
      const grid = rootRef.current?.querySelector(".skills-grid");
      return revealOnView(grid);
    },
    { scope: rootRef }
  );

  return (
    <section id="skills" ref={rootRef} className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Skill Matrix"
          lead="Nine years across the full stack — organized by what actually ships client projects."
        >
          A decade of tools, <span className="text-lime">mastered in layers</span>
        </SectionHeading>

        <div className="skills-grid grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <article
              key={g.title}
              className="skill-group rv rv-pop card-hover rounded-2xl border border-line bg-card p-7"
              style={{ "--rvd": gi * 110 } as CSSProperties}
            >
              <div className="mb-5 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-ink">{g.title}</h3>
              </div>
              <p className="mb-5 -mt-3 text-xs text-dim">{g.desc}</p>
              <div className="flex flex-wrap gap-2">
                {g.skills.map((s, si) => (
                  <span
                    key={s}
                    className="chip rv rv-chip"
                    style={{ "--rvd": gi * 110 + 280 + si * 30 } as CSSProperties}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
