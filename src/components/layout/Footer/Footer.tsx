import { Link } from 'react-router-dom';
import { Logo } from '@/components/common/Logo';
import { APP_CONFIG } from '@/config/app';
import { FOOTER_LINKS } from '@/config/navigation';
import styles from './Footer.module.scss';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__brand}>
          <Logo />
          <p className={styles.footer__tagline}>{APP_CONFIG.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <ul className={styles.footer__links}>
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className={styles.footer__link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className={styles.footer__copyright}>
        © {currentYear} {APP_CONFIG.copyrightHolder}. All rights reserved.
      </p>
    </footer>
  );
}
