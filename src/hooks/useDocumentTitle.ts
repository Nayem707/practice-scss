import { useEffect } from 'react';
import { APP_CONFIG } from '@/config/app';

export function useDocumentTitle(title: string): void {
  useEffect(() => {
    document.title = `${title} | ${APP_CONFIG.name}`;
  }, [title]);
}
