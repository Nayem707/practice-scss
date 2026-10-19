import { Loader } from '../Loader';
import { cn } from '@/utils/cn';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';
import { getButtonClassName } from './getButtonClassName';

export function Button({
  variant,
  size = 'md',
  fullWidth,
  isLoading = false,
  iconOnly,
  icon,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  type = 'button',
  ...rest
}: ButtonProps) {
  const leading = isLoading ? <Loader size="sm" label="Loading" inheritColor /> : leftIcon;

  return (
    <button
      type={type}
      className={cn(getButtonClassName({ variant, size, fullWidth, iconOnly }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...rest}
    >
      {iconOnly ? (
        <span className={styles.button__icon} aria-hidden="true">
          {isLoading ? leading : icon}
        </span>
      ) : (
        <>
          {leading && (
            <span className={styles.button__icon} aria-hidden={!isLoading}>
              {leading}
            </span>
          )}
          <span>{children}</span>
          {rightIcon && (
            <span className={styles.button__icon} aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}
