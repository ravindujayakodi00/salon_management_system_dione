'use client';

import { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 700);
          }, 350);
          return 100;
        }
        return prev + 7;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <LogoMark />
      </div>
    );
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Corner marks */}
      <span className="absolute top-6 left-6 w-5 h-5 border-t border-l border-white/[0.15]" />
      <span className="absolute top-6 right-6 w-5 h-5 border-t border-r border-white/[0.15]" />
      <span className="absolute bottom-6 left-6 w-5 h-5 border-b border-l border-white/[0.15]" />
      <span className="absolute bottom-6 right-6 w-5 h-5 border-b border-r border-white/[0.15]" />

      <div className="flex flex-col items-center gap-10 w-full max-w-[240px] px-8">
        {/* Text logo */}
        <LogoMark size="lg" />

        {/* Progress bar */}
        <div className="w-full">
          <div className="h-px bg-white/[0.12] w-full relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-px bg-fire transition-all duration-150 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-3">
            <span className="t-label text-zinc-600 text-[0.58rem]">
              {progress < 100 ? 'Loading' : 'Welcome'}
            </span>
            <span className="t-label text-zinc-600 text-[0.58rem]">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LogoMark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const textClass = size === 'lg' ? 'text-3xl' : 'text-xl';
  return (
    <span className={`font-heading ${textClass} font-bold tracking-tight text-white`}>
      DI
      <span className="relative mx-px inline-block h-[0.45em] w-[0.9em] rounded-full bg-fire align-middle" />
      NE
    </span>
  );
}
