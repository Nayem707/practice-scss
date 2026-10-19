import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '../Breadcrumbs';
import { SIDEBAR_ID } from '../Sidebar';
import { UserMenu } from '../UserMenu';
import styles from './Topbar.module.scss';

export interface TopbarProps {
  showMenuButton: boolean;
  isSidebarOpen: boolean;
  onMenuClick: () => void;
}

export function Topbar({ showMenuButton, isSidebarOpen, onMenuClick }: TopbarProps) {
  return (
    <header className={styles.topbar}>
      <div className={styles.topbar__start}>
        {showMenuButton && (
          <Button
            variant="ghost"
            iconOnly
            icon={<Menu />}
            aria-label="Open navigation"
            aria-expanded={isSidebarOpen}
            aria-controls={SIDEBAR_ID}
            onClick={onMenuClick}
          />
        )}
        <Breadcrumbs />
      </div>
      <div className={styles.topbar__end}>
        <ThemeToggle />
        <UserMenu />
      </div>
    </header>
  );
}
