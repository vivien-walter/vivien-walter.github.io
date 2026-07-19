import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  getEquivalentLanguagePath,
  getLanguageFromPathname,
  supportedLanguages,
} from "../navigation";

function LanguageSwitcher() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);

  return (
    <nav
      className="language-switcher"
      aria-label={t("languageSwitcher.label", {
        lng: currentLanguage,
      })}
    >
      <ul className="language-switcher__list">
        {supportedLanguages.map((language) => {
          const isCurrentLanguage = language === currentLanguage;

          return (
            <li className="language-switcher__item" key={language}>
              <Link
                className="language-switcher__link"
                to={getEquivalentLanguagePath(location.pathname, language)}
                lang={language}
                hrefLang={language}
                aria-current={isCurrentLanguage ? "page" : undefined}
              >
                {t(`languages.${language}`, {
                  lng: currentLanguage,
                })}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default LanguageSwitcher;
