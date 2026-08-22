"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { testimonials } from "@/lib/data";

/**
 * "Card Globe" (animos.app) as the Contact background — a sphere of client
 * photo cards (portrait + name + flag), slowly spinning with back-face fade.
 * Dimmed and vignetted so foreground text stays readable.
 */

const RINGS: { lat: number; count: number }[] = [
  { lat: 54, count: 8 },
  { lat: 18, count: 12 },
  { lat: -18, count: 12 },
  { lat: -54, count: 8 },
];

type CardDef = { az: number; lat: number; client: (typeof testimonials)[number] };

const CARDS: CardDef[] = (() => {
  const out: CardDef[] = [];
  let i = 0;
  for (const ring of RINGS) {
    for (let c = 0; c < ring.count; c++) {
      out.push({
        az: (360 / ring.count) * c + (ring.lat > 0 ? 360 / ring.count / 2 : 0),
        lat: ring.lat,
        client: testimonials[i % testimonials.length],
      });
      i++;
    }
  }
  return out;
})();

const BACK_OPACITY = 0.22;

export default function CardGlobe() {
  const rootRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const globe = globeRef.current;
      if (!globe) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 90%", once: true },
        }
      );

      if (!reduce) {
        gsap.to(globe, { rotationY: 360, duration: 46, ease: "none", repeat: -1 });
      } else {
        gsap.set(globe, { rotationY: 20 });
      }

      const cardEls = gsap.utils.toArray<HTMLElement>(".globe-card");
      const defs = cardEls.map((el) => ({ el, az: Number(el.dataset.az || 0) }));
      let visible = true;
      const io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
        },
        { rootMargin: "120px" }
      );
      if (rootRef.current) io.observe(rootRef.current);
      let frame = 0;
      const update = () => {
        if (!visible || (frame++ & 1) === 1) return;
        const ry = Number(gsap.getProperty(globe, "rotationY")) || 0;
        for (const d of defs) {
          const v = (Math.cos(((d.az + ry) * Math.PI) / 180) + 1) / 2;
          d.el.style.opacity = String(BACK_OPACITY + (1 - BACK_OPACITY) * v);
        }
      };
      frame = 0;
      update();
      if (!reduce) gsap.ticker.add(update);

      return () => {
        gsap.ticker.remove(update);
        io.disconnect();
      };
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className="pointer-events-none absolute left-1/2 top-[32%] z-0 -translate-x-1/2 -translate-y-1/2"
      aria-hidden
    >
      <div
        className="relative flex items-center justify-center opacity-60"
        style={{ perspective: "1300px", "--globe-r": "clamp(190px, 26vw, 320px)" } as CSSProperties}
      >
        <div style={{ transform: "rotateX(-12deg)", transformStyle: "preserve-3d" }}>
          <div
            ref={globeRef}
            className="relative"
            style={{
              width: "calc(var(--globe-r) * 2)",
              height: "calc(var(--globe-r) * 2)",
              transformStyle: "preserve-3d",
            }}
          >
            {CARDS.map((c, i) => (
              <div
                key={i}
                className="globe-card absolute left-1/2 top-1/2 flex flex-col items-center justify-center gap-1 rounded-xl border border-line bg-[#11141d]/90 px-1 py-1.5"
                data-az={c.az}
                style={{
                  width: "calc(var(--globe-r) * 0.36)",
                  height: "calc(var(--globe-r) * 0.36)",
                  margin: "calc(var(--globe-r) * -0.18)",
                  transform: `rotateY(${c.az}deg) rotateX(${-c.lat}deg) translateZ(var(--globe-r))`,
                }}
              >
                <span className="relative h-[52%] w-auto aspect-square overflow-hidden rounded-full border border-lime/30 bg-[#1a2030]">
                  <span className="absolute inset-0 flex items-center justify-center font-display text-sm font-bold text-line-strong">
                    {c.client.name.charAt(0)}
                  </span>
                  {c.client.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={c.client.photo}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : null}
                </span>
                <p className="max-w-full truncate px-1 text-center text-[9px] font-medium leading-tight text-ink">
                  {c.client.name}
                </p>
                <p className="text-[8px] leading-none">{c.client.flag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* readability vignette — darkens the middle where the text sits */}
      <div
        className="absolute -inset-[20%]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 50% 50%, rgba(5,6,10,0.78) 0%, rgba(5,6,10,0.38) 55%, rgba(5,6,10,0) 78%)",
        }}
      />
    </div>
  );
}
