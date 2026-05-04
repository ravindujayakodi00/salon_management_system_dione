'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { FadeIn } from '@/components/website/FadeIn';
import { themeContent } from '@/themes';

const { cta } = themeContent;

export default function BookingCTA() {
  return (
    <section
      id="book"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-black px-6 py-28 sm:px-10 sm:py-36 lg:px-16 lg:py-44"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[500px] w-[700px] rounded-full bg-fire/[0.04] blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <FadeIn>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire">
            {cta.label}
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="mt-6 font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {cta.heading}
          </h2>
        </FadeIn>
        <FadeIn delay={0.16}>
          <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-500 sm:text-lg">
            {cta.subtext}
          </p>
        </FadeIn>
        <FadeIn delay={0.22}>
          <Link
            href="/booking"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-fire px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-fire-foreground shadow-[0_20px_60px_-8px_rgba(245,168,40,0.45)] transition-all duration-300 hover:shadow-[0_24px_72px_-4px_rgba(245,168,40,0.55)] hover:brightness-110"
          >
            {cta.buttonText}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </FadeIn>
        <FadeIn delay={0.28}>
          <p className="mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700">
            {cta.footnote}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
