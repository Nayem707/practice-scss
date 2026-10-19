import { useCallback, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react';
import { MEDIA_QUERIES, STORAGE_KEYS } from '@/config/constants';
import type { Theme, ThemeContextValue } from '@/types';
import { readStorage, writeStorage } from '@/utils';
import { ThemeContext } from './ThemeContext';

const THEME_TRANSITIONS_CLASS = 'has-theme-transitions';

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function getInitialTheme(): Theme {
  const stored = readStorage(STORAGE_KEYS.THEME, isTheme);
  if (stored) return stored;
  return window.matchMedia(MEDIA_QUERIES.PREFERS_DARK).matches ? 'dark' : 'light';
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Layout effect so the theme is applied before the first paint.
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    writeStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Enable color transitions only after the initial theme has painted, so page loads
  // don't animate from the default palette. Two frames guarantee a style recalc in between.
  useEffect(() => {
    let innerFrame = 0;
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => {
        document.documentElement.classList.add(THEME_TRANSITIONS_CLASS);
      });
    });
    return () => {
      cancelAnimationFrame(outerFrame);
      cancelAnimationFrame(innerFrame);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
