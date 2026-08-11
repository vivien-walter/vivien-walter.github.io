import { useLocation } from 'react-router-dom';

import { getLanguageFromPathname } from '@/app/routing/navigation';

import Content from './_components/content';
import NotFoundHero from './_components/not-found-hero';

export default function NotFoundPage() {
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);

  return (
    <article className="overflow-hidden" aria-labelledby="page-title">
      <NotFoundHero language={language} />

      <Content language={language} />
    </article>
  );
}
