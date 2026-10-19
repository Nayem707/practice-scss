import { SIGNUP_HEADER } from '../mock/signupContent';
import styles from '../style/header.section.module.scss';

const HeaderSection = () => {
  return (
    <header className={styles.headerSection}>
      <h1 className={styles.headerSection__title}>{SIGNUP_HEADER.title}</h1>
      <p className={styles.headerSection__subtitle}>{SIGNUP_HEADER.subtitle}</p>
    </header>
  );
};

export default HeaderSection;
