import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './FormField.module.scss';
import { getFieldIds } from './getFieldIds';

export interface FormFieldProps {
  id: string;
  label: string;
  hideLabel?: boolean;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  children: ReactNode;
}

/** Label + control + helper/error text wrapper shared by form controls. */
export function FormField({
  id,
  label,
  hideLabel = false,
  required = false,
  error,
  helperText,
  className,
  children,
}: FormFieldProps) {
  const { helperId, errorId } = getFieldIds(id);

  return (
    <div className={cn(styles.formField, className)}>
      <label
        htmlFor={id}
        className={cn(styles.formField__label, hideLabel && styles['formField__label--hidden'])}
      >
        {label}
        {required && (
          <span className={styles.formField__required} aria-hidden="true">
            *
          </span>
        )}
      </label>
      {children}
      {helperText && (
        <p id={helperId} className={styles.formField__helper}>
          {helperText}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.formField__error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
