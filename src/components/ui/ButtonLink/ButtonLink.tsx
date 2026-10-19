import type { ReactNode } from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { getButtonClassName, type ButtonStyleOptions } from '../Button';
import { cn } from '@/utils/cn';
import styles from './ButtonLink.module.scss';

export interface ButtonLinkProps
  extends Omit<LinkProps, 'children'>, Omit<ButtonStyleOptions, 'iconOnly'> {
  children: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

/** A router link styled as a Button — use for navigation, not actions. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  children,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      className={cn(getButtonClassName({ variant, size, fullWidth }), styles.buttonLink, className)}
      {...rest}
    >
      {leftIcon && (
        <span className={styles.buttonLink__icon} aria-hidden="true">
          {leftIcon}
        </span>
      )}
      <span>{children}</span>
      {rightIcon && (
        <span className={styles.buttonLink__icon} aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </Link>
  );
}
