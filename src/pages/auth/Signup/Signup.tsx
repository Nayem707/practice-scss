import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import HeaderSection from './sections/01_HeaderSection';
import FormSection from './sections/02_FormSection';
import FooterSection from './sections/03_FooterSection';
import sectionStyles from './style/signup.section.module.scss';

export default function Signup() {
  useDocumentTitle('Sign up');

  return (
    <div className={sectionStyles.sections}>
      <HeaderSection />
      <FormSection />
      <FooterSection />
    </div>
  );
}
