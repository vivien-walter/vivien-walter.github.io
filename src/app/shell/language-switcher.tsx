import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { supportedLanguages } from '@/lib/content/localization';
import { cn } from '@/lib/utils';

import { getEquivalentLanguagePath, getLanguageFromPathname } from '../routing/navigation';

type LanguageSwitcherProps = {
  readonly variant?: 'light' | 'dark';
};

export default function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);
  const isDark = variant === 'dark';

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
            <li className="m-0 inline-flex items-center" key={language}>
              {index > 0 && (
                <span aria-hidden="true" className={cn('text-sm', isDark ? 'text-brand-background/55' : 'text-brand-ink/55')}>
                  |
                </span>
              )}

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
                  'focus-visible:ring-offset-2',
                  isDark
                    ? ['focus-visible:ring-white/70', 'focus-visible:ring-offset-brand-dark']
                    : ['focus-visible:ring-ring/50', 'focus-visible:ring-offset-background'],
                  isCurrentLanguage &&
                    (isDark
                      ? ['text-brand-background font-semibold underline', 'decoration-brand-background decoration-2', 'underline-offset-4']
                      : ['text-brand-ink font-semibold underline', 'decoration-brand-primary decoration-2', 'underline-offset-4']),
                  !isCurrentLanguage &&
                    (isDark
                      ? ['text-brand-background/70 font-medium', 'hover:text-brand-background']
                      : ['text-brand-ink/75 font-medium', 'hover:text-brand-primary']),
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
