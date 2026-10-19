import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { useToggle } from '@/hooks/useToggle';
import styles from './AccountSection.module.scss';

export interface AccountSectionProps {
  onLogout: () => void;
}

export function AccountSection({ onLogout }: AccountSectionProps) {
  const [isConfirmOpen, confirm] = useToggle(false);

  return (
    <Card title="Session">
      <div className={styles.accountSection__row}>
        <p className={styles.accountSection__text}>
          Sign out of this device. You can log back in at any time.
        </p>
        <Button variant="danger" leftIcon={<LogOut />} onClick={confirm.setOn}>
          Log out
        </Button>
      </div>

      <Modal
        isOpen={isConfirmOpen}
        onClose={confirm.setOff}
        title="Log out?"
        description="You'll need to sign in again to access the dashboard."
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={confirm.setOff}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onLogout}>
              Log out
            </Button>
          </>
        }
      />
    </Card>
  );
}
