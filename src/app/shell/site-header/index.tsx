import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { curriculumVitaeDocuments } from '@/content/common/documents';
import { siteIdentity } from '@/content/common/site';

import { getLanguageFromPathname, getPageIdFromPathname, getPageRoute } from '../../routing/navigation';
import LanguageSwitcher from '../language-switcher';
import DesktopNavigation from './desktop-navigation';
import MobileNavigation from './mobile-navigation';

export default function SiteHeader() {
  /* Check the location on the website */
  const location = useLocation();

  /* Fetch all data for the translation */
  const { t } = useTranslation();
  const currentLanguage = getLanguageFromPathname(location.pathname);

  /* Fetch the resume document for download */
  const curriculumVitae = curriculumVitaeDocuments[currentLanguage];

  /* Fetch the page */
  const currentPageId = getPageIdFromPathname(location.pathname);
  const isHomePage = currentPageId === 'home';

  /* Fetch the identity of the website */
  const { name: siteName, shortName: shortSiteName } = siteIdentity;

  return (
    <header className="border-border bg-brand-background/95 sticky top-0 z-40 border-b supports-[backdrop-filter]:backdrop-blur-md">
      <div className="px-page flex min-h-20 w-full items-stretch gap-3 lg:gap-5 2xl:gap-8">
        <Link
          to={getPageRoute('home', currentLanguage)}
          aria-current={isHomePage ? 'page' : undefined}
          className="text-brand-ink ease-standard hover:text-brand-primary focus-visible:ring-ring/50 focus-visible:ring-offset-background relative flex min-w-0 flex-1 items-center self-stretch py-3 no-underline transition-colors duration-150 focus-visible:rounded-sm focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none lg:flex-none lg:shrink-0"
        >
          <span className="grid min-w-0 gap-1 lg:hidden">
            <span className="text-xl leading-none font-bold tracking-[-0.035em]">{shortSiteName}</span>

            <span className="text-brand-ink truncate text-xs leading-tight font-medium tracking-[-0.01em]">{siteName}</span>
          </span>

          <span className="hidden truncate text-[clamp(1.25rem,1rem+0.8vw,1.875rem)] leading-none font-bold tracking-[-0.035em] lg:block">
            {siteName}
          </span>

          {isHomePage ? <span aria-hidden="true" className="bg-brand-primary absolute bottom-[-1px] left-0 h-1 w-12" /> : null}
        </Link>

        <DesktopNavigation currentLanguage={currentLanguage} currentPageId={currentPageId} />

        <div className="flex shrink-0 items-center justify-end gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <Button
            asChild
            className="bg-brand-primary text-primary-foreground shadow-subtle hidden h-12 rounded-sm px-5 text-base font-medium lg:inline-flex"
          >
            <a href={curriculumVitae.href} download={curriculumVitae.downloadName}>
              <DownloadSimpleIcon aria-hidden="true" size={20} weight="bold" />

              <span>
                {t('navigation.desktop.cvLabel', {
                  lng: currentLanguage,
                })}
              </span>
            </a>
          </Button>

          <div className="lg:hidden">
            <MobileNavigation siteName={siteName} shortSiteName={shortSiteName} currentLanguage={currentLanguage} currentPageId={currentPageId} />
          </div>
        </div>
      </div>
    </header>
  );
}
