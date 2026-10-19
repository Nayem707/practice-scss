import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import styles from './ThemeToggle.module.scss';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      variant="ghost"
      iconOnly
      icon={theme === 'dark' ? <Sun /> : <Moon />}
      aria-label={`Switch to ${nextTheme} theme`}
      title={`Switch to ${nextTheme} theme`}
      onClick={toggleTheme}
      className={styles.themeToggle}
    />
  );
}
