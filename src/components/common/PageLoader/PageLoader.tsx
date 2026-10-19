import { Loader } from '@/components/ui/Loader';
import { cn } from '@/utils/cn';
import styles from './PageLoader.module.scss';

export interface PageLoaderProps {
  label?: string;
  fullScreen?: boolean;
}

/** Centered spinner used as the Suspense fallback for lazy routes. */
export function PageLoader({ label = 'Loading page…', fullScreen = false }: PageLoaderProps) {
  return (
    <div className={cn(styles.pageLoader, fullScreen && styles['pageLoader--full-screen'])}>
      <Loader size="lg" label={label} />
    </div>
  );
}
