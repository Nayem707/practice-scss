import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import IntroSection from './sections/01_IntroSection';
import FormSection from './sections/02_FormSection';
import sectionStyles from './style/contact.section.module.scss';

export default function Contact() {
  useDocumentTitle('Contact');

  return (
    <div className={sectionStyles.sections}>
      <IntroSection />
      <FormSection />
    </div>
  );
}
