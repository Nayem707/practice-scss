import { LOGIN_HEADER } from '../mock/loginContent';
import styles from '../style/header.section.module.scss';

const HeaderSection = () => {
  return (
    <header className={styles.headerSection}>
      <h1 className={styles.headerSection__title}>{LOGIN_HEADER.title}</h1>
      <p className={styles.headerSection__subtitle}>{LOGIN_HEADER.subtitle}</p>
    </header>
  );
};

export default HeaderSection;
