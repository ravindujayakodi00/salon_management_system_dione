import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

export const metadata: Metadata = {
  title: 'Our Journey — Dione Salon',
  description: 'The story behind Dione Salon — a premium unisex space built on precision, artistry, and a personal commitment to every client.',
};

export default function OurJourneyPage() {
  return (
    <>
      <Navbar alwaysVisible />

      <main className="bg-black min-h-screen">

        {/* Page Hero */}
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 bg-black border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Our Story</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              Our Journey
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              A premium unisex salon built on precision, artistry, and the belief that every client deserves their best look.
            </p>
          </div>
        </section>

        {/* The Beginning */}
        <section className="py-20 lg:py-28 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* Image */}
              <div className="relative h-[380px] lg:h-[560px] w-full rounded-2xl overflow-hidden order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1633596683562-4a47eb4983c5?w=900&auto=format&fit=crop"
                  alt="Dione Salon interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Text */}
              <div className="order-1 lg:order-2">
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">The Beginning</p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
                  Where It All Started
                </h2>
                <div className="space-y-5">
                  <p className="font-heading text-lg font-light italic text-zinc-300 leading-relaxed">
                    Great hair is not about trends — it is about understanding who you are.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    Dione Salon was founded with a single purpose: to create a premium space where every client — regardless of gender, hair type, or style — receives expert, personalised care in an environment that feels exceptional.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    We set out to build a salon that combined the precision of a high-end barbershop with the artistry of a luxury hair studio. A truly <strong className="text-white font-medium">unisex destination</strong> — where the only standard is excellence.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    From our opening day, we have been guided by a commitment to craft, ongoing education, and a deep respect for every person who sits in our chair.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="py-20 lg:py-28 bg-zinc-950 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* Text */}
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Our Philosophy</p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-8">
                  Precision. Artistry. Care.
                </h2>
                <div className="space-y-5">
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    At Dione, we believe a great haircut is not a one-size-fits-all service. Every client has a unique face shape, hair texture, and lifestyle. Our job is to listen, understand, and deliver something that genuinely fits you — not just what is popular this season.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    This philosophy extends to every service we offer. Whether it is a precision cut, a complex colour transformation, or a relaxing keratin treatment, we approach each appointment with full attention and professional pride.
                  </p>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    We invest in continuous education and premium products — not to charge more, but because your hair deserves the very best we can give.
                  </p>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-[360px] lg:h-[500px] w-full rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=900&auto=format&fit=crop"
                  alt="Precision styling at Dione Salon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Vision */}
        <section className="py-20 lg:py-28 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Looking Ahead</p>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
                Our Vision
              </h2>
              <p className="font-heading text-xl font-light italic text-zinc-400 leading-relaxed">
                To be Sri Lanka&apos;s most trusted unisex salon — a place where every client walks out looking and feeling their absolute best, every single time.
              </p>
            </div>
          </div>
        </section>

        {/* What We Stand For */}
        <section className="py-20 lg:py-28 bg-zinc-950 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">

              {/* Left: heading */}
              <div>
                <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Our Standards</p>
                <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  What We Stand For
                </h2>
              </div>

              {/* Right: list */}
              <div>
                <ul className="space-y-0 border-t border-white/[0.06]">
                  {[
                    { title: 'Unisex Expertise', detail: 'Trained in cuts, colour, and treatments for all hair types and genders' },
                    { title: 'Personalised Service', detail: 'Every visit begins with a consultation — your features, your lifestyle, your vision' },
                    { title: 'Premium Products', detail: 'We use professional-grade formulas selected for quality and performance' },
                    { title: 'Clinical Hygiene', detail: 'Immaculate standards maintained at every station, every appointment' },
                    { title: 'Continuous Education', detail: 'Our team regularly trains on the latest techniques and trends' },
                  ].map((c, i) => (
                    <li key={i} className="flex items-start gap-5 border-b border-white/[0.06] py-5">
                      <span className="font-heading text-[11px] font-bold text-zinc-700 w-6 shrink-0 pt-1">{String(i + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-white text-sm font-medium mb-0.5">{c.title}</p>
                        <p className="text-zinc-500 text-xs">{c.detail}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden border-t border-white/[0.06] bg-black py-20 lg:py-28">
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
