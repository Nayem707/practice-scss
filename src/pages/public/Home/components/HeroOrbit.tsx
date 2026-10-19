import { CircleCheck } from 'lucide-react';
import { cn } from '@/utils/cn';
import styles from '../style/hero.orbit.module.scss';

const SHAPES = ['cube', 'triangle', 'donut', 'pill'] as const;
const BAR_COUNT = 4;
const BARS = Array.from({ length: BAR_COUNT }, (_, index) => index);

/** Decorative orbital illustration for the hero (hidden from assistive tech). */
const HeroOrbit = () => (
  <div className={styles.orbit} aria-hidden="true">
    <div className={styles.orbit__glow} />

    <div className={cn(styles.orbit__ring, styles['orbit__ring--outer'])}>
      <span className={cn(styles.orbit__planet, styles['orbit__planet--small'])} />
    </div>
    <div className={cn(styles.orbit__ring, styles['orbit__ring--middle'])}>
      <span className={cn(styles.orbit__planet, styles['orbit__planet--violet'])} />
    </div>
    <div className={cn(styles.orbit__ring, styles['orbit__ring--inner'])}>
      <span className={styles.orbit__planet} />
    </div>

    <div className={styles.orbit__core}>
      <div className={styles.orbit__coreSphere} />
    </div>

    {SHAPES.map((shape) => (
      <span key={shape} className={cn(styles.orbit__shape, styles[`orbit__shape--${shape}`])} />
    ))}

    <div className={styles.orbit__card}>
      <CircleCheck className={styles.orbit__cardIcon} />
      <span className={styles.orbit__cardText}>
        <span className={styles.orbit__cardTitle}>Build passed</span>
        <span className={styles.orbit__cardMeta}>main · 0.7s</span>
      </span>
      <span className={styles.orbit__bars}>
        {BARS.map((index) => (
          <span key={index} className={styles.orbit__bar} />
        ))}
      </span>
    </div>

    <div className={styles.orbit__chip}>
      Lighthouse <span className={styles.orbit__chipValue}>100</span>
    </div>
  </div>
);

export default HeroOrbit;
