import { cn } from '@/utils/cn';
import styles from './Button.module.scss';
import type { ButtonStyleOptions } from './Button.types';

/** Shared by Button and ButtonLink so both render identical visuals. */
export function getButtonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  iconOnly = false,
}: ButtonStyleOptions): string {
  return cn(
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth && styles['button--full-width'],
    iconOnly && styles['button--icon-only'],
  );
}
