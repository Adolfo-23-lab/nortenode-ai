"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { TextReveal } from "@/components/motion/TextReveal";
import { FadeIn } from "@/components/motion/FadeIn";
import { useMotionInitial } from "@/lib/motion-safe";

/**
 * Full-bleed closing section.  No card, no container.  The AI video
 * bleeds the full section; text floats over it.  Reinforces the
 * cinematic feel and gives a strong last CTA.
 */
export default function FinalCTA() {
  const mInit = useMotionInitial();
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { entry.isIntersecting ? el.play().catch(() => {}) : el.pause(); },
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="relative isolate overflow-hidden">
      {/* Video bg — same aesthetic as Hero for narrative bookend */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[var(--color-ink-0)]">
        <video
          ref={videoRef}
          className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
          src="/assets/AI_fondo1.mp4"
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(60% 50% at 50% 50%, rgba(5,6,10,0.0) 0%, rgba(5,6,10,0.75) 75%, rgba(5,6,10,0.98) 100%),
              linear-gradient(180deg, rgba(5,6,10,0.5) 0%, rgba(5,6,10,0.2) 40%, rgba(5,6,10,0.5) 100%)
            `,
          }}
        />
      </div>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center px-6 py-36 text-center md:py-48 md:px-12">
        <FadeIn>
          <p className="mb-6 text-[11px] uppercase tracking-[0.22em] text-white/45">
            Lo siguiente
          </p>
        </FadeIn>

        <TextReveal
          whileInView
          as="h2"
          text={"Empieza hoy.\nMide en 72 horas."}
          className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.94] tracking-[-0.02em] text-white"
        />

        <FadeIn delay={0.2}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
            Activamos tu recepcionista IA en 72 horas. Si en 14 días no tienes
            más reservas agendadas automáticamente, cancelas sin preguntas.
          </p>
        </FadeIn>

        <FadeIn delay={0.35}>
          <motion.div
            className="mt-12 flex flex-col items-center gap-6 sm:flex-row sm:gap-8"
            initial={mInit({ opacity: 0, y: 20 })}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.19, 1, 0.22, 1] }}
          >
            <MagneticButton strength={18} tilt={8}>
              <Button asChild size="xl" className="group">
                <Link href="/demo">
                  Ver demo en vivo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </MagneticButton>
            <Link
              href="/contactos"
              className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white"
            >
              <span className="relative">
                Hablar con ventas
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/70 transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
}
