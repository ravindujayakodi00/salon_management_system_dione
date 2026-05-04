'use client';

const ITEMS = [
  'Haircut',
  'Color',
  'Styling',
  'Beard Trim',
  'Keratin',
  'Highlights',
  'Blowout',
  'Kids Cut',
  'Hot Towel',
  'Bridal',
];

function Row() {
  return (
    <>
      {ITEMS.map((t) => (
        <span key={t} className="flex items-center gap-6">
          <span className="whitespace-nowrap">{t}</span>
          <span
            className="size-1.5 shrink-0 rounded-full bg-fire/60"
            aria-hidden
          />
        </span>
      ))}
    </>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-zinc-950/80 py-4">
      <div className="marquee-track flex items-center gap-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
        <Row />
        <Row />
      </div>
    </div>
  );
}
