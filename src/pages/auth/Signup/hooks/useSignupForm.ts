import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { getPostAuthRedirect } from '@/routes/utils/access';
import { REDIRECT_PARAM } from '@/routes/constants/paths';
import type { FormErrors } from '@/types';
import { validateEmail, validateName, validatePassword } from '@/utils/validation';
import type { SignupFormValues } from '../types/signup.type';

const INITIAL_VALUES: SignupFormValues = { name: '', email: '', password: '', confirmPassword: '' };

function validate(values: SignupFormValues): FormErrors<SignupFormValues> {
  return {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
    confirmPassword:
      values.confirmPassword === values.password ? undefined : 'Passwords do not match.',
  };
}

export function useSignupForm() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  return useForm({
    initialValues: INITIAL_VALUES,
    validate,
    onSubmit: async ({ name, email, password }) => {
      const user = await signup({ name, email, password });
      await navigate(getPostAuthRedirect(searchParams.get(REDIRECT_PARAM), user.role), {
        replace: true,
      });
    },
  });
}
