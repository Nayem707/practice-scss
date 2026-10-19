import { useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DEMO_PASSWORD } from '@/config/constants';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from '@/hooks/useForm';
import { getPostAuthRedirect } from '@/routes/utils/access';
import { REDIRECT_PARAM } from '@/routes/constants/paths';
import type { FormErrors, LoginCredentials } from '@/types';
import { validateEmail } from '@/utils/validation';

const INITIAL_VALUES: LoginCredentials = { email: '', password: '' };

function validate(values: LoginCredentials): FormErrors<LoginCredentials> {
  return {
    email: validateEmail(values.email),
    password: values.password ? undefined : 'Password is required.',
  };
}

export function useLoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate,
    onSubmit: async (values) => {
      const user = await login(values);
      await navigate(getPostAuthRedirect(searchParams.get(REDIRECT_PARAM), user.role), {
        replace: true,
      });
    },
  });

  const { setValues } = form;
  const fillDemoAccount = useCallback(
    (email: string) => setValues({ email, password: DEMO_PASSWORD }),
    [setValues],
  );

  return { ...form, fillDemoAccount };
}
