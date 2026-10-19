import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PASSWORD_MIN_LENGTH } from '@/config/constants';
import { useSignupForm } from '../hooks/useSignupForm';
import { SIGNUP_FORM } from '../mock/signupContent';
import styles from '../style/form.section.module.scss';

const FormSection = () => {
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } = useSignupForm();

  return (
    <form className={styles.formSection} onSubmit={handleSubmit} noValidate>
      {submitError && <Alert variant="danger">{submitError}</Alert>}
      <Input
        label="Full name"
        name="name"
        autoComplete="name"
        required
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
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
        autoComplete="new-password"
        required
        helperText={`At least ${PASSWORD_MIN_LENGTH} characters.`}
        value={values.password}
        error={errors.password}
        onChange={handleChange}
      />
      <Input
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        value={values.confirmPassword}
        error={errors.confirmPassword}
        onChange={handleChange}
      />
      <Button type="submit" fullWidth isLoading={isSubmitting}>
        {SIGNUP_FORM.submitLabel}
      </Button>
    </form>
  );
};

export default FormSection;
