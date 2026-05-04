import Link from 'next/link';
import { themeContent } from '@/themes';

const { salonName, footer } = themeContent;

const LINKS = {
  Salon: [
    { label: 'Services',    href: '/#services' },
    { label: 'Gallery',     href: '/#results'  },
    { label: 'Pricing',     href: '/#pricing'  },
    { label: 'Book Now',    href: '/booking'   },
  ],
  Info: [
    { label: 'Our Journey', href: '/our-journey'  },
    { label: 'FAQ',         href: '/faq'          },
    { label: 'Terms',       href: '/terms-of-care'},
    { label: 'Location',    href: '/#location'    },
  ],
  Connect: [
    ...footer.socials.map(s => ({ label: s.name, href: s.href })),
    { label: 'Google Maps', href: 'https://www.google.com/maps' },
  ],
} as const;

export default function Footer() {
  return (
    <footer
      id="location"
      className="scroll-mt-20 border-t border-white/[0.06] bg-zinc-950/50 px-6 pt-16 pb-10 sm:px-10 sm:pt-20 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-xl font-bold tracking-tight text-white"
            >
              DI
              <span className="relative mx-px inline-block h-[0.45em] w-[0.9em] rounded-full bg-fire align-middle" />
              NE
            </Link>
            <address className="mt-5 text-sm not-italic leading-relaxed text-zinc-600">
              {/* TODO: Replace with actual Dione Salon address */}
              TODO: Salon Address
              <br />
              Open daily · 9 am – 8 pm
            </address>
            <p className="mt-3 text-xs text-zinc-700">{footer.tagline}</p>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, items]) => (
            <div key={title}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                {title}
              </p>
              <ul className="mt-4 space-y-3">
                {items.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-zinc-600 transition-colors duration-200 hover:text-white"
                      {...(l.href.startsWith('http')
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/[0.05] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-700">
            © {new Date().getFullYear()} {salonName}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-700">
            Crafted with care for every hair story.
          </p>
        </div>
      </div>
    </footer>
  );
}
