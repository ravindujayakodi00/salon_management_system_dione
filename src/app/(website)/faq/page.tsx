'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SALON_NAME } from '@/config/salon';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/website/Navbar';
import Footer from '@/components/website/Footer';

const faqs = [
  {
    question: `What makes the ${SALON_NAME} experience different?`,
    answer: 'We are a premium unisex salon focused on precision, quality, and a personalized experience. Every visit is tailored to your texture, face shape, and lifestyle — not a one-size-fits-all approach.',
  },
  {
    question: 'Do I need to book in advance?',
    answer: 'We recommend booking in advance to secure your preferred time slot, though we also welcome walk-ins. Online bookings receive our first-visit 15% discount.',
  },
  {
    question: 'Is the salon unisex?',
    answer: `Yes. ${SALON_NAME} is a fully unisex space welcoming everyone — all genders, hair types, and styles. Our team is trained to work across a wide range of techniques for any client.`,
  },
  {
    question: 'How do I pay for my services?',
    answer: 'We accept cash, bank transfers, and card payments. Payment is due upon completion of your service.',
  },
  {
    question: 'Do you offer color consultations?',
    answer: 'Absolutely. Every color service begins with a consultation. For complex transformations, we recommend booking a standalone consultation appointment so we can properly assess your hair condition and create a personalized plan.',
  },
  {
    question: 'What is a Keratin Treatment and how long does it last?',
    answer: 'Keratin treatments smooth frizz, reduce curl, and dramatically improve manageability by infusing keratin protein into the hair. Results typically last 3–5 months depending on your hair type and aftercare routine. We use professional-grade formulas that preserve hair integrity.',
  },
  {
    question: 'How should I prepare for a color appointment?',
    answer: 'Hair Condition: Arrive with hair that has not been freshly washed — day-old hair is ideal as natural oils protect the scalp.\n\nAllergy Patch Test: For first-time color clients or those with sensitive skin, we strongly recommend a patch test 48 hours before your appointment.\n\nComfortable Clothing: Color services can be lengthy — wear something relaxed, and avoid high-neck tops that are difficult to protect.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'We kindly request at least 24 hours notice for cancellations or rescheduling. Late cancellations or no-shows may require a deposit to secure future appointments.',
  },
  {
    question: 'Do you offer kids haircuts?',
    answer: 'Yes. Our Kids & Teens service is delivered by patient, friendly stylists who make younger clients feel comfortable. We welcome children of all ages and take the time to ensure every visit is a positive experience.',
  },
  {
    question: 'What brands and products do you use?',
    answer: 'We use professional salon-grade products selected for their quality and performance. Our team will recommend the best products for your hair type and goals during your consultation.',
  },
];

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06]">
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-start gap-5">
          <span className="t-label text-zinc-700 shrink-0 pt-0.5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-heading text-base font-medium text-white">
            {question}
          </span>
        </div>
        <span className={`shrink-0 text-fire transition-transform duration-300 mt-0.5 ${open ? 'rotate-45' : ''}`}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 3v12M3 9h12" />
          </svg>
        </span>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
        <div className="pl-10 pr-6">
          {answer.split('\n\n').map((para, i) => (
            <p key={i} className="text-zinc-500 text-sm leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <>
      <Navbar alwaysVisible />

      <main className="bg-black min-h-screen">

        {/* Page Hero */}
        <section className="pt-36 pb-16 lg:pt-44 lg:pb-20 bg-black border-b border-white/[0.06]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <p className="font-heading text-[11px] font-bold uppercase tracking-[0.3em] text-fire mb-4">Support</p>
            <h1 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl mb-4">
              FAQ
            </h1>
            <p className="text-zinc-500 text-base leading-relaxed max-w-md">
              Everything you need to know about your visit with us.
            </p>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl border-t border-white/[0.06]">
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
              ))}
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
