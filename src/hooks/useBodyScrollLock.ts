import { useEffect } from 'react';

const LOCK_CLASS = 'is-scroll-locked';

/** Number of active locks, so nested overlays (drawer + modal) don't unlock each other. */
let activeLocks = 0;

export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return undefined;

    activeLocks += 1;
    document.body.classList.add(LOCK_CLASS);
    return () => {
      activeLocks -= 1;
      if (activeLocks === 0) document.body.classList.remove(LOCK_CLASS);
    };
  }, [locked]);
}
