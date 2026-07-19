import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import { getProject, getSoftware } from "../content/site-content";
import {
  getLanguageFromPathname,
  getNavigationItemFromPathname,
  getRouteMatchFromPathname,
  type SupportedLanguage,
} from "../navigation";
import SiteHeader from "./site-header";

const fallbackPageTitles: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly project: string;
      readonly software: string;
      readonly notFound: string;
    }
  >
> = {
  fr: {
    project: "Projet introuvable",
    software: "Logiciel introuvable",
    notFound: "Page introuvable",
  },
  en: {
    project: "Project not found",
    software: "Software not found",
    notFound: "Page not found",
  },
};

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
    const routeMatch = getRouteMatchFromPathname(location.pathname);
    const fallbackTitles = fallbackPageTitles[currentLanguage];

    let pageTitle: string;

    if (routeMatch.kind === "page") {
      const navigationItem = getNavigationItemFromPathname(location.pathname);

      pageTitle = t(navigationItem?.titleKey ?? "pages.home.title", {
        lng: currentLanguage,
      });
    } else if (routeMatch.kind === "project") {
      pageTitle =
        getProject(currentLanguage, routeMatch.slug)?.title ??
        fallbackTitles.project;
    } else if (routeMatch.kind === "software") {
      pageTitle =
        getSoftware(currentLanguage, routeMatch.slug)?.title ??
        fallbackTitles.software;
    } else {
      pageTitle = fallbackTitles.notFound;
    }

    const siteName = t("site.name", {
      lng: currentLanguage,
    });

    document.title = `${pageTitle} | ${siteName}`;
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
      behavior: "auto",
    });

    mainRef.current?.focus({
      preventScroll: true,
    });
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        {t("accessibility.skipToContent", {
          lng: currentLanguage,
        })}
      </a>

      <SiteHeader />

      <main ref={mainRef} className="site-main" id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <p className="site-footer__text">
            {t("footer.text", {
              lng: currentLanguage,
            })}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default AppShell;
