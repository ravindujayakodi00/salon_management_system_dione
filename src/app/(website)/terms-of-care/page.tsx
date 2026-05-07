import type { Metadata } from 'next';
import Link from 'next/link';
import { SALON_NAME } from '@/config/salon';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

export const metadata: Metadata = {
  title: `Terms of Care — ${SALON_NAME}`,
  description: `Our commitment to maintaining a professional, welcoming, and exceptional environment for every guest at ${SALON_NAME}.`,
};

const sections = [
  {
    title: 'Book in Advance',
    body: 'We recommend booking in advance to secure your preferred time slot and stylist. Online bookings receive our first-visit 15% discount. Walk-ins are welcome subject to availability.',
  },
  {
    title: 'Reservations & Deposits',
    body: 'To secure your dedicated time, certain appointments — particularly for colour services, keratin treatments, and bridal styling — may require a non-refundable advance deposit. Our team will advise you when booking if a deposit applies.',
  },
  {
    title: 'Arrival Policy',
    body: 'We invite you to arrive at your scheduled time to settle into the salon and begin your consultation. To honour the flow of our schedule and respect every client\'s time, arrivals more than 15 minutes late may require the service to be adjusted to fit the remaining time, or rescheduled to a new appointment.',
  },
  {
    title: 'Rescheduling & Cancellations',
    body: 'We understand that plans change. We kindly request at least 24 hours\u2019 notice for any cancellations or rescheduling. Late cancellations or no-shows without notice may require a deposit to secure future appointments.',
  },
  {
    title: 'Wellness & Allergies',
    body: 'Your safety is our priority. Please inform us of any skin sensitivities, allergies, or health conditions during your consultation. A patch test is required 48 hours prior to all first-time technical hair colour or chemical treatments to ensure your safety and best results.',
  },
  {
    title: 'Children & Young Clients',
    body: 'We welcome clients of all ages. Children under 12 must be accompanied by a parent or guardian. Our Kids & Teens service is delivered by patient, experienced stylists who take the time to ensure every young client feels comfortable.',
  },
  {
    title: 'Respect & Conduct',
    body: `${SALON_NAME} is a professional, inclusive space welcoming all genders and backgrounds. We ask all clients and guests to treat our team and fellow clients with courtesy and respect. We reserve the right to decline service if this standard is not upheld.`,
  },
];

export default function TermsOfCarePage() {
  return (
    <>
      <Navbar alwaysVisible />

      <main className="bg-black min-h-screen">

        {/* Page Hero */}
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 bg-black border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Our Standards</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              Terms of Care
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              To maintain a professional and welcoming environment for every guest, we kindly ask you to observe the following.
            </p>
          </div>
        </section>

        {/* Intro note */}
        <section className="py-14 lg:py-20 bg-zinc-950 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-2xl">
              <p className="font-heading text-xl font-light italic text-zinc-400 leading-relaxed">
                This is not a cold legal document. It is a guide on how we maintain the standards of care, professionalism, and respect that every {SALON_NAME} client deserves.
              </p>
            </div>
          </div>
        </section>

        {/* Terms sections */}
        <section className="py-16 lg:py-24 border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="border-t border-white/[0.06]">
                {sections.map((section, i) => (
                  <div key={i} className="border-b border-white/[0.06] py-8 lg:py-10 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-5 lg:gap-16">
                    {/* Left: title */}
                    <div className="flex items-start gap-4">
                      <span className="font-heading text-[11px] font-bold text-zinc-700 shrink-0 pt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h2 className="font-heading text-base font-medium text-white">
                        {section.title}
                      </h2>
                    </div>

                    {/* Right: body */}
                    <p className="text-zinc-500 text-sm leading-relaxed pl-8 lg:pl-0">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
