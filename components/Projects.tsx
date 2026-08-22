"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { projects, projectCategories, type Project } from "@/lib/data";
import SectionHeading from "./SectionHeading";

function shot(url: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=1000&h=750`;
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card card-hover group block overflow-hidden rounded-2xl border border-line bg-card"
    >
      <div className="relative border-b border-line">
        <div className="flex items-center gap-1.5 bg-surface px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 truncate font-mono text-[11px] text-dim">{p.domain}</span>
          <span className="ml-auto rounded-full border border-line px-2.5 py-0.5 text-[10px] text-muted">
            {p.category}
          </span>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface via-card to-bg">
          <span
            className="absolute inset-0 flex items-center justify-center font-display text-7xl font-bold text-line-strong"
            aria-hidden
          >
            {p.title.charAt(0)}
          </span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={shot(p.url)}
            alt={`Screenshot of ${p.title}`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-lime text-lg text-bg opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            ↗
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-ink transition-colors group-hover:text-lime">
            {p.title}
          </h3>
        </div>
        <p className="mt-1 font-mono text-[11px] text-lime/80">{p.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="chip !py-1 !text-[11px]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function Projects() {
  const rootRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");

  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  useGSAP(
    () => {
      // animos "Pop Grid" — cards pop up with a springy scale
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 44, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: "back.out(1.6)",
          overwrite: "auto",
          clearProps: "all",
        }
      );
    },
    { scope: rootRef, dependencies: [filter] }
  );

  return (
    <section id="work" ref={rootRef} className="relative overflow-hidden border-y border-line bg-surface/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Work"
          lead="Live client projects across the UK and Bangladesh — e-commerce, legal, energy, media and more. Every one shipped, every one still running."
        >
          Real projects, <span className="text-lime">really live</span>
        </SectionHeading>

        <div className="mb-10 flex flex-wrap gap-2.5">
          {projectCategories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`btn-pill !px-5 !py-2 text-xs transition-all md:text-sm ${
                filter === c
                  ? "btn-primary"
                  : "border border-line bg-transparent text-muted hover:border-lime/50 hover:text-ink"
              }`}
            >
              {c}
              <span className="font-mono text-[10px] opacity-60">
                {c === "All" ? projects.length : projects.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </div>

        <div key={filter} className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.url} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
