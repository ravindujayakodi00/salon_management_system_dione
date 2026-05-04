'use client';

import { useSyncExternalStore } from 'react';

const subscribe = (cb: () => void) => {
  const mql = window.matchMedia('(min-width: 640px)');
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
};

export function useIsMobile() {
  return !useSyncExternalStore(
    subscribe,
    () => window.matchMedia('(min-width: 640px)').matches,
    () => false,
  );
}
