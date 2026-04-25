"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface Props {
  paragraphs: readonly string[];
}

export default function QuemSomosPortrait({ paragraphs }: Props) {
  const rootRef = React.useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isMotion:  "(prefers-reduced-motion: no-preference)",
          isReduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { isMotion } = ctx.conditions as { isMotion: boolean };
          const root = rootRef.current;
          if (!root) return;

          if (!isMotion) {
            gsap.set(root.querySelectorAll("[data-reveal]"), { clearProps: "all" });
            return;
          }

          gsap.from(root.querySelectorAll("[data-reveal]"), {
            y: 24,
            opacity: 0,
            filter: "blur(6px)",
            duration: 0.95,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: root, start: "top 80%" },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section ref={rootRef} className="bg-[var(--color-bg-v2)] py-[120px]">
      <div className="mx-auto w-full max-w-[1300px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Photo left */}
          <div data-reveal className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/adolfo_nortenode.jpg"
              alt="Adolfo Byrne"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-transparent to-black/20"
            />
          </div>

          {/* Text right */}
          <div className="lg:pl-8">
            <p data-reveal className="mono-label-v2">
              [ FOUNDER ]
            </p>
            <h2
              data-reveal
              className="mt-4 font-medium text-[var(--color-text-primary-v2)]"
              style={{ fontSize: "var(--text-headline-sm-v2)", lineHeight: 1.1 }}
            >
              Adolfo Byrne
            </h2>
            <div className="mt-8 flex flex-col gap-4">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-reveal
                  className="max-w-[50ch] text-[var(--color-text-secondary-v2)]"
                  style={{ fontSize: "var(--text-body-v2)", lineHeight: 1.6 }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
