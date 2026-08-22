"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { journey } from "@/lib/data";
import SectionHeading from "./SectionHeading";

const termLines = [
  { cmd: true, text: "$ whoami" },
  { cmd: false, text: "md-alamgir-hossen — dhaka, bangladesh" },
  { cmd: true, text: "$ career --start" },
  { cmd: false, text: "2017 → converting psd & html into pixel-perfect wordpress" },
  { cmd: true, text: "$ career --now" },
  { cmd: false, text: "team lead @ OMH (uk) — headless wp + next.js builds" },
  { cmd: true, text: "$ cat stack.txt" },
  { cmd: false, text: "wordpress · woocommerce · elementor · next.js · shopify · laravel" },
  { cmd: true, text: "$ echo $mission" },
  { cmd: false, text: '"clients keep the editor they love. users get the speed they expect."' },
];

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".term-line",
        { opacity: 0, x: -14 },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.16,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".term-card", start: "top 75%", once: true },
        }
      );

      gsap.fromTo(
        ".journey-item",
        { opacity: 0, x: -28 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".journey-list", start: "top 80%", once: true },
        }
      );

      gsap.fromTo(
        ".about-para",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".about-copy", start: "top 78%", once: true },
        }
      );
    },
    { scope: rootRef }
  );

  return (
    <section id="about" ref={rootRef} className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="About Me"
          lead="Nine years ago I was slicing PSDs into WordPress themes. Today I lead a team shipping headless platforms — and I've loved every layer of the stack in between."
        >
          From pixel-perfect themes to <span className="text-lime">headless platforms</span>
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="about-copy flex flex-col gap-6 text-base leading-relaxed text-muted md:text-lg">
            <p className="about-para">
              My career started on <strong className="font-medium text-ink">1 May 2017</strong> converting
              PSD, HTML and image designs into WordPress. That craft — obsessive, pixel-perfect
              conversion — is still the foundation of everything I build. From there I went deep:{" "}
              <strong className="font-medium text-ink">custom themes with ACF</strong> and meta-field
              frameworks, <strong className="font-medium text-ink">custom plugins</strong> with their own
              admin dashboards, and <strong className="font-medium text-ink">Elementor widgets</strong>{" "}
              powering complex e-commerce and user-management platforms.
            </p>
            <p className="about-para">
              I&apos;ve built donation systems, Ahrefs-style SEO tooling on the WordPress API, Google
              Maps service finders, and booking platforms for lawyers, insurance and real estate. I know
              WooCommerce down to its <strong className="font-medium text-ink">visual hooks</strong>, and
              Gutenberg from block development to full-site editing.
            </p>
            <p className="about-para">
              Now I build for where the web is going:{" "}
              <strong className="font-medium text-ink">headless WordPress with WPGraphQL and Next.js</strong>,
              full-stack apps on Payload and PostgreSQL, and an AI-accelerated workflow that converts any
              design into a production site in a fraction of the usual time.
            </p>

            <div className="journey-list mt-4 flex flex-col gap-0">
              {journey.map((j, i) => (
                <div key={j.year} className="journey-item relative flex items-start gap-5 pb-5">
                  {i < journey.length - 1 && (
                    <span className="absolute left-[26px] top-8 h-full w-px bg-line" aria-hidden />
                  )}
                  <span className="glass z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full font-mono text-xs text-lime">
                    {j.year}
                  </span>
                  <p className="pt-3.5 text-sm text-muted md:text-base">{j.what}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="term-card overflow-hidden rounded-2xl border border-line bg-[#0a0c12] shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 font-mono text-xs text-dim">alamgir@dev — zsh</span>
              </div>
              <div className="flex flex-col gap-2.5 p-6 font-mono text-[13px] leading-relaxed md:text-sm">
                {termLines.map((l, i) => (
                  <p key={i} className={`term-line ${l.cmd ? "text-lime" : "text-muted"}`}>
                    {l.text}
                  </p>
                ))}
                <p className="term-line text-lime">
                  $ <span className="inline-block h-4 w-2 translate-y-0.5 animate-[pulse-dot_1.1s_steps(2)_infinite] bg-lime" />
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="glass card-hover rounded-2xl p-5">
                <p className="font-display text-2xl font-bold text-ink">BSc in CSE</p>
                <p className="mt-1 text-xs text-dim">Northern University Bangladesh · 2021</p>
              </div>
              <div className="glass card-hover rounded-2xl p-5">
                <p className="font-display text-2xl font-bold text-ink">Team Lead</p>
                <p className="mt-1 text-xs text-dim">OMH · UK — since 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
