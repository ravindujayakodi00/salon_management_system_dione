'use client';

import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { FadeIn } from '@/components/website/FadeIn';
import { themeContent } from '@/themes';

const { contact } = themeContent;

// TODO: Replace mapsQuery with actual Dione Salon address for Google Maps
const mapsQuery = contact.address.join(' ');
const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;

export default function MapContactSection() {
  return (
    <section
      id="location"
      className="scroll-mt-20 border-t border-white/[0.06] bg-black px-6 py-20 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 text-center sm:text-left lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: address block */}
          <div className="flex flex-col items-center sm:items-start">
            <FadeIn className="flex w-full justify-center sm:justify-start">
              <div className="inline-flex items-center gap-2 rounded-full border border-fire/30 bg-fire/10 px-3 py-1.5 text-fire">
                <MapPin className="size-4 shrink-0" aria-hidden />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Location</span>
              </div>
            </FadeIn>
            <FadeIn delay={0.08} className="w-full">
              <h2 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {contact.heading}
              </h2>
            </FadeIn>
            <FadeIn delay={0.14} className="w-full">
              <address className="mt-5 text-base not-italic leading-relaxed text-zinc-400 sm:text-lg">
                <span className="flex flex-col items-center gap-2 text-white sm:flex-row sm:items-start sm:gap-3 sm:text-left">
                  <MapPin className="size-5 shrink-0 text-fire sm:mt-1" strokeWidth={2} aria-hidden />
                  <span>
                    {contact.address.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < contact.address.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </span>
              </address>
            </FadeIn>
            <FadeIn delay={0.18} className="w-full">
              <div className="mt-4 space-y-1">
                {contact.hours.map((h, i) => (
                  <p key={i} className="text-sm text-zinc-500">{h}</p>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.24} className="flex w-full justify-center sm:justify-start">
              <Link
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-fire/40 hover:bg-fire/10 hover:text-fire"
              >
                <MapPin className="size-4" aria-hidden />
                Open in Google Maps
              </Link>
            </FadeIn>
          </div>

          {/* Right: embedded map */}
          <FadeIn delay={0.12} direction="right" className="w-full">
            <div className="mx-auto max-w-lg overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/50 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.6)] sm:mx-0 sm:max-w-none sm:rounded-3xl">
              <iframe
                title="Salon location"
                src={contact.mapUrl}
                className="aspect-[4/3] min-h-[240px] w-full border-0 sm:min-h-[280px] lg:aspect-video lg:min-h-[320px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
