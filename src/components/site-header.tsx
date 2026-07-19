import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageIdFromPathname,
  getPageRoute,
  mobileNavigationItems,
} from "../navigation";
import LanguageSwitcher from "./language-switcher";

function SiteHeader() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);
  const currentPageId = getPageIdFromPathname(location.pathname);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link
          className="site-brand"
          to={getPageRoute("home", currentLanguage)}
          aria-current={currentPageId === "home" ? "page" : undefined}
        >
          {t("site.name", {
            lng: currentLanguage,
          })}
        </Link>

        <nav
          className="primary-navigation"
          aria-label={t("navigation.primaryLabel", {
            lng: currentLanguage,
          })}
        >
          <ul className="primary-navigation__list">
            {mobileNavigationItems.map((item) => {
              const itemClassName = [
                "primary-navigation__item",
                item.showInPrimaryNavigation
                  ? ""
                  : "primary-navigation__item--mobile-only",
              ]
                .filter(Boolean)
                .join(" ");

              const isCurrentPage = currentPageId === item.id;

              return (
                <li className={itemClassName} key={item.id}>
                  <Link
                    className="primary-navigation__link"
                    to={item.routes[currentLanguage]}
                    aria-current={isCurrentPage ? "page" : undefined}
                  >
                    {t(item.labelKey, {
                      lng: currentLanguage,
                    })}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}

export default SiteHeader;
