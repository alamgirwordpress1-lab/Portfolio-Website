import { marqueeTech } from "@/lib/data";
import TechBadge from "./TechBadge";

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-paused overflow-hidden">
      <div className={`marquee-track items-center gap-10 py-5 pr-10 ${reverse ? "reverse" : ""}`}>
        {doubled.map((name, i) => (
          <div key={`${name}-${i}`} className="flex shrink-0 items-center gap-3">
            <TechBadge name={name} size={22} />
            <span className="font-display text-lg font-medium text-muted">{name}</span>
            <span className="ml-6 text-lime/40" aria-hidden>
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  const half = Math.ceil(marqueeTech.length / 2);
  return (
    <div className="overflow-hidden py-4">
      <section className="relative w-[104%] -translate-x-[2%] -rotate-1 border-y border-line bg-surface/80 backdrop-blur-sm">
        <Row items={marqueeTech.slice(0, half)} />
        <div className="border-t border-line" />
        <Row items={marqueeTech.slice(half)} reverse />
      </section>
    </div>
  );
}
