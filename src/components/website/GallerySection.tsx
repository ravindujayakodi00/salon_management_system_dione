'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/website/FadeIn';
import { useIsMobile } from '@/hooks/use-is-mobile';

const RESULTS = [
  { src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80', alt: 'Hair color result' },
  { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80', alt: 'Cut and blowout result' },
  { src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80', alt: 'Salon makeover result' },
  { src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80', alt: 'Hair treatment result' },
  { src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80', alt: 'Color and gloss result' },
  { src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', alt: 'Finished hair look' },
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', alt: 'Salon styling result' },
  { src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80', alt: 'Barber shop styling result' },
] as const;

function ResultTile({ item, index }: { item: (typeof RESULTS)[number]; index: number }) {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 36, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{
        once: true,
        margin: isMobile ? '-10% 0px -5% 0px' : '-40px',
        amount: isMobile ? 0.2 : 0,
      }}
      transition={
        isMobile
          ? { type: 'spring', stiffness: 400, damping: 22, mass: 0.7, delay: 0.05 * index }
          : { delay: 0.04 * index, duration: 0.45, ease: [0.22, 1, 0.36, 1] }
      }
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/50 sm:rounded-3xl">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    </motion.div>
  );
}

export default function GallerySection() {
  return (
    <section
      id="results"
      className="scroll-mt-20 border-t border-white/[0.06] bg-zinc-950/40 px-6 py-24 sm:px-10 sm:py-32 lg:px-16 lg:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire">
            Client results
          </p>
        </FadeIn>
        <FadeIn delay={0.08}>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Real transformations from our chair
          </h2>
        </FadeIn>
        <FadeIn delay={0.14}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-500 sm:text-lg">
            A glimpse of cuts, color, and styling we deliver every week — yours could be next.
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-20 lg:grid-cols-4 lg:gap-4">
          {RESULTS.map((item, i) => (
            <ResultTile key={item.src} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
