"use client";

import { useRef, type CSSProperties } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsapSetup";
import { techIcons } from "@/lib/icons";
import { projects, clients, type Project } from "@/lib/data";

/**
 * "Sphere Wall" hero background — a full-bleed concave wall of tiles
 * (animos.app Sphere Wall) drifting around the viewer. Tiles carry real
 * content: live project screenshots, worldwide clients, locations and
 * the tech stack, all fading out toward the edges.
 */

const COLS = 24;
const ROWS = 4;

const ICON_KEYS = Object.keys(techIcons);

const LOCATIONS = [
  { flag: "🇬🇧", name: "United Kingdom", sub: "Clients & Team" },
  { flag: "🇧🇩", name: "Bangladesh", sub: "Based in Dhaka" },
  { flag: "🌍", name: "Worldwide", sub: "Remote Delivery" },
];

function iconFill(hex: string) {
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum < 0.18 ? "#dbe0ea" : `#${hex}`;
}

function shot(url: string) {
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=480&h=360`;
}

type Tile = {
  az: number;
  row: number;
  kind: "project" | "client" | "tech" | "location";
  project?: Project;
  client?: (typeof clients)[number];
  icon?: string;
  loc?: (typeof LOCATIONS)[number];
};

const TILES: Tile[] = (() => {
  const out: Tile[] = [];
  let pi = 0;
  let ci = 0;
  let ti = 0;
  let li = 0;
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const az = (360 / COLS) * c + (r % 2 === 1 ? 360 / COLS / 2 : 0);
      const row = r - (ROWS - 1) / 2;
      const kindIdx = (r + c) % 4;
      if (kindIdx === 0 || kindIdx === 2) {
        // half the wall is project screenshots
        out.push({ az, row, kind: "project", project: projects[pi++ % projects.length] });
      } else if (kindIdx === 1) {
        if ((r + c) % 8 === 5) {
          out.push({ az, row, kind: "location", loc: LOCATIONS[li++ % LOCATIONS.length] });
        } else {
          out.push({ az, row, kind: "client", client: clients[ci++ % clients.length] });
        }
      } else {
        out.push({ az, row, kind: "tech", icon: ICON_KEYS[ti++ % ICON_KEYS.length] });
      }
    }
  }
  return out;
})();

export default function SphereWall() {
  const rootRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const spin = spinRef.current;
      if (!spin) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      gsap.fromTo(
        rootRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.6, delay: 1.6, ease: "power2.out" }
      );

      if (!reduce) {
        gsap.to(spin, { rotationY: -360, duration: 130, ease: "none", repeat: -1 });
      }

      // edge fade — tiles are brightest at the front, vanish toward the sides.
      // Paused while offscreen and run at half frame-rate to keep the main
      // thread light (96 style writes per update).
      const tiles = gsap.utils.toArray<HTMLElement>(".wall-tile");
      const defs = tiles.map((el) => ({ el, az: Number(el.dataset.az || 0) }));
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
        const ry = Number(gsap.getProperty(spin, "rotationY")) || 0;
        for (const d of defs) {
          const c = Math.cos(((d.az + ry) * Math.PI) / 180);
          const v = c > 0 ? Math.pow(c, 1.5) : 0;
          d.el.style.opacity = String(v * 0.65);
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
      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      style={
        {
          perspective: "1150px",
          "--wall-r": "clamp(560px, max(62vw, 62vh), 900px)",
        } as CSSProperties
      }
      aria-hidden
    >
      <div style={{ transform: "rotateX(-5deg)", transformStyle: "preserve-3d" }}>
        <div ref={spinRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
          {TILES.map((t, i) => (
            <div
              key={i}
              className="wall-tile absolute left-1/2 top-1/2 overflow-hidden rounded-xl border border-line bg-card/90"
              data-az={t.az}
              style={{
                width: "calc(var(--wall-r) * 0.27)",
                height: "calc(var(--wall-r) * 0.185)",
                margin: "calc(var(--wall-r) * -0.0925) calc(var(--wall-r) * -0.135)",
                transform: `rotateY(${t.az}deg) translateZ(calc(var(--wall-r) * -1)) translateY(calc(var(--wall-r) * 0.21 * ${t.row}))`,
              }}
            >
              {t.kind === "project" && t.project ? (
                <>
                  <span
                    className="absolute inset-0 flex items-center justify-center font-display text-4xl font-bold text-line-strong"
                  >
                    {t.project.title.charAt(0)}
                  </span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={shot(t.project.url)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg/95 via-bg/50 to-transparent px-2.5 pb-1.5 pt-5">
                    <p className="truncate text-[10px] font-medium text-ink">
                      {t.project.flag} {t.project.title}
                    </p>
                  </div>
                </>
              ) : null}

              {t.kind === "client" && t.client ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 px-2 text-center">
                  <span className="text-2xl leading-none">{t.client.flag}</span>
                  <span className="line-clamp-2 text-[10px] font-medium leading-tight text-muted">
                    {t.client.name}
                  </span>
                </div>
              ) : null}

              {t.kind === "location" && t.loc ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 border-lime/20 bg-lime-soft px-2 text-center">
                  <span className="text-2xl leading-none">{t.loc.flag}</span>
                  <span className="text-[11px] font-semibold text-ink">{t.loc.name}</span>
                  <span className="font-mono text-[8px] uppercase tracking-wider text-lime">
                    {t.loc.sub}
                  </span>
                </div>
              ) : null}

              {t.kind === "tech" && t.icon && techIcons[t.icon] ? (
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-[42%] w-auto opacity-50"
                    fill={iconFill(techIcons[t.icon].hex)}
                    role="presentation"
                  >
                    <path d={techIcons[t.icon].path} />
                  </svg>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* readability vignette over the wall */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 56% 48% at 50% 47%, rgba(5,6,10,0.72) 0%, rgba(5,6,10,0.34) 55%, rgba(5,6,10,0.05) 82%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
