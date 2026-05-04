'use client';

import { FadeIn } from '@/components/website/FadeIn';

const PRICING = [
  { name: 'Haircut',           price: 'LKR 10,500', duration: '40 min'  },
  { name: 'Kids Cut',          price: 'LKR 7,500',  duration: '30 min'  },
  { name: 'Beard Trim',        price: 'LKR 6,000',  duration: '20 min'  },
  { name: 'Buzz Cut',          price: 'LKR 7,500',  duration: '25 min'  },
  { name: 'Hair Color',        price: 'LKR 19,500', duration: '90 min'  },
  { name: 'Balayage',          price: 'LKR 36,000', duration: '120 min' },
  { name: 'Keratin Treatment', price: 'LKR 45,000', duration: '150 min' },
  { name: 'Blowout & Style',   price: 'LKR 12,000', duration: '45 min'  },
] as const;

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-white/[0.06] bg-black px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          {/* Left: heading */}
          <div>
            <FadeIn>
              <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire">
                Pricing
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                Transparent pricing, no surprises
              </h2>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="mt-5 text-base leading-relaxed text-zinc-500 sm:text-lg">
                Every service includes a consultation. Complex color or
                multi-step treatments are quoted in person to ensure accuracy.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="mt-8 rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-6">
                <p className="text-sm font-semibold text-white">First visit?</p>
                <p className="mt-1.5 text-sm text-zinc-500">
                  Enjoy 15% off your first service when you book online.
                </p>
              </div>
            </FadeIn>
          </div>

          {/* Right: price list */}
          <FadeIn delay={0.12} direction="right">
            <div className="rounded-[2rem] border border-white/[0.06] bg-zinc-950/50 p-1">
              <div className="divide-y divide-white/[0.05]">
                {PRICING.map((s) => (
                  <div
                    key={s.name}
                    className="group flex items-center justify-between px-6 py-5 transition-colors duration-300 hover:bg-white/[0.02] first:rounded-t-[1.75rem] last:rounded-b-[1.75rem]"
                  >
                    <div>
                      <p className="font-heading text-[15px] font-semibold uppercase tracking-wide text-white">
                        {s.name}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-600">{s.duration}</p>
                    </div>
                    <span className="font-heading text-lg font-bold text-fire/80 transition-colors duration-300 group-hover:text-fire">
                      {s.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
