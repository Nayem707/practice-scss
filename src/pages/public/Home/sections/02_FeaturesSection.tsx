import { Card } from '@/components/ui/Card';
import { HOME_FEATURES } from '../mock/homeContent';
import styles from '../style/features.section.module.scss';
import sectionStyles from '../style/home.section.module.scss';

const FeaturesSection = () => {
  return (
    <section className={sectionStyles.section} aria-labelledby="features-heading">
      <h2 id="features-heading" className={sectionStyles.section__title}>
        Everything you need to start
      </h2>
      <ul className={styles.featuresSection__grid}>
        {HOME_FEATURES.map(({ title, description, icon: Icon }) => (
          <li key={title}>
            <Card as="article" className={styles.featuresSection__card}>
              <Icon className={styles.featuresSection__icon} aria-hidden="true" />
              <h3 className={styles.featuresSection__title}>{title}</h3>
              <p className={styles.featuresSection__text}>{description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FeaturesSection;
