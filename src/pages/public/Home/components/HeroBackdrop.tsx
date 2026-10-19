import { cn } from '@/utils/cn';
import styles from '../style/hero.backdrop.module.scss';

/** Keep in sync with the length of $particles in hero.backdrop.module.scss. */
const PARTICLE_COUNT = 16;
const PARTICLES = Array.from({ length: PARTICLE_COUNT }, (_, index) => index);

const AURORAS = ['indigo', 'cyan', 'violet'] as const;

/** Purely decorative background layers for the hero. */
const HeroBackdrop = () => (
  <div className={styles.backdrop} aria-hidden="true">
    <div className={styles.backdrop__grid} />
    {AURORAS.map((tone) => (
      <div
        key={tone}
        className={cn(styles.backdrop__aurora, styles[`backdrop__aurora--${tone}`])}
      />
    ))}
    <div className={styles.backdrop__particles}>
      {PARTICLES.map((index) => (
        <span key={index} className={styles.backdrop__particle} />
      ))}
    </div>
    <div className={styles.backdrop__vignette} />
    <div className={styles.backdrop__horizon} />
  </div>
);

export default HeroBackdrop;
