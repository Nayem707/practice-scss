import { Card } from '@/components/ui/Card';
import { COMPANY_VALUES } from '../mock/aboutContent';
import sectionStyles from '../style/about.section.module.scss';
import styles from '../style/values.section.module.scss';

const ValuesSection = () => {
  return (
    <section aria-labelledby="values-heading">
      <h2 id="values-heading" className={sectionStyles.section__title}>
        Our values
      </h2>
      <ul className={styles.valuesSection__grid}>
        {COMPANY_VALUES.map((value) => (
          <li key={value.title}>
            <Card as="article" title={value.title} className={styles.valuesSection__card}>
              <p className={styles.valuesSection__text}>{value.description}</p>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ValuesSection;
