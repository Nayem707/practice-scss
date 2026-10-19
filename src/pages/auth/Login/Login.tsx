import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { useLoginForm } from './hooks/useLoginForm';
import HeaderSection from './sections/01_HeaderSection';
import DemoAccountsSection from './sections/02_DemoAccountsSection';
import FormSection from './sections/03_FormSection';
import FooterSection from './sections/04_FooterSection';
import sectionStyles from './style/login.section.module.scss';

export default function Login() {
  useDocumentTitle('Log in');
  const form = useLoginForm();

  return (
    <div className={sectionStyles.sections}>
      <HeaderSection />
      <DemoAccountsSection onFill={form.fillDemoAccount} />
      <FormSection form={form} />
      <FooterSection />
    </div>
  );
}
