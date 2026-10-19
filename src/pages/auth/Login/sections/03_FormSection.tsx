import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LOGIN_FORM } from '../mock/loginContent';
import styles from '../style/form.section.module.scss';
import type { LoginFormState } from '../types/login.type';

interface FormSectionProps {
  form: LoginFormState;
}

const FormSection = ({ form }: FormSectionProps) => {
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } = form;

  return (
    <form className={styles.formSection} onSubmit={handleSubmit} noValidate>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <Input
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={values.password}
        error={errors.password}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {LOGIN_FORM.submitLabel}
      </Button>
    </form>
  );
};

export default FormSection;
