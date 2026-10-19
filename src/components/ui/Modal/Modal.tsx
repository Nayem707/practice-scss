import { useId, useRef, type MouseEvent, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { Button } from '../Button';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useEscapeKey } from '@/hooks/useEscapeKey';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import type { Size } from '@/types';
import { cn } from '@/utils/cn';
import styles from './Modal.module.scss';

export interface ModalProps {
  isOpen: boolean;
  /** Must be referentially stable (e.g. from useCallback / useToggle). */
  onClose: () => void;
  title: string;
  description?: string;
  footer?: ReactNode;
  size?: Size;
  closeOnOverlayClick?: boolean;
  children?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEscapeKey(onClose, isOpen);
  useFocusTrap(dialogRef, isOpen);
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className={styles.modal} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(styles.modal__dialog, styles[`modal__dialog--${size}`])}
      >
        <header className={styles.modal__header}>
          <div>
            <h2 id={titleId} className={styles.modal__title}>
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className={styles.modal__description}>
                {description}
              </p>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconOnly
            icon={<X />}
            aria-label="Close dialog"
            onClick={onClose}
          />
        </header>
        {children && <div className={styles.modal__body}>{children}</div>}
        {footer && <footer className={styles.modal__footer}>{footer}</footer>}
      </div>
    </div>,
    document.body,
  );
}
