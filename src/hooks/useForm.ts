import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import type { FormErrors } from '@/types';
import { getErrorMessage, isValid } from '@/utils';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

/** Every field is a string; works with interfaces (unlike Record<string, string>). */
type StringFields<TValues> = { [Key in keyof TValues]: string };

interface SubmitHelpers {
  reset: () => void;
}

interface UseFormOptions<TValues extends StringFields<TValues>> {
  initialValues: TValues;
  validate: (values: TValues) => FormErrors<TValues>;
  onSubmit: (values: TValues, helpers: SubmitHelpers) => Promise<void>;
}

/** Controlled-form state with validation on submit and async submit error handling. */
export function useForm<TValues extends StringFields<TValues>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<TValues>) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors<TValues>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event: ChangeEvent<FieldElement>) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }, []);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setSubmitError(null);
  }, [initialValues]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (!isValid(nextErrors)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values, { reset });
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    values,
    setValues,
    errors,
    submitError,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  };
}
