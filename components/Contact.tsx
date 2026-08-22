"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapSetup";
import { site } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import CardGlobe from "./CardGlobe";

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      const big = rootRef.current?.querySelector(".contact-big");
      if (big) {
        document.fonts.ready.then(() => {
          const split = new SplitText(big, { type: "words", mask: "words" });
          gsap.fromTo(
            split.words,
            { yPercent: 115 },
            {
              yPercent: 0,
              duration: 0.9,
              stagger: 0.05,
              ease: "power3.out",
              clearProps: "transform",
              scrollTrigger: { trigger: big, start: "top 80%", once: true },
            }
          );
        });
      }
      gsap.fromTo(
        ".contact-fade",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: ".contact-fade", start: "top 85%", once: true },
        }
      );
      gsap.to(".contact-watermark", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: rootRef }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden pt-24 md:pt-36">
      <div
        className="absolute left-1/2 top-1/4 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-lime/[0.05] blur-[140px]"
        aria-hidden
      />

      {/* Card Globe background behind the CTA text */}
      <CardGlobe />


      <div className="container-x relative z-10 flex flex-col items-center text-center">
        <span className="eyebrow contact-fade">Contact</span>
        <h2 className="contact-big heading-xl mt-5 max-w-4xl !text-[clamp(2.4rem,6.5vw,5rem)] text-ink">
          Have a project in mind? <span className="text-gradient">Let&apos;s build it together.</span>
        </h2>
        <p className="contact-fade mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Whether it&apos;s a pixel-perfect WordPress build, a WooCommerce store, or a headless Next.js
          platform — tell me what you need and I&apos;ll tell you exactly how I&apos;d ship it.
        </p>

        <div className="contact-fade mt-10 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton>
            <a href={`mailto:${site.email}`} className="btn-pill btn-primary">
              Email Me <span aria-hidden>→</span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href={`https://wa.me/${site.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-pill btn-ghost"
            >
              WhatsApp
            </a>
          </MagneticButton>
          <button onClick={copyEmail} className="chip !px-5 !py-3 font-mono !text-xs">
            {copied ? "✓ Copied!" : site.email}
          </button>
        </div>

        <div className="contact-fade mt-14 grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          <div className="flex flex-col gap-1 bg-surface px-6 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Email</span>
            <a href={`mailto:${site.email}`} className="truncate text-sm text-ink hover:text-lime">
              {site.email}
            </a>
          </div>
          <div className="flex flex-col gap-1 bg-surface px-6 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Phone</span>
            <a href={`tel:+${site.phoneRaw}`} className="text-sm text-ink hover:text-lime">
              {site.phone}
            </a>
          </div>
          <div className="flex flex-col gap-1 bg-surface px-6 py-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Location</span>
            <span className="text-sm text-ink">Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>

      <div
        className="contact-watermark pointer-events-none mt-20 select-none whitespace-nowrap font-display text-[18vw] font-bold leading-none tracking-tight text-transparent"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.06)" }}
        aria-hidden
      >
        ALAMGIR HOSSEN — ALAMGIR HOSSEN
      </div>

      <footer className="relative z-10 border-t border-line bg-bg/80">
        <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2 md:right-10">
          <MagneticButton>
            <button
              onClick={() => {
                const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number, o?: object) => void } })
                  .__lenis;
                if (lenis) lenis.scrollTo(0, { duration: 1.6 });
                else window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Back to top"
              className="group flex flex-col items-center gap-1.5"
            >
              <div className="h-8 w-px overflow-hidden bg-line-strong">
                <div className="h-1/2 w-px animate-[float-y_1.6s_ease-in-out_infinite] bg-lime" />
              </div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-dim transition-colors group-hover:text-lime">
                SCROLL ↑
              </span>
            </button>
          </MagneticButton>
        </div>
        <div className="container-x relative flex flex-col items-center justify-between gap-6 py-10 pr-24 md:flex-row md:pr-28">
          <a href="#home" className="font-display text-lg font-bold tracking-tight text-ink">
            alamgir<span className="text-lime">.</span>
            <span className="font-mono text-xs font-normal text-muted">dev</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {[
              { label: "GitHub", href: site.github },
              { label: "LinkedIn", href: site.linkedin },
              { label: "WhatsApp", href: `https://wa.me/${site.phoneRaw}` },
              { label: "Email", href: `mailto:${site.email}` },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-sm text-muted transition-colors hover:text-lime"
              >
                {s.label} <span aria-hidden>↗</span>
              </a>
            ))}
          </div>

          <p className="text-center font-mono text-xs text-dim">
            © 2026 {site.name} · Built with Next.js + GSAP
          </p>

        </div>
      </footer>
    </section>
  );
}
