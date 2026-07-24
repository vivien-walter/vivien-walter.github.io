import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import { siteIdentity } from '@/content/common/site';

import { getLanguageFromPathname, getNavigationItemFromPathname } from '../routing/navigation';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';

function AppShell() {
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const mainRef = useRef<HTMLElement>(null);

  const previousPathnameRef = useRef(location.pathname);

  const currentLanguage = getLanguageFromPathname(location.pathname);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;

    if (i18n.resolvedLanguage !== currentLanguage) {
      void i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  useEffect(() => {
    const animationFrameId = window.requestAnimationFrame(() => {
      const renderedPageTitle = document.getElementById('page-title')?.textContent?.trim();

      const navigationItem = getNavigationItemFromPathname(location.pathname);

      const fallbackPageTitle = t(navigationItem?.titleKey ?? 'errors.pageNotFound', {
        lng: currentLanguage,
      });

      const pageTitle = renderedPageTitle || fallbackPageTitle;

      document.title = `${pageTitle} | ${siteIdentity.name}`;
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [currentLanguage, location.pathname, t]);

  useEffect(() => {
    const pathnameChanged = previousPathnameRef.current !== location.pathname;

    previousPathnameRef.current = location.pathname;

    if (!pathnameChanged) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    mainRef.current?.focus({
      preventScroll: true,
    });
  }, [location.pathname]);

  return (
    <div className="bg-background text-foreground relative flex min-h-screen min-h-svh flex-col">
      <a
        className={[
          'fixed top-3 left-3 z-[100]',
          '-translate-y-[calc(100%+2rem)]',
          'border-border-strong rounded-md border',
          'bg-heading px-4 py-3',
          'text-primary-foreground text-sm font-semibold no-underline',
          'shadow-elevated ease-standard transition-transform duration-150',
          'focus:text-primary-foreground focus:translate-y-0',
          'focus-visible:ring-[3px] focus-visible:outline-none',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          'focus-visible:ring-offset-background',
        ].join(' ')}
        href="#main-content"
      >
        {t('accessibility.skipToContent', {
          lng: currentLanguage,
        })}
      </a>

      <SiteHeader />

      <main ref={mainRef} id="main-content" tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}

export default AppShell;
