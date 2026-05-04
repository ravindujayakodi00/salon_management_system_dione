'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SLIDES = [
  {
    id: 'haircut',
    label: 'Haircut',
    src: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'styling',
    label: 'Styling',
    src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'color',
    label: 'Color',
    src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'grooming',
    label: 'Grooming',
    src: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 'treatment',
    label: 'Treatment',
    src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1920&q=85',
    thumb: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=256&q=80',
  },
] as const;

const MOBILE_THUMB = 52;
const DESKTOP_THUMB = 56;
const AUTO_INTERVAL = 4000;
const ease = [0.22, 1, 0.36, 1] as const;
const HEADER_PT = 'pt-16 sm:pt-[4.5rem]';

function RotatingRing({ className, duration = 14 }: { className?: string; duration?: number }) {
  return (
    <motion.span
      className={cn('pointer-events-none absolute rounded-full border border-dashed border-fire/50', className)}
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function ThumbInner({
  active, thumb, size, sizes, hover,
}: {
  active: boolean; thumb: string; size: number; sizes: string; hover?: boolean;
}) {
  return (
    <span className="relative block shrink-0" style={{ width: size, height: size }}>
      {active && (
        <RotatingRing
          className={cn('-inset-[5px] lg:-inset-[4px]', size >= DESKTOP_THUMB ? 'border-fire/50' : 'border-fire/45')}
          duration={size >= DESKTOP_THUMB ? 14 : 12}
        />
      )}
      <span
        className={cn(
          'relative block h-full w-full overflow-hidden rounded-full transition-all duration-500',
          active
            ? 'ring-[2.5px] ring-fire shadow-[0_0_28px_rgba(245,168,40,0.45)] sm:ring-[3px] lg:scale-105'
            : 'ring-2 ring-white/20 shadow-[0_8px_28px_rgba(0,0,0,0.45)] hover:ring-white/45',
          hover && 'group-hover/thumb:scale-110',
        )}
      >
        <Image
          src={thumb}
          alt=""
          fill
          sizes={sizes}
          className={cn('object-cover', hover && 'transition-transform duration-700')}
        />
      </span>
    </span>
  );
}

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const next = useCallback(() => setActive((p) => (p + 1) % SLIDES.length), []);

  useEffect(() => {
    const id = setInterval(next, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className={cn('relative flex min-h-[100dvh] flex-col bg-black', HEADER_PT)}>
      {/* Image carousel */}
      <div className="relative min-h-[38vh] flex-1 overflow-hidden rounded-b-[2.5rem] sm:min-h-[42vh] sm:rounded-b-[3.5rem] lg:min-h-[45vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={SLIDES[active].id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease }}
          >
            <Image
              src={SLIDES[active].src}
              alt={SLIDES[active].label}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/65" aria-hidden />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent lg:from-black/35 lg:via-transparent" aria-hidden />

        {/* Mobile & tablet: vertical thumbnail stack on the right */}
        <div
          className="absolute inset-y-0 right-0 z-10 flex w-[min(5.25rem,20vw)] flex-col items-center justify-center gap-3 py-24 sm:w-24 sm:gap-3.5 sm:py-28 lg:hidden"
          role="tablist"
          aria-label="Slide gallery"
        >
          {SLIDES.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Show ${item.label}`}
              onClick={() => setActive(i)}
              className="group/thumb flex shrink-0 flex-col items-center"
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i, type: 'spring', stiffness: 380, damping: 28 }}
              whileTap={{ scale: 0.94 }}
            >
              <ThumbInner active={active === i} thumb={item.thumb} size={MOBILE_THUMB} sizes="52px" hover />
            </motion.button>
          ))}
        </div>

        {/* Slide dots: mobile + tablet */}
        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to ${s.label}`}
              onClick={() => setActive(i)}
              className={cn('h-1.5 rounded-full transition-all duration-300', active === i ? 'w-6 bg-fire' : 'w-1.5 bg-white/35')}
            />
          ))}
        </div>
      </div>

      {/* Copy + desktop gallery */}
      <div className="relative z-10 flex flex-col gap-8 px-6 pb-10 pt-8 sm:px-10 sm:pb-14 sm:pt-10 lg:px-16 lg:pt-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <div className="max-w-2xl space-y-5 lg:min-w-0 lg:flex-1">
            <motion.h1
              className="font-heading text-[2.25rem] font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
            >
              <span className="inline-flex items-baseline">
                R
                <span className="relative mx-0.5 inline-block h-[0.52em] w-[1.3em] rounded-full bg-fire" aria-hidden />
                yal Style Begins
              </span>
              <br />
              <span className="text-white/90">With Perfection</span>
            </motion.h1>
            <motion.p
              className="max-w-md text-[0.95rem] leading-relaxed text-zinc-400 sm:text-base lg:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease }}
            >
              Perfect cuts crafted with precision and style to bring confidence and elegance.
            </motion.p>
          </div>

          {/* Desktop: horizontal gallery to the right of the headline */}
          <div className="hidden shrink-0 flex-col items-end gap-3 lg:flex lg:pt-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-fire/90">Explore</p>
            <div className="flex flex-row flex-wrap items-center justify-end gap-2.5 xl:gap-3" role="tablist" aria-label="Slide gallery">
              {SLIDES.map((item, i) => (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Show ${item.label}`}
                  onClick={() => setActive(i)}
                  className="group/thumb flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.35, ease }}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <ThumbInner active={active === i} thumb={item.thumb} size={DESKTOP_THUMB} sizes="56px" hover />
                  <span className={cn('max-w-[4.5rem] text-center text-[9px] font-medium uppercase tracking-[0.14em] transition-colors', active === i ? 'text-fire' : 'text-zinc-500')}>
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6">
          <motion.div
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-300 backdrop-blur-sm">
              Open 7 days
            </span>
            <span className="rounded-full border border-white/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500 backdrop-blur-sm">
              Walk-ins welcome
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 22 }}
          >
            <Link
              href="/booking"
              className="group relative flex size-16 items-center justify-center rounded-2xl bg-fire text-fire-foreground shadow-[0_24px_64px_-8px_rgba(245,168,40,0.5)] transition-all duration-300 hover:scale-105 hover:shadow-[0_28px_72px_-4px_rgba(245,168,40,0.6)] active:scale-95 sm:size-[4.5rem] sm:rounded-[1.25rem]"
              aria-label="Book an appointment"
            >
              <Scissors className="size-7 stroke-[1.6] transition-transform duration-300 group-hover:rotate-[-15deg] sm:size-8" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
