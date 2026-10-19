import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useContactForm } from '../hooks/useContactForm';
import { CONTACT_FORM } from '../mock/contactContent';
import styles from '../style/form.section.module.scss';

const FormSection = () => {
  const { values, errors, submitError, isSubmitting, isSent, handleChange, handleSubmit } =
    useContactForm();

  return (
    <Card title={CONTACT_FORM.title} padding="lg">
      <form className={styles.formSection__form} onSubmit={handleSubmit} noValidate>
        {isSent && <Alert variant="success">{CONTACT_FORM.successMessage}</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <Input
          label="Name"
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
        <Textarea
          label="Message"
          name="message"
          required
          value={values.message}
          error={errors.message}
          onChange={handleChange}
        />
        <Button type="submit" isLoading={isSubmitting}>
          {CONTACT_FORM.submitLabel}
        </Button>
      </form>
    </Card>
  );
};

export default FormSection;
