import { forwardRef, useId, type InputHTMLAttributes } from 'react';
import { FormField, getDescribedBy } from '../FormField';
import { cn } from '@/utils/cn';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hideLabel?: boolean;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hideLabel, error, helperText, containerClassName, className, id, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <FormField
      id={inputId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      error={error}
      helperText={helperText}
      className={containerClassName}
    >
      <input
        ref={ref}
        id={inputId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={getDescribedBy(inputId, { error, helperText })}
        className={cn(styles.input, error && styles['input--invalid'], className)}
        {...rest}
      />
    </FormField>
  );
});
