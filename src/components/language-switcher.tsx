import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  getEquivalentLanguagePath,
  isSupportedLanguage,
  supportedLanguages,
  type SupportedLanguage,
} from "../navigation";

function getLanguageFromPathname(pathname: string): SupportedLanguage {
  const languageSegment = pathname.split("/")[1];

  return isSupportedLanguage(languageSegment) ? languageSegment : "fr";
}

function LanguageSwitcher() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);

  return (
    <nav aria-label={t("languageSwitcher.label")}>
      <ul>
        {supportedLanguages.map((language) => (
          <li key={language}>
            <Link
              to={getEquivalentLanguagePath(location.pathname, language)}
              lang={language}
              hrefLang={language}
              aria-current={language === currentLanguage ? "page" : undefined}
            >
              {t(`languages.${language}`)}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default LanguageSwitcher;
