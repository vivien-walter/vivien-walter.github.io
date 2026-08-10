import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { supportedLanguages } from '@/lib/content/localization';
import { cn } from '@/lib/utils';

import { getEquivalentLanguagePath, getLanguageFromPathname } from '../routing/navigation';

type LanguageSwitcherProps = {
  readonly variant?: 'default' | 'inverse';
  readonly onNavigate?: () => void;
};

export default function LanguageSwitcher({ variant = 'default', onNavigate }: LanguageSwitcherProps) {
  const location = useLocation();

  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);

  const isInverse = variant === 'inverse';

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
                <span aria-hidden="true" className={cn('text-sm', isInverse ? 'text-brand-background/55' : 'text-brand-ink/55')}>
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
                onClick={onNavigate}
                className={cn(
                  'ease-standard inline-flex min-h-11 items-center justify-center rounded-sm text-sm no-underline transition-colors duration-150 focus-visible:ring-[3px] focus-visible:outline-none',
                  isInverse
                    ? 'min-w-10 px-1.5 focus-visible:ring-white/70'
                    : 'focus-visible:ring-ring/50 focus-visible:ring-offset-background min-w-11 px-2 py-2 tracking-[0.02em] focus-visible:ring-offset-2',
                  isCurrentLanguage
                    ? isInverse
                      ? 'text-brand-background decoration-brand-background font-semibold underline decoration-2 underline-offset-4'
                      : 'text-brand-ink decoration-brand-primary font-semibold underline decoration-2 underline-offset-4'
                    : isInverse
                      ? 'text-brand-background/70 hover:text-brand-background font-medium'
                      : 'text-brand-ink/75 hover:text-brand-primary font-medium',
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
