import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';
import PageDivider from '@/components/page-divider';
import { getHomeContent } from '@/content/home/home';

import FeaturedWorksSection from './_components/featured-works-section';
import HomeFollowSection from './_components/home-follow-section';
import HomeHero from './_components/home-hero';
import HomeStatementSection from './_components/home-statement-section';
import ResearchAxesSection from './_components/research-axes-section';

export default function HomePage() {
  /* Fetch all data for the translation */
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const content = getHomeContent(language);

  return (
    <div className="overflow-hidden">
      <HomeHero language={language} />

      <FeaturedWorksSection content={content.featuredWorks} language={language} />

      <HomeStatementSection content={content.statement} language={language} />

      <ResearchAxesSection content={content.researchAxes} language={language} />

      <PageDivider />

      <HomeFollowSection content={content.follow} language={language} />
    </div>
  );
}
