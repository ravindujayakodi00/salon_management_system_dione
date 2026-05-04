'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/#services',   label: 'Services',    anchor: '#services'  },
  { href: '/#results',    label: 'Gallery',     anchor: '#results'   },
  { href: '/#pricing',    label: 'Pricing',     anchor: '#pricing'   },
  { href: '/our-journey', label: 'Our Journey', anchor: null         },
  { href: '/faq',         label: 'FAQ',         anchor: null         },
  { href: '/#location',   label: 'Location',    anchor: '#location'  },
] as const;

interface NavbarProps {
  alwaysVisible?: boolean;
}

export default function Navbar({ alwaysVisible = false }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // On the home page use the bare anchor (#services) so Lenis smooth-scrolls in place.
  // On other pages use the absolute path (/#services) to navigate home first.
  const resolveHref = (link: (typeof NAV)[number]) =>
    isHome && link.anchor ? link.anchor : link.href;

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (window.scrollY > 120 && !alwaysVisible) {
        scrollTimeout.current = setTimeout(() => setIsVisible(false), 2500);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [alwaysVisible]);

  const shouldHide = !alwaysVisible && !isVisible && !open;

  return (
    <>
      <motion.nav
        className={cn(
          'fixed inset-x-0 top-0 border-b border-white/[0.06] bg-black/90 backdrop-blur-xl',
          open ? 'z-[100]' : 'z-50',
          'transition-transform duration-500',
          shouldHide ? '-translate-y-full' : 'translate-y-0',
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setIsVisible(true)}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[4.5rem] sm:px-8 lg:px-12">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-white"
          >
            DI
            <span className="relative mx-px inline-block h-[0.45em] w-[0.9em] rounded-full bg-fire align-middle" />
            NE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 sm:flex xl:gap-8">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={resolveHref(l)}
                className="text-[12px] font-medium uppercase tracking-[0.15em] text-zinc-400 transition-colors duration-200 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="ml-2 rounded-full bg-fire px-5 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-fire-foreground transition-all duration-300 hover:shadow-[0_8px_32px_rgba(245,168,40,0.35)] hover:brightness-110"
            >
              Book Now
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            className={cn(
              'relative z-[110] flex size-11 items-center justify-center rounded-xl sm:hidden',
              'text-white ring-2 ring-transparent transition-[background,ring-color]',
              open && 'bg-white/10 ring-white/25 backdrop-blur-sm',
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? (
              <X className="size-6 shrink-0 text-white" strokeWidth={2.5} />
            ) : (
              <Menu className="size-5 shrink-0 text-white" strokeWidth={2} />
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-7 bg-black/95 backdrop-blur-2xl sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {NAV.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.05 * i, duration: 0.3 }}
              >
                <Link
                  href={resolveHref(l)}
                  onClick={() => setOpen(false)}
                  className="font-heading text-2xl font-semibold text-white"
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="mt-4 inline-block rounded-full bg-fire px-8 py-3 text-sm font-bold uppercase tracking-wider text-fire-foreground"
              >
                Book Now
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
