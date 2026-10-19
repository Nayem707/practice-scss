import { useEffect, type RefObject } from 'react';
import { MEDIA_QUERIES } from '@/config/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const POINTER_X_VAR = '--pointer-x';
const POINTER_Y_VAR = '--pointer-y';

/**
 * Writes the pointer position (normalised to -1…1 from the element's center) to the
 * `--pointer-x` / `--pointer-y` custom properties on `ref`. CSS turns those into
 * parallax offsets, so React never re-renders on pointer move.
 *
 * At most one style write per frame, and only while the pointer moves: there is no
 * persistent animation loop. Disabled for reduced motion and for touch/coarse pointers.
 */
export function usePointerParallax(ref: RefObject<HTMLElement | null>): void {
  const prefersReducedMotion = useMediaQuery(MEDIA_QUERIES.REDUCED_MOTION);
  const hasFinePointer = useMediaQuery(MEDIA_QUERIES.FINE_POINTER);
  const enabled = hasFinePointer && !prefersReducedMotion;

  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    let frame = 0;
    let latest: PointerEvent | null = null;

    const apply = () => {
      frame = 0;
      if (!latest) return;
      const rect = element.getBoundingClientRect();
      const x = ((latest.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((latest.clientY - rect.top) / rect.height) * 2 - 1;
      element.style.setProperty(POINTER_X_VAR, x.toFixed(3));
      element.style.setProperty(POINTER_Y_VAR, y.toFixed(3));
    };

    const handleMove = (event: PointerEvent) => {
      latest = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const reset = () => {
      latest = null;
      cancelAnimationFrame(frame);
      frame = 0;
      element.style.removeProperty(POINTER_X_VAR);
      element.style.removeProperty(POINTER_Y_VAR);
    };

    element.addEventListener('pointermove', handleMove, { passive: true });
    element.addEventListener('pointerleave', reset);

    return () => {
      element.removeEventListener('pointermove', handleMove);
      element.removeEventListener('pointerleave', reset);
      reset();
    };
  }, [ref, enabled]);
}
