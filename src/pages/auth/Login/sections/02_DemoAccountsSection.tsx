import { Alert } from '@/components/ui/Alert';
import { DEMO_ACCOUNTS, DEMO_PASSWORD, ROLE_LABELS } from '@/config/constants';
import styles from '../style/demo.section.module.scss';
import type { LoginFormState } from '../types/login.type';

interface DemoAccountsSectionProps {
  onFill: LoginFormState['fillDemoAccount'];
}

const DemoAccountsSection = ({ onFill }: DemoAccountsSectionProps) => {
  return (
    <Alert variant="info" title="Demo accounts">
      <p>
        Password for all: <code>{DEMO_PASSWORD}</code>
      </p>
      <ul className={styles.demoSection__list}>
        {DEMO_ACCOUNTS.map(({ email, role }) => (
          <li key={email} className={styles.demoSection__item}>
            <span>
              {ROLE_LABELS[role]}: {email}
            </span>
            <button
              type="button"
              className={styles.demoSection__fillButton}
              aria-label={`Fill in ${ROLE_LABELS[role]} demo account`}
              onClick={() => onFill(email)}
            >
              Fill in
            </button>
          </li>
        ))}
      </ul>
    </Alert>
  );
};

export default DemoAccountsSection;
