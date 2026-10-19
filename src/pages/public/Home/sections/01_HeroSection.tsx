import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';
import { cn } from '@/utils/cn';
import HeroBackdrop from '../components/HeroBackdrop';
import HeroOrbit from '../components/HeroOrbit';
import { usePointerParallax } from '../hooks/usePointerParallax';
import { HERO_CONTENT } from '../mock/homeContent';
import styles from '../style/hero.section.module.scss';
import sectionStyles from '../style/home.section.module.scss';

const TITLE_ID = 'hero-title';
const STACK_LABEL_ID = 'hero-stack-label';

const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  usePointerParallax(heroRef);

  const { eyebrow, titleLines, lead, primaryCta, secondaryCta, stackLabel, techs } = HERO_CONTENT;
  const lastLineIndex = titleLines.length - 1;

  return (
    <section ref={heroRef} className={styles.hero} aria-labelledby={TITLE_ID}>
      <HeroBackdrop />

      <div className={cn(sectionStyles.section, styles.hero__inner)}>
        <div className={styles.hero__content}>
          <p className={styles.hero__eyebrow}>
            <span className={styles.hero__pulse} aria-hidden="true" />
            {eyebrow}
          </p>

          <h1 id={TITLE_ID} className={styles.hero__title}>
            {titleLines.map((line, index) => (
              <span key={line} className={styles.hero__line}>
                <span className={styles.hero__lineText}>
                  {index === lastLineIndex ? (
                    <span className={styles.hero__highlight}>{line}</span>
                  ) : (
                    line
                  )}
                </span>
                {index < lastLineIndex && ' '}
              </span>
            ))}
          </h1>

          <p className={styles.hero__lead}>{lead}</p>

          <div className={styles.hero__ctas}>
            <ButtonLink to={primaryCta.to} size="lg" rightIcon={<ArrowRight />}>
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink to={secondaryCta.to} size="lg" variant="secondary">
              {secondaryCta.label}
            </ButtonLink>
          </div>

          <div className={styles.hero__stack}>
            <p id={STACK_LABEL_ID} className={styles.hero__stackLabel}>
              {stackLabel}
            </p>
            <ul className={styles.hero__techList} aria-labelledby={STACK_LABEL_ID}>
              {techs.map(({ label, icon: Icon }) => (
                <li key={label} className={styles.hero__techItem}>
                  <Icon aria-hidden="true" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HeroOrbit />
      </div>
    </section>
  );
};

export default HeroSection;
