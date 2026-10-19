import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Card.module.scss';

type CardElement = 'section' | 'article' | 'div';
type CardPadding = 'none' | 'md' | 'lg';

export interface CardProps {
  /** Convenience heading rendered in the default header. Ignored when `header` is set. */
  title?: string;
  /** Actions rendered next to `title` in the default header. */
  actions?: ReactNode;
  /** Fully custom header slot. */
  header?: ReactNode;
  footer?: ReactNode;
  padding?: CardPadding;
  as?: CardElement;
  className?: string;
  children: ReactNode;
}

export function Card({
  title,
  actions,
  header,
  footer,
  padding = 'md',
  as: Element = 'section',
  className,
  children,
}: CardProps) {
  const hasDefaultHeader = !header && (title || actions);

  return (
    <Element className={cn(styles.card, className)}>
      {header && <header className={styles.card__header}>{header}</header>}
      {hasDefaultHeader && (
        <header className={styles.card__header}>
          {title && <h2 className={styles.card__title}>{title}</h2>}
          {actions && <div className={styles.card__actions}>{actions}</div>}
        </header>
      )}
      <div className={cn(styles.card__body, styles[`card__body--padding-${padding}`])}>
        {children}
      </div>
      {footer && <footer className={styles.card__footer}>{footer}</footer>}
    </Element>
  );
}
