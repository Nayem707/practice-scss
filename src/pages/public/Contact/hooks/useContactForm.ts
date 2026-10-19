import { useState } from 'react';
import { useForm } from '@/hooks/useForm';
import { contactService } from '@/services/contactService';
import type { ContactFormValues, FormErrors } from '@/types';
import { validateEmail, validateMessage, validateName } from '@/utils/validation';

const INITIAL_VALUES: ContactFormValues = { name: '', email: '', message: '' };

function validate(values: ContactFormValues): FormErrors<ContactFormValues> {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    message: validateMessage(values.message),
  };
}

export function useContactForm() {
  const [isSent, setIsSent] = useState(false);

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate,
    onSubmit: async (values, { reset }) => {
      setIsSent(false);
      await contactService.sendMessage(values);
      setIsSent(true);
      reset();
    },
  });

  return { ...form, isSent };
}
