import type { ReactNode } from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ROLE_LABELS } from '@/config/constants';
import { useAuth } from '@/hooks/useAuth';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useTheme } from '@/hooks/useTheme';
import type { UserRole } from '@/types';
import { cn } from '@/utils/cn';
import { AccountSection } from './components/AccountSection';
import { AppearanceSection } from './components/AppearanceSection';
import { ProfileSection } from './components/ProfileSection';
import styles from './DashSettingsShell.module.scss';

export interface DashSettingsShellProps {
  role: UserRole;
  description: string;
  /** Use it to set `--dash-accent` and any role-specific layout tweaks. */
  className?: string;
  /** Role-specific sections, rendered between Appearance and Account. */
  children?: ReactNode;
}

/** Settings page for any role: profile, appearance, role-specific sections, and account. */
export function DashSettingsShell({
  role,
  description,
  className,
  children,
}: DashSettingsShellProps) {
  useDocumentTitle(`${ROLE_LABELS[role]} settings`);
  const { user, updateProfile, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn(styles.dashSettingsShell, className)}>
      <PageHeader title="Settings" description={description} />
      <div className={styles.dashSettingsShell__sections}>
        {user && <ProfileSection user={user} onSave={updateProfile} />}
        <AppearanceSection theme={theme} onThemeChange={setTheme} />
        {children}
        <AccountSection onLogout={logout} />
      </div>
    </div>
  );
}
