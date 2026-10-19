import { APP_CONFIG } from '@/config/app';
import { ABOUT_PARAGRAPHS } from '../mock/aboutContent';
import styles from '../style/intro.section.module.scss';

const IntroSection = () => {
  return (
    <section className={styles.introSection}>
      <h1 className={styles.introSection__title}>About {APP_CONFIG.name}</h1>
      {ABOUT_PARAGRAPHS.map((paragraph) => (
        <p key={paragraph} className={styles.introSection__paragraph}>
          {paragraph}
        </p>
      ))}
    </section>
  );
};

export default IntroSection;
