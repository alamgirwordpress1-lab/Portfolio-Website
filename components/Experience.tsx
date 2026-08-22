"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { revealOnView } from "@/lib/viewAnim";
import { experience, education } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".exp-line-fill", {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6,
        },
      });

      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out",
            clearProps: "all",
            scrollTrigger: { trigger: item, start: "top 82%", once: true },
          }
        );
      });

    },
    { scope: rootRef }
  );

  // animos "Cover Ring" — cards fan in like segments of a cover-flow ring (CSS transitions, IO-triggered)
  useEffect(() => revealOnView(rootRef.current?.querySelector(".edu-grid")), []);

  return (
    <section id="experience" ref={rootRef} className="relative overflow-hidden py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Career Path"
          lead="From a Dhaka design studio to leading a UK development team — nine years of shipping, every single week."
        >
          The journey <span className="text-lime">so far</span>
        </SectionHeading>

        <div className="exp-list relative ml-2 flex flex-col gap-10 border-none pl-8 md:pl-12">
          <div className="absolute bottom-2 left-0 top-2 w-px bg-line" aria-hidden />
          <div className="exp-line-fill absolute bottom-2 left-0 top-2 w-px bg-lime" aria-hidden />

          {experience.map((e, i) => (
            <article key={e.company} className="exp-item relative">
              <span
                className={`absolute -left-8 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 md:-left-12 ${
                  i === 0 ? "border-lime bg-lime shadow-[0_0_16px_rgba(29,191,115,0.6)]" : "border-line-strong bg-bg"
                }`}
                aria-hidden
              />
              <div className="card-hover rounded-2xl border border-line bg-card p-7 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold text-ink md:text-2xl">{e.role}</h3>
                  <span
                    className={`rounded-full px-4 py-1.5 font-mono text-xs ${
                      i === 0 ? "bg-lime-soft text-lime" : "border border-line text-dim"
                    }`}
                  >
                    {e.period}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-muted">
                  <span className="font-medium text-ink/90">{e.company}</span> · {e.place}
                </p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-lime" aria-hidden />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="chip !py-1 !text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="mb-8 flex items-center gap-4 font-display text-2xl font-bold text-ink">
            Education & Certification
            <span className="h-px flex-1 bg-line" aria-hidden />
          </h3>
          <div className="edu-grid grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {education.map((ed, i) => (
              <div
                key={ed.degree}
                className="edu-card rv rv-ring card-hover rounded-2xl border border-line bg-card p-6"
                style={
                  {
                    "--rvd": i * 130,
                    "--ry": `${(i - 1.5) * -52}deg`,
                    "--rx": `${(i - 1.5) * 100}px`,
                  } as CSSProperties
                }
              >
                <p className="font-mono text-xs text-lime">{ed.year}</p>
                <h4 className="mt-2 font-display text-base font-semibold leading-snug text-ink">
                  {ed.degree}
                </h4>
                <p className="mt-2 text-sm text-muted">{ed.school}</p>
                <p className="mt-1 text-xs text-dim">{ed.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
