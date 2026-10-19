import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/constants/paths';
import { SIGNUP_FOOTER } from '../mock/signupContent';
import styles from '../style/footer.section.module.scss';

const FooterSection = () => {
  // Keep ?redirect= when switching between sign-up and login.
  const { search } = useLocation();

  return (
    <p className={styles.footerSection}>
      {SIGNUP_FOOTER.prompt}{' '}
      <Link to={{ pathname: ROUTES.AUTH.LOGIN, search }}>{SIGNUP_FOOTER.linkLabel}</Link>
    </p>
  );
};

export default FooterSection;
