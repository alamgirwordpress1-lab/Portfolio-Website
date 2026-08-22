"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Stacks", href: "#stacks" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (!overlayRef.current) return;
      if (open) {
        gsap.set(overlayRef.current, { display: "flex" });
        gsap.fromTo(
          overlayRef.current,
          { clipPath: "circle(0% at calc(100% - 3rem) 3rem)" },
          { clipPath: "circle(150% at calc(100% - 3rem) 3rem)", duration: 0.7, ease: "power3.inOut" }
        );
        gsap.fromTo(
          ".mob-link",
          { y: 46, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.06, delay: 0.25, duration: 0.55, ease: "power3.out" }
        );
      } else {
        gsap.to(overlayRef.current, {
          clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
          duration: 0.55,
          ease: "power3.inOut",
          onComplete: () => gsap.set(overlayRef.current, { display: "none" }),
        });
      }
    },
    { dependencies: [open] }
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[90] transition-all duration-500 ${
          scrolled
            ? "border-b border-line bg-bg/75 py-3 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent py-5"
        }`}
      >
        <div className="container-x flex items-center justify-between">
          <a href="#home" className="font-display text-xl font-bold tracking-tight text-ink">
            alamgir<span className="text-lime">.</span>
            <span className="font-mono text-xs font-normal text-muted">dev</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                  active === l.href ? "text-lime" : "text-muted hover:text-ink"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <MagneticButton>
              <a href="#contact" className="btn-pill btn-primary !px-6 !py-2.5 text-sm">
                Let&apos;s Talk
                <span aria-hidden>→</span>
              </a>
            </MagneticButton>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="relative z-[97] flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line bg-surface lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span
              className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`h-[2px] w-5 bg-ink transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-[2px] w-5 bg-ink transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[96] hidden flex-col items-center justify-center gap-2 bg-surface"
        style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="mob-link font-display text-4xl font-bold tracking-tight text-ink transition-colors hover:text-lime"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setOpen(false)}
          className="mob-link btn-pill btn-primary mt-8"
        >
          Let&apos;s Talk →
        </a>
      </div>
    </>
  );
}
