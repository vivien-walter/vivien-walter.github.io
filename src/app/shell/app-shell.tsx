import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

import { siteIdentity } from '@/content/common/site';

import { getLanguageFromPathname, getNavigationItemFromPathname } from '../routing/navigation';
import SiteFooter from './site-footer';
import SiteHeader from './site-header';

export default function AppShell() {
  const mainRef = useRef<HTMLElement>(null);

  /* Check the location on the website */
  const location = useLocation();

  /* Save the previous ref */
  const previousPathnameRef = useRef(location.pathname);

  /* Fetch all data for the translation */
  const { i18n, t } = useTranslation();
  const currentLanguage = getLanguageFromPathname(location.pathname);

  /* Synchronize the language */
  useEffect(() => {
    /* Synchronize the document language with the language segment of the route */
    document.documentElement.lang = currentLanguage;

    /* Synchronize i18next only when its active language differs from the route */
    if (i18n.resolvedLanguage !== currentLanguage) {
      void i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  /* Update the title of the document */
  useEffect(() => {
    /* Wait for the routed page to finish rendering before reading its title */
    const animationFrameId = window.requestAnimationFrame(() => {
      /* Prefer the title rendered by the current page, especially for detail routes */
      const renderedPageTitle = document.getElementById('page-title')?.textContent?.trim();

      /* Retrieve the navigation entry associated with the current route */
      const navigationItem = getNavigationItemFromPathname(location.pathname);

      /* Provide a localized fallback for pages without a rendered title */
      const fallbackPageTitle = t(navigationItem?.titleKey ?? 'errors.pageNotFound', {
        lng: currentLanguage,
      });
      const pageTitle = renderedPageTitle || fallbackPageTitle;

      /* Combine the page title with the non-localized website name */
      document.title = `${pageTitle} | ${siteIdentity.name}`;
    });

    /* Cancel a pending update when the route or language changes again */
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [currentLanguage, location.pathname, t]);

  /* Change the screen position on page change */
  useEffect(() => {
    /* Detect whether the pathname changed after the initial render */
    const pathnameChanged = previousPathnameRef.current !== location.pathname;

    /* Store the current pathname for the next navigation */
    previousPathnameRef.current = location.pathname;

    /* Do not reset scroll or focus on the initial render */
    if (!pathnameChanged) {
      return;
    }

    /* Display the newly rendered page from its top */
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    /* Move focus to the main content without changing the restored scroll position */
    mainRef.current?.focus({
      preventScroll: true,
    });
  }, [location.pathname]);

  return (
    <div className="bg-background text-foreground flex min-h-screen min-h-svh flex-col">
      <SiteHeader />
      <main ref={mainRef} id="main-content" tabIndex={-1} className="min-w-0 flex-1 focus:outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
