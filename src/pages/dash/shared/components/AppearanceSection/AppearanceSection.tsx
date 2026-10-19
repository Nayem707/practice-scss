import { Moon, Sun, type LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Theme } from '@/types';
import { cn } from '@/utils/cn';
import styles from './AppearanceSection.module.scss';

const THEME_OPTIONS: readonly { value: Theme; label: string; icon: LucideIcon }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
];

export interface AppearanceSectionProps {
  theme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export function AppearanceSection({ theme, onThemeChange }: AppearanceSectionProps) {
  return (
    <Card title="Appearance">
      <fieldset className={styles.appearanceSection__fieldset}>
        <legend className={styles.appearanceSection__legend}>Theme</legend>
        <div className={styles.appearanceSection__options}>
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
            <label
              key={value}
              className={cn(
                styles.appearanceSection__option,
                theme === value && styles['appearanceSection__option--selected'],
              )}
            >
              <input
                type="radio"
                name="theme"
                value={value}
                checked={theme === value}
                onChange={() => onThemeChange(value)}
                className={styles.appearanceSection__radio}
              />
              <Icon className={styles.appearanceSection__icon} aria-hidden="true" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>
    </Card>
  );
}
