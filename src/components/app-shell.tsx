import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { isSupportedLanguage, type SupportedLanguage } from "../navigation";
import SiteHeader from "./site-header";

function getCurrentLanguage(pathname: string): SupportedLanguage {
  const languageSegment = pathname.split("/")[1];

  return isSupportedLanguage(languageSegment) ? languageSegment : "fr";
}

function AppShell() {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLanguage = getCurrentLanguage(location.pathname);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;

    if (i18n.resolvedLanguage !== currentLanguage) {
      void i18n.changeLanguage(currentLanguage);
    }
  }, [currentLanguage, i18n]);

  return (
    <>
      <a href="#main-content">{t("accessibility.skipToContent")}</a>

      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <footer>
        <p>{t("footer.text")}</p>
      </footer>
    </>
  );
}

export default AppShell;
