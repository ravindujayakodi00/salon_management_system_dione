import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';
import { content, type ServiceItem } from '@/themes/nine_zero_one/content';

// Build all static paths at build time
export function generateStaticParams() {
  return content.services.items.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service: ServiceItem | undefined = content.services.items.find(s => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} — ${content.salonName}`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service: ServiceItem | undefined = content.services.items.find(s => s.slug === slug);

  if (!service) notFound();

  // TypeScript guard — notFound() throws but TS doesn't know that
  const s = service as ServiceItem;

  // Adjacent services for prev/next navigation
  const currentIndex = content.services.items.findIndex(item => item.slug === slug);
  const prevService  = content.services.items[currentIndex - 1] ?? null;
  const nextService  = content.services.items[currentIndex + 1] ?? null;

  return (
    <>
      <Navbar alwaysVisible />

      <main className="bg-black min-h-screen">

        {/* ── Hero ── */}
        <section className="pt-36 pb-0 lg:pt-44 bg-black overflow-hidden border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-end">

              {/* Text */}
              <div className="pb-16 lg:pb-24">
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 font-heading text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-600 mb-8 hover:text-fire transition-colors duration-200"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 2L4 7l5 5" />
                  </svg>
                  Our Services
                </Link>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">{s.number}</p>
                <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
                  {s.title}
                  <br />
                  <span className="text-fire">at Dione</span>
                </h1>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                  {s.description}
                </p>
              </div>

              {/* Hero image */}
              <div className="relative h-[300px] lg:h-[500px] w-full">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Full Description ── */}
        <section className="py-20 lg:py-28 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">About This Service</p>
              <p className="font-heading text-xl font-light italic text-zinc-400 leading-relaxed">
                {s.fullDescription}
              </p>
            </div>
          </div>
        </section>

        {/* ── Preparation Steps (only if present) ── */}
        {s.prepSteps && s.prepSteps.length > 0 && (
          <section className="py-20 lg:py-28 bg-zinc-950 border-b border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="max-w-3xl">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Before You Arrive</p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
                  {s.prepTitle}
                </h2>
                {s.prepIntro && (
                  <p className="text-zinc-500 text-sm leading-relaxed mb-10">
                    {s.prepIntro}
                  </p>
                )}
                <ul className="space-y-0 border-t border-white/[0.06]">
                  {s.prepSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-5 border-b border-white/[0.06] py-5">
                      <span className="text-fire text-sm w-6 shrink-0 pt-0.5">→</span>
                      <div>
                        <span className="text-white text-sm font-medium">{step.label}: </span>
                        <span className="text-zinc-500 text-sm leading-relaxed">{step.detail}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Price List placeholder ── */}
        <section className={`py-20 lg:py-28 border-b border-white/[0.06] ${s.prepSteps && s.prepSteps.length > 0 ? '' : 'bg-zinc-950'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Pricing</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
                {s.title} Price List
              </h2>
              {/* Price list image to be added here */}
              <div className="border border-dashed border-white/[0.08] flex items-center justify-center h-48 lg:h-64 rounded-2xl">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-700 text-center px-6">
                  Price list to be added
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Prev / Next navigation ── */}
        {(prevService || nextService) && (
          <section className="py-12 lg:py-16 border-b border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
              <div className="flex justify-between items-center gap-6">
                {prevService ? (
                  <Link
                    href={`/services/${prevService.slug}`}
                    className="group flex items-center gap-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors duration-200"
                  >
                    <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
                    <span>{prevService.title}</span>
                  </Link>
                ) : <div />}

                {nextService ? (
                  <Link
                    href={`/services/${nextService.slug}`}
                    className="group flex items-center gap-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600 hover:text-white transition-colors duration-200"
                  >
                    <span>{nextService.title}</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </Link>
                ) : <div />}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-black py-20 lg:py-28">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[600px] rounded-full bg-fire/[0.04] blur-[100px]" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Ready?</p>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Your best look is one visit away
            </h2>
            <Link
              href="/booking"
              className="group inline-flex items-center gap-3 rounded-full bg-fire px-8 py-4 text-sm font-bold uppercase tracking-[0.12em] text-fire-foreground shadow-[0_20px_60px_-8px_rgba(245,168,40,0.45)] transition-all duration-300 hover:shadow-[0_24px_72px_-4px_rgba(245,168,40,0.55)] hover:brightness-110"
            >
              Book an Appointment
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <p className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-700 mt-6">
              No registration required · Instant Confirmation
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
