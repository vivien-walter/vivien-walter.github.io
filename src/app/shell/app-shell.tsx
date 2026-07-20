import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import { getProjectById } from "@/routes/projects/data/project-content.loader";
import { getSoftwareById } from "@/routes/software/data/software-content.loader";

import {
  getLanguageFromPathname,
  getNavigationItemFromPathname,
  getRouteMatchFromPathname,
} from "../routing/navigation";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

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
    let pageTitle: string;

    if (routeMatch.kind === "page") {
      const navigationItem = getNavigationItemFromPathname(location.pathname);

      pageTitle = t(navigationItem?.titleKey ?? "pages.home.title", {
        lng: currentLanguage,
      });
    } else if (routeMatch.kind === "project") {
      pageTitle =
        getProjectById(currentLanguage, routeMatch.slug)?.title ??
        t("errors.projectNotFound", { lng: currentLanguage });
    } else if (routeMatch.kind === "software") {
      pageTitle =
        getSoftwareById(currentLanguage, routeMatch.slug)?.title ??
        t("errors.softwareNotFound", { lng: currentLanguage });
    } else {
      pageTitle = t("errors.pageNotFound", { lng: currentLanguage });
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
    <div className="relative flex min-h-screen min-h-svh flex-col bg-background text-foreground">
      <a
        className={[
          "fixed top-3 left-3 z-[100]",
          "-translate-y-[calc(100%+2rem)]",
          "rounded-md border border-border-strong",
          "bg-heading px-4 py-3",
          "text-sm font-semibold text-primary-foreground no-underline",
          "shadow-elevated transition-transform duration-150 ease-standard",
          "focus:translate-y-0 focus:text-primary-foreground",
          "focus-visible:outline-none focus-visible:ring-[3px]",
          "focus-visible:ring-ring focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
        ].join(" ")}
        href="#main-content"
      >
        {t("accessibility.skipToContent", {
          lng: currentLanguage,
        })}
      </a>

      <SiteHeader />

      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="min-w-0 flex-1 focus:outline-none"
      >
        <Outlet />
      </main>

      <SiteFooter />
    </div>
  );
}

export default AppShell;