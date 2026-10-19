import { Mail } from 'lucide-react';
import { APP_CONFIG } from '@/config/app';
import { CONTACT_INTRO } from '../mock/contactContent';
import styles from '../style/intro.section.module.scss';

const IntroSection = () => {
  return (
    <section className={styles.introSection}>
      <h1 className={styles.introSection__title}>{CONTACT_INTRO.title}</h1>
      <p className={styles.introSection__lead}>{CONTACT_INTRO.lead}</p>
      <a href={`mailto:${APP_CONFIG.supportEmail}`} className={styles.introSection__email}>
        <Mail className={styles.introSection__emailIcon} aria-hidden="true" />
        {APP_CONFIG.supportEmail}
      </a>
    </section>
  );
};

export default IntroSection;
