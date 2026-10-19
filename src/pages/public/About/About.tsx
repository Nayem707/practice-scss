import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import IntroSection from './sections/01_IntroSection';
import ValuesSection from './sections/02_ValuesSection';
import sectionStyles from './style/about.section.module.scss';

export default function About() {
  useDocumentTitle('About');

  return (
    <div className={sectionStyles.sections}>
      <IntroSection />
      <ValuesSection />
    </div>
  );
}
