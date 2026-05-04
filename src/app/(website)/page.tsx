'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/website/Navbar';
import HeroSection from '@/components/website/HeroSection';
import MarqueeStrip from '@/components/website/Marquee';
import ServicesSection from '@/components/website/ServicesSection';
import GallerySection from '@/components/website/GallerySection';
import PricingSection from '@/components/website/PricingSection';
import BookingCTA from '@/components/website/BookingCTA';
import MapContactSection from '@/components/website/MapContactSection';
import Footer from '@/components/website/Footer';
import Preloader from '@/components/website/Preloader';

export default function Home() {
  // Start false on both server and client to avoid hydration mismatch.
  // useEffect (client-only) decides whether to show the preloader after mount.
  const [isLoading, setIsLoading]     = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Return visit: skip preloader, show content immediately
    if (sessionStorage.getItem('dione_preloader_seen') === '1') {
      setShowContent(true);
      return;
    }
    // First visit: show preloader
    setIsLoading(true);
  }, []);

  // When preloader finishes (isLoading goes false after being true), show content
  const [preloaderRan, setPreloaderRan] = useState(false);
  useEffect(() => {
    if (isLoading) { setPreloaderRan(true); return; }
    if (!preloaderRan) return; // isLoading was never true, return visit handled above
    sessionStorage.setItem('dione_preloader_seen', '1');
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, [isLoading, preloaderRan]);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Dark background prevents flash */}
      <div className="fixed inset-0 bg-black -z-20" />

      <main
        className={`relative min-h-screen overflow-x-hidden transition-opacity duration-700 ease-out ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
      >
        <Navbar />
        <HeroSection />
        <MarqueeStrip />
        <ServicesSection />
        <GallerySection />
        <PricingSection />
        <BookingCTA />
        <MapContactSection />
        <Footer />
      </main>
    </>
  );
}
