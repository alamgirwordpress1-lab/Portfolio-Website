"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapSetup";
import { stats } from "@/lib/data";
import SphereWall from "./SphereWall";
import OrbitRing from "./OrbitRing";

const HERO_DELAY = 1.9;

const roleWords = ["WordPress", "WooCommerce", "Next.js", "Headless", "Shopify", "Elementor"];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const ctxCleanups: (() => void)[] = [];

      // intro
      document.fonts.ready.then(() => {
        const split = new SplitText(".hero-name", { type: "chars", mask: "chars" });
        gsap.from(split.chars, {
          yPercent: 118,
          duration: 0.9,
          stagger: 0.028,
          ease: "power4.out",
          delay: HERO_DELAY,
        });
      });

      const tl = gsap.timeline({ delay: HERO_DELAY });
      tl.from(".hero-photo", { scale: 0.88, opacity: 0, duration: 1.1, ease: "power3.out" }, 0)
        .from(".hero-role", { y: 28, opacity: 0, duration: 0.7, ease: "power3.out" }, 0.55)
        .from(".hero-stat", { y: 30, opacity: 0, duration: 0.7, stagger: 0.09, ease: "power3.out" }, 0.9);

      // count-up stats — inside the intro timeline so they always fire
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const target = Number(el.dataset.target || 0);
        const obj = { v: 0 };
        tl.to(
          obj,
          {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
            onComplete: () => {
              el.textContent = String(target);
            },
          },
          1.2
        );
      });

      // role word rotation is pure CSS (.role-anim) — no JS timing involved

      return () => ctxCleanups.forEach((fn) => fn());
    },
    { scope: rootRef }
  );

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-10"
    >
      {/* backdrop */}
      <div className="grid-bg absolute inset-0" aria-hidden />
      <div
        className="absolute left-1/2 top-[8%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-lime/[0.07] blur-[130px]"
        aria-hidden
      />
      <div
        className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-violet/[0.08] blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -right-40 top-1/3 h-[360px] w-[360px] rounded-full bg-cyan/[0.06] blur-[120px]"
        aria-hidden
      />

      {/* Sphere Wall background + orbiting tech ring (centered on the hero, as before) */}
      <SphereWall />
      <OrbitRing
        className="left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
        size="min(78vw, 660px)"
        radius="min(39vw, 330px)"
        delay={2.2}
      />

      <div className="container-x relative z-10 flex flex-col items-center text-center">
        {/* photo in flow, fully visible above the name */}
        <div className="hero-photo pointer-events-none relative -mb-12" aria-hidden>
          <div className="absolute left-1/2 top-1/2 h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime/[0.18] blur-[85px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/alamgir.png"
            alt=""
            className="relative h-[clamp(340px,54vh,540px)] w-auto"
            style={{
              maskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 72%, transparent 100%)",
            }}
          />
        </div>

        <h1 className="hero-name whitespace-nowrap font-display text-[clamp(2.2rem,6.8vw,5.75rem)] font-bold leading-[1.02] tracking-tight text-ink [text-shadow:0_4px_28px_rgba(5,6,10,0.9)]">
          Md Alamgir <span className="text-lime">Hossen</span>
        </h1>

        <div className="hero-role mt-6 font-display text-xl font-medium text-muted md:text-3xl">
          Senior{" "}
          <span className="rot-box relative inline-flex h-[1.35em] overflow-hidden align-bottom">
            <span className="invisible whitespace-nowrap font-semibold" aria-hidden>
              WooCommerce
            </span>
            <span className="role-anim absolute left-0 top-0 flex w-full flex-col">
              {[...roleWords, roleWords[0]].map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  className="flex h-[1.35em] shrink-0 items-center justify-center whitespace-nowrap font-semibold leading-none text-lime"
                >
                  {w}
                </span>
              ))}
            </span>
          </span>{" "}
          Developer
        </div>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="hero-stat flex flex-col items-center gap-1 bg-surface px-4 py-6">
              <div className="font-display text-3xl font-bold text-ink md:text-4xl">
                <span className="stat-num tabular-nums" data-target={s.value}>
                  0
                </span>
                <span className="text-lime">{s.suffix}</span>
              </div>
              <div className="text-center text-xs text-dim md:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
