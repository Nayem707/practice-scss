import { Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { PageLoader } from '@/components/common/PageLoader';

/** Wraps a lazily-loaded layout in a full-screen Suspense boundary. */
export function renderLazyLayout(Component: LazyExoticComponent<ComponentType>) {
  return (
    <Suspense fallback={<PageLoader fullScreen />}>
      <Component />
    </Suspense>
  );
}
