import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getPageIdFromPathname,
  getPageRoute,
  isSupportedLanguage,
  primaryNavigationItems,
  type SupportedLanguage,
} from "../navigation";
import LanguageSwitcher from "./language-switcher";

function getCurrentLanguage(pathname: string): SupportedLanguage {
  const languageSegment = pathname.split("/")[1];

  return isSupportedLanguage(languageSegment) ? languageSegment : "fr";
}

function SiteHeader() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getCurrentLanguage(location.pathname);
  const currentPageId = getPageIdFromPathname(location.pathname);

  return (
    <header>
      <Link to={getPageRoute("home", currentLanguage)}>{t("site.name")}</Link>

      <nav aria-label={t("navigation.primaryLabel")}>
        <ul>
          {primaryNavigationItems.map((item) => (
            <li key={item.id}>
              <Link
                to={item.routes[currentLanguage]}
                aria-current={currentPageId === item.id ? "page" : undefined}
              >
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <LanguageSwitcher />
    </header>
  );
}

export default SiteHeader;
