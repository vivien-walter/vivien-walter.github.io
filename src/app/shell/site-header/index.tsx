import { DownloadSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { siteIdentity } from '@/content/common/site';
import { cn } from '@/lib/utils';

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

  /* Fetch the page */
  const currentPageId = getPageIdFromPathname(location.pathname);
  const isHomePage = currentPageId === 'home';

  /* Fetch the identity of the website */
  const { name: siteName, shortName: shortSiteName } = siteIdentity;

  return (
    <header className={cn('sticky top-0 z-40', 'border-border border-b', 'bg-brand-background/95', 'supports-[backdrop-filter]:backdrop-blur-md')}>
      <div className={cn('flex min-h-20 w-full', 'px-page items-stretch gap-3', 'lg:gap-5 2xl:gap-8')}>
        <Link
          to={getPageRoute('home', currentLanguage)}
          aria-current={isHomePage ? 'page' : undefined}
          className={cn(
            'relative flex min-w-0 flex-1',
            'items-center self-stretch py-3',
            'text-brand-ink no-underline',
            'transition-colors duration-150',
            'ease-standard',
            'hover:text-brand-primary',
            'focus-visible:rounded-sm',
            'focus-visible:outline-none',
            'focus-visible:ring-[3px]',
            'focus-visible:ring-ring/50',
            'focus-visible:ring-offset-2',
            'focus-visible:ring-offset-background',
            'lg:flex-none lg:shrink-0',
          )}
        >
          <span className="grid min-w-0 gap-1 lg:hidden">
            <span className={cn('text-xl font-bold', 'leading-none', 'tracking-[-0.035em]')}>{shortSiteName}</span>

            <span className={cn('truncate text-xs', 'leading-tight font-medium', 'tracking-[-0.01em]', 'text-brand-ink')}>{siteName}</span>
          </span>

          <span
            className={cn('hidden truncate lg:block', 'text-[clamp(1.25rem,1rem+0.8vw,1.875rem)]', 'leading-none font-bold', 'tracking-[-0.035em]')}
          >
            {siteName}
          </span>

          {isHomePage ? <span aria-hidden="true" className={cn('absolute bottom-[-1px]', 'left-0 h-1 w-12', 'bg-brand-primary')} /> : null}
        </Link>

        <DesktopNavigation currentLanguage={currentLanguage} currentPageId={currentPageId} />

        <div className={cn('flex shrink-0', 'items-center justify-end', 'gap-2')}>
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>
          <Button
            type="button"
            disabled
            className={cn(
              'hidden h-12',
              'rounded-sm px-5',
              'bg-brand-primary',
              'text-base font-medium',
              'text-primary-foreground',
              'shadow-subtle',
              'disabled:cursor-not-allowed',
              'disabled:opacity-100',
              'lg:inline-flex',
            )}
          >
            <DownloadSimpleIcon aria-hidden="true" size={20} weight="bold" />
            <span>
              {t('navigation.mobile.cvLabel', {
                lng: currentLanguage,
              })}
            </span>
          </Button>

          <div className="lg:hidden">
            <MobileNavigation siteName={siteName} shortSiteName={shortSiteName} currentLanguage={currentLanguage} currentPageId={currentPageId} />
          </div>
        </div>
      </div>
    </header>
  );
}
