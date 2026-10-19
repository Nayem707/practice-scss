import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/constants/paths';
import { LOGIN_FOOTER } from '../mock/loginContent';
import styles from '../style/footer.section.module.scss';

const FooterSection = () => {
  // Keep ?redirect= when switching between login and sign-up.
  const { search } = useLocation();

  return (
    <p className={styles.footerSection}>
      {LOGIN_FOOTER.prompt}{' '}
      <Link to={{ pathname: ROUTES.AUTH.SIGNUP, search }}>{LOGIN_FOOTER.linkLabel}</Link>
    </p>
  );
};

export default FooterSection;
