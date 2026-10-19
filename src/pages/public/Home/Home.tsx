import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import HeroSection from './sections/01_HeroSection';
import FeaturesSection from './sections/02_FeaturesSection';

export default function Home() {
  useDocumentTitle('Home');

  return (
    <>
      <HeroSection />
      <FeaturesSection />
    </>
  );
}
