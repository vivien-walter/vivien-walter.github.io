import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { supportedLanguages } from '@/lib/content/localization';
import { cn } from '@/lib/utils';

import { getEquivalentLanguagePath, getLanguageFromPathname } from '../routing/navigation';

export default function LanguageSwitcher() {
  /* Check the location on the website */
  const location = useLocation();

  /* Fetch all data for the translation */
  const { t } = useTranslation();
  const currentLanguage = getLanguageFromPathname(location.pathname);

  return (
    <nav
      className="shrink-0"
      aria-label={t('languageSwitcher.label', {
        lng: currentLanguage,
      })}
    >
      <ul className="m-0 inline-flex list-none items-center p-0">
        {supportedLanguages.map((language, index) => {
          const isCurrentLanguage = language === currentLanguage;

          const languageName = t(`languages.${language}`, {
            lng: currentLanguage,
          });

          return (
            <li key={language} className="m-0 inline-flex items-center">
              {index > 0 ? (
                <span aria-hidden="true" className="text-brand-ink/55 text-sm">
                  |
                </span>
              ) : null}

              <Link
                to={getEquivalentLanguagePath(location.pathname, language)}
                lang={language}
                hrefLang={language}
                aria-label={languageName}
                aria-current={isCurrentLanguage ? 'page' : undefined}
                title={languageName}
                className={cn(
                  'inline-flex min-h-11 min-w-11 items-center justify-center',
                  'rounded-sm px-2 py-2',
                  'text-sm tracking-[0.02em] no-underline',
                  'ease-standard transition-colors duration-150',
                  'focus-visible:ring-[3px] focus-visible:outline-none',
                  'focus-visible:ring-ring/50',
                  'focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-background',
                  isCurrentLanguage
                    ? ['text-brand-ink font-semibold underline', 'decoration-brand-primary decoration-2', 'underline-offset-4']
                    : ['text-brand-ink/75 font-medium', 'hover:text-brand-primary'],
                )}
              >
                {language.toUpperCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
