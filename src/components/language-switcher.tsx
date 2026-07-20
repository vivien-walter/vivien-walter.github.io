import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../lib/utils";
import {
  getEquivalentLanguagePath,
  getLanguageFromPathname,
  supportedLanguages,
} from "../navigation";
import { Button } from "./ui/button";

function LanguageSwitcher() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);

  return (
    <nav
      className="shrink-0"
      aria-label={t("languageSwitcher.label", {
        lng: currentLanguage,
      })}
    >
      <ul
        className={cn(
          "m-0 inline-flex list-none items-center gap-1 p-1",
          "rounded-md border border-border-strong bg-card",
        )}
      >
        {supportedLanguages.map((language) => {
          const isCurrentLanguage = language === currentLanguage;
          const languageName = t(`languages.${language}`, {
            lng: currentLanguage,
          });

          return (
            <li className="m-0" key={language}>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className={cn(
                  "size-11 rounded-sm shadow-none",
                  "font-mono text-xs font-semibold tracking-[0.08em]",
                  isCurrentLanguage
                    ? [
                        "bg-action-soft text-action-strong",
                        "ring-1 ring-inset ring-copper/60",
                        "hover:bg-action-soft hover:text-action-strong",
                      ]
                    : [
                        "text-muted-foreground",
                        "hover:bg-muted hover:text-heading",
                      ],
                )}
              >
                <Link
                  to={getEquivalentLanguagePath(location.pathname, language)}
                  lang={language}
                  hrefLang={language}
                  aria-label={languageName}
                  aria-current={isCurrentLanguage ? "page" : undefined}
                  title={languageName}
                >
                  {language.toUpperCase()}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default LanguageSwitcher;
