// Dione Salon — Content & Copy

export interface ServiceItem {
  number: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  fullDescription: string;
  prepTitle: string;
  prepIntro: string;
  prepSteps: { label: string; detail: string }[];
}

export const content = {
  salonName: 'Dione Salon',
  tagline:   'Royal Style Begins With Perfection',

  hero: {
    label:        'Premium Unisex Salon',
    heading:      ['Royal Style Begins', 'With Perfection'],
    subtext:      'Perfect cuts crafted with precision and style to bring confidence and elegance.',
    ctaPrimary:   'Book an Appointment',
    ctaSecondary: 'Explore Our Services',
  },

  services: {
    heading: 'Our Services',
    label:   'What We Offer',
    subtext: 'From sharp fades to lived-in color, kids cuts to event styling — we tailor every visit to you.',
    items: [
      {
        number: '01', title: 'Cut & Finish', slug: 'cut-finish',
        description: 'Precision shaping tailored to your texture, face shape, and daily routine.',
        image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'A great haircut is the foundation of great style. Our stylists take the time to understand your texture, face shape, lifestyle, and maintenance preferences before picking up a single pair of scissors. Whether you want a bold transformation or a clean, precise refresh, every Cut & Finish service is performed with full attention to detail — and finished with a blowout or styling that shows off the cut at its best.',
        prepTitle: 'How to prepare for your Cut & Finish',
        prepIntro: 'To get the best out of your visit, here are a few things to keep in mind:',
        prepSteps: [
          { label: 'Come with clean hair', detail: 'Washed hair gives the stylist the clearest view of your natural texture and fall.' },
          { label: 'Bring reference images', detail: 'A photo on your phone of what you have in mind saves time and ensures we are on the same page.' },
          { label: 'Be open about your routine', detail: 'Tell us how much time you spend on your hair each morning — we will cut to suit your lifestyle.' },
        ],
      },
      {
        number: '02', title: 'Color & Highlights', slug: 'color-highlights',
        description: 'Full color, balayage, or subtle dimension — all with salon-grade formulas.',
        image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'Color is one of the most powerful ways to transform your look. From vibrant all-over color to sun-kissed balayage, precise highlights, or rich glossing treatments, our colorists use professional-grade formulas that protect the integrity of your hair while delivering results that last. Every color service begins with a consultation to understand your vision, your current condition, and the best pathway to get you there.',
        prepTitle: 'Preparing for your color appointment',
        prepIntro: 'Color works best when both client and stylist are fully prepared:',
        prepSteps: [
          { label: 'Avoid washing hair on the day', detail: 'Natural oils protect your scalp during the color process — arriving with day-old hair is ideal.' },
          { label: 'Allergy patch test', detail: 'For first-time color clients or those with sensitive skin, we recommend a patch test 48 hours before your appointment.' },
          { label: 'Wear comfortable clothing', detail: 'Color services can be lengthy — wear something relaxed, and avoid high-neck tops that are hard to protect.' },
        ],
      },
      {
        number: '03', title: 'Styling', slug: 'styling',
        description: 'Blowouts, waves, updos, and event-ready looks with editorial polish.',
        image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'Whether you are preparing for a wedding, a photoshoot, or simply want to walk out feeling your best, our Styling services deliver polished, long-lasting looks. From soft, bouncy blowouts to sculpted updos and textured wave sets, our stylists bring editorial skill and a careful eye for proportion and finish. We work with your natural texture and hair type to create a style that not only looks incredible in the moment but holds beautifully throughout the day.',
        prepTitle: '', prepIntro: '', prepSteps: [],
      },
      {
        number: '04', title: 'Beard & Grooming', slug: 'beard-grooming',
        description: 'Trim, line-up, hot towel, and detail work with the same expert eye.',
        image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'Grooming is as much a part of your signature as your haircut. Our Beard & Grooming services combine precision line-ups, sculpted shaping, and a luxurious hot towel finish that leaves your skin feeling as good as it looks. Every detail is considered — from the angle of your neckline to the weight of your beard — to create a result that is clean, sharp, and unmistakably you.',
        prepTitle: '', prepIntro: '', prepSteps: [],
      },
      {
        number: '05', title: 'Treatments', slug: 'treatments',
        description: 'Keratin smoothing, deep conditioning, and scalp therapy that lasts.',
        image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'Healthy hair starts beneath the surface. Our range of professional treatments — from keratin smoothing and deep conditioning masks to targeted scalp therapy — are designed to repair damage, restore shine, and significantly improve the texture and manageability of your hair. These are not quick fixes; they are transformative services backed by professional-grade products that deliver results you will feel in the first wash and see for weeks to come.',
        prepTitle: 'Before your treatment',
        prepIntro: 'A few steps help ensure your treatment delivers the best results:',
        prepSteps: [
          { label: 'Arrive with clean hair', detail: 'Most treatments are applied to freshly washed hair — check with your stylist when booking.' },
          { label: 'Avoid styling products', detail: 'Come free of heavy serums, dry shampoo, or styling products so the treatment can fully penetrate.' },
          { label: 'Plan your post-treatment care', detail: 'Some treatments (like keratin) require you to avoid washing or tying up your hair for 48–72 hours after.' },
        ],
      },
      {
        number: '06', title: 'Kids & Teens', slug: 'kids-teens',
        description: 'Patient stylists, fun energy, and sharp results — for every age.',
        image: 'https://images.unsplash.com/photo-1587799119854-b7d5d0f48438?auto=format&fit=crop&w=900&q=80',
        fullDescription: 'Getting a great haircut should be a positive experience at any age. Our Kids & Teens services are delivered by patient, friendly stylists who take the time to make younger clients feel comfortable and heard. From neat trims to first cuts, school-ready styles to teen-approved looks, we deliver clean, sharp results that parents appreciate and kids actually like.',
        prepTitle: '', prepIntro: '', prepSteps: [],
      },
    ] as ServiceItem[],
  },

  gallery: {
    label:   'Our Work',
    heading: 'Real Transformations',
    subtext: 'A glimpse of cuts, color, and styling we deliver every week — yours could be next.',
    images: [
      { id: 1, type: 'image', alt: 'Hair color result',           src: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=900&q=80', wide: true,  orientation: 'portrait'  },
      { id: 2, type: 'image', alt: 'Cut and blowout result',      src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=900&q=80', wide: true,  orientation: 'portrait'  },
      { id: 3, type: 'image', alt: 'Salon makeover result',       src: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'portrait'  },
      { id: 4, type: 'image', alt: 'Hair treatment result',       src: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'portrait'  },
      { id: 5, type: 'image', alt: 'Color and gloss result',      src: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'portrait'  },
      { id: 6, type: 'image', alt: 'Finished hair look',          src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'portrait'  },
      { id: 7, type: 'image', alt: 'Salon styling result',        src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'landscape' },
      { id: 8, type: 'image', alt: 'Barber shop styling result',  src: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=900&q=80', wide: false, orientation: 'portrait'  },
    ],
  },

  testimonials: {
    label:   'What Our Clients Say',
    heading: 'Client Stories',
    items: [
      { quote: 'The best salon experience I have ever had. The cut was exactly what I wanted and the styling was flawless.', name: 'Client Name', service: 'Cut & Finish' },
      { quote: 'My color turned out absolutely beautiful. The team really listened and delivered beyond my expectations.', name: 'Client Name', service: 'Color & Highlights' },
      { quote: 'The keratin treatment transformed my hair completely. I have never had hair this smooth and manageable.', name: 'Client Name', service: 'Treatments' },
      { quote: 'Brought my son for his first proper haircut and the stylist was so patient and friendly. Will definitely be back.', name: 'Client Name', service: 'Kids & Teens' },
    ],
  },

  cta: {
    label:      'Ready?',
    heading:    'Your best look is one visit away',
    subtext:    'Walk in or book online — we are open seven days a week with same-day availability.',
    buttonText: 'Book an Appointment',
    footnote:   'No registration required · Instant Confirmation',
  },

  contact: {
    label:   'Find Us',
    heading: 'Visit Dione Salon',
    subtext: 'Come find us or get in touch',
    address: ['75A, Colombo Road,', 'Maharagama, Sri Lanka'],
    phones:  ['+94 77 800 0440'],
    emails:  ['TODO: email@dionesalon.lk'],
    hours:   ['Mon – Sat: 9:00 AM – 8:00 PM', 'Sun: 10:00 AM – 6:00 PM'],
    // Dione Cuts & Beauty Salon — 6.848141, 79.9250991
    mapUrl:  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.5!2d79.9225242!3d6.848141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25100167270d5%3A0x5a6563fd1038ded8!2sDione+cuts+%26+Beauty+salon!5e0!3m2!1sen!2slk!4v1',
  },

  expertise: {
    heading:    'Our Expertise',
    scrollHint: 'Scroll to explore',
    items: [
      {
        id:          1,
        number:      '01',
        title:       'Precision Cuts',
        description: 'Expert shaping tailored to your texture, face shape, and lifestyle — for results that last.',
        image:       'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=2070&q=80',
      },
      {
        id:          2,
        number:      '02',
        title:       'Color Mastery',
        description: 'From vibrant all-over color to sun-kissed balayage — rich, lasting results with professional-grade formulas.',
        image:       'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=2026&q=80',
      },
      {
        id:          3,
        number:      '03',
        title:       'Hair Treatments',
        description: 'Keratin smoothing, deep conditioning, and scalp therapy that restore shine and transform texture.',
        image:       'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=2070&q=80',
      },
      {
        id:          4,
        number:      '04',
        title:       'Beard & Grooming',
        description: 'Sharp line-ups, sculpted shaping, and hot towel finishes that elevate your entire look.',
        image:       'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1974&q=80',
      },
    ],
  },

  footer: {
    tagline: 'Royal Style Begins With Perfection.',
    links: [
      { name: 'Services',          href: '/#services'  },
      { name: 'Gallery',           href: '/#results'   },
      { name: 'Pricing',           href: '/#pricing'   },
      { name: 'FAQ',               href: '/faq'        },
      { name: 'Our Journey',       href: '/our-journey'},
      { name: 'Terms of Care',     href: '/terms-of-care' },
    ],
    // TODO: Replace with actual Dione Salon social media links
    socials: [
      { name: 'Instagram', href: 'https://www.instagram.com/', letter: 'IG' },
      { name: 'Facebook',  href: 'https://www.facebook.com/', letter: 'FB' },
      { name: 'TikTok',   href: 'https://www.tiktok.com/',   letter: 'TK' },
    ],
  },
}
