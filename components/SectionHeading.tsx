"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsapSetup";

export default function SectionHeading({
  eyebrow,
  children,
  lead,
  align = "left",
}: {
  eyebrow: string;
  children: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = ref.current?.querySelector(".sh-title");
      if (!heading) return;

      document.fonts.ready.then(() => {
        const split = new SplitText(heading, { type: "words", mask: "words" });
        gsap.fromTo(
          split.words,
          { yPercent: 115 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.045,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
          }
        );
      });

      gsap.fromTo(
        ".sh-eyebrow",
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: ref.current, start: "top 85%", once: true },
        }
      );

      if (ref.current?.querySelector(".sh-lead")) {
        gsap.fromTo(
          ".sh-lead",
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.25,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
          }
        );
      }
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${
        align === "center" ? "items-center text-center" : "items-start"
      }`}
    >
      <span className="sh-eyebrow eyebrow">{eyebrow}</span>
      <h2 className="sh-title heading-xl max-w-3xl text-ink">{children}</h2>
      {lead ? <p className="sh-lead max-w-2xl text-base leading-relaxed text-muted md:text-lg">{lead}</p> : null}
    </div>
  );
}
