import { useState } from 'react';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { useForm } from '@/hooks/useForm';
import type { FormErrors, ProfileUpdate, User } from '@/types';
import { validateEmail, validateName } from '@/utils/validation';
import styles from './ProfileSection.module.scss';

function validate(values: ProfileUpdate): FormErrors<ProfileUpdate> {
  return { name: validateName(values.name), email: validateEmail(values.email) };
}

export interface ProfileSectionProps {
  user: User;
  onSave: (update: ProfileUpdate) => Promise<void>;
}

export function ProfileSection({ user, onSave }: ProfileSectionProps) {
  const [isSaved, setIsSaved] = useState(false);
  const { values, errors, submitError, isSubmitting, handleChange, handleSubmit } = useForm({
    initialValues: { name: user.name, email: user.email },
    validate,
    onSubmit: async (update) => {
      setIsSaved(false);
      await onSave(update);
      setIsSaved(true);
    },
  });

  return (
    <Card title="Profile">
      <form className={styles.profileSection__form} onSubmit={handleSubmit} noValidate>
        {isSaved && <Alert variant="success">Profile updated.</Alert>}
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <div className={styles.profileSection__fields}>
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
        </div>
        <div className={styles.profileSection__actions}>
          <Button type="submit" isLoading={isSubmitting}>
            Save changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
