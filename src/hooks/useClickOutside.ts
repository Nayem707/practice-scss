import { useEffect, type RefObject } from 'react';

/** Calls `onOutsideClick` for pointer presses outside `ref`. Pass a stable callback. */
export function useClickOutside(
  ref: RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  enabled = true,
): void {
  useEffect(() => {
    if (!enabled) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) onOutsideClick();
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [ref, onOutsideClick, enabled]);
}
