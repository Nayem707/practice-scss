import { forwardRef, useId, type TextareaHTMLAttributes } from 'react';
import { FormField, getDescribedBy } from '../FormField';
import { cn } from '@/utils/cn';
import styles from './Textarea.module.scss';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  hideLabel?: boolean;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hideLabel, error, helperText, containerClassName, className, id, required, ...rest },
  ref,
) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <FormField
      id={textareaId}
      label={label}
      hideLabel={hideLabel}
      required={required}
      error={error}
      helperText={helperText}
      className={containerClassName}
    >
      <textarea
        ref={ref}
        id={textareaId}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={getDescribedBy(textareaId, { error, helperText })}
        className={cn(styles.textarea, error && styles['textarea--invalid'], className)}
        {...rest}
      />
    </FormField>
  );
});
