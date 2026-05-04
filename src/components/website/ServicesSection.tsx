'use client';

import {
  Scissors,
  Palette,
  Sparkles,
  CircleDot,
  Droplets,
  Heart,
  ArrowUpRight,
} from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface Service {
  icon: ReactNode;
  title: string;
  desc: string;
  price: string;
}

const SERVICES: Service[] = [
  {
    icon: <Scissors className="size-5" />,
    title: 'Cut & Finish',
    desc: 'Precision shaping tailored to your texture, face shape, and daily routine.',
    price: 'From LKR 10,500',
  },
  {
    icon: <Palette className="size-5" />,
    title: 'Color & Highlights',
    desc: 'Full color, balayage, or subtle dimension — all with salon-grade formulas.',
    price: 'From LKR 19,500',
  },
  {
    icon: <Sparkles className="size-5" />,
    title: 'Styling',
    desc: 'Blowouts, waves, updos, and event-ready looks with editorial polish.',
    price: 'From LKR 12,000',
  },
  {
    icon: <CircleDot className="size-5" />,
    title: 'Beard & Grooming',
    desc: 'Trim, line-up, hot towel, and detail work with the same expert eye.',
    price: 'From LKR 6,000',
  },
  {
    icon: <Droplets className="size-5" />,
    title: 'Treatments',
    desc: 'Keratin smoothing, deep conditioning, and scalp therapy that lasts.',
    price: 'From LKR 15,000',
  },
  {
    icon: <Heart className="size-5" />,
    title: 'Kids & Teens',
    desc: 'Patient stylists, fun energy, and sharp results — for every age.',
    price: 'From LKR 7,500',
  },
];

const spring = { type: 'spring' as const, stiffness: 380, damping: 28 };

function ServiceCard({ s, index }: { s: Service; index: number }) {
  const isMobile = useIsMobile();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const handleLeave = () => {
    mx.set(50);
    my.set(50);
  };

  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, oklch(0.82 0.15 75 / 0.14), transparent 55%)`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 44, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{
        once: true,
        margin: isMobile ? '-8% 0px -5% 0px' : '-48px',
        amount: isMobile ? 0.22 : 0,
      }}
      transition={
        isMobile
          ? { type: 'spring', stiffness: 420, damping: 22, mass: 0.72, delay: 0.07 * index }
          : { delay: 0.06 * index, duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }
      whileHover={isMobile ? undefined : { y: -10, transition: spring }}
      whileTap={{ scale: 0.985 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative cursor-pointer overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-zinc-950/80 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] sm:p-8"
    >
      {/* Spotlight follows cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-fire/[0.06] blur-3xl transition-all duration-500 group-hover:bg-fire/12 group-hover:blur-[52px]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-fire/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.06] text-fire shadow-inner transition-all duration-300 group-hover:scale-105 group-hover:-rotate-3 group-hover:border-fire/25 group-hover:bg-fire/15">
            {s.icon}
          </div>
          <span className="flex size-9 items-center justify-center rounded-xl border border-white/10 text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-fire/30 group-hover:text-fire">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </div>

        <h3 className="mt-5 font-heading text-lg font-semibold text-white transition-colors duration-300">
          {s.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400">
          {s.desc}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-600 transition-colors duration-300 group-hover:text-fire/90">
            {s.price}
          </p>
          <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 max-sm:hidden">
            Book this
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-black px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <motion.p
          className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          Our Services
        </motion.p>
        <motion.h2
          className="mt-4 max-w-lg font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06, duration: 0.5 }}
        >
          Everything your hair deserves
        </motion.h2>
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          From sharp fades to lived-in color, kids cuts to event styling — we tailor every visit to you.
        </motion.p>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
