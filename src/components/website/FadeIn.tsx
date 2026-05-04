'use client';

import { motion, useInView } from 'framer-motion';
import { type ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
}

const offsets = {
  up:    { y: 32 },
  down:  { y: -32 },
  left:  { x: 32 },
  right: { x: -32 },
  none:  {},
} as const;

export function FadeIn({
  children,
  className,
  delay = 0,
  direction = 'up',
  duration = 0.6,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...offsets[direction] }
      }
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
