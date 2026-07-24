import { EnvelopeSimpleIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { getFooterContent } from '@/content/common/footer';
import { siteIdentity } from '@/content/common/site';
import { cn } from '@/lib/utils';

import { getLanguageFromPathname, getPageRoute, primaryNavigationItems } from '../routing/navigation';

const footerNavigationItems = primaryNavigationItems.filter((item) => item.id !== 'contact');

export default function SiteFooter() {
  /* Check the location on the website */
  const location = useLocation();

  /* Fetch all data for the translation */
  const { t } = useTranslation();
  const currentLanguage = getLanguageFromPathname(location.pathname);

  /* Fetch informations on the footer */
  const footer = getFooterContent(currentLanguage);

  return (
    <footer className="bg-brand-dark text-brand-background">
      <div className={cn('max-w-editorial px-page mx-auto w-full', 'pt-12 pb-5 sm:pt-14 sm:pb-5', 'lg:pt-16 lg:pb-5')}>
        <div className={cn('grid gap-10', 'md:grid-cols-2', 'lg:grid-cols-[1.35fr_0.8fr_0.9fr]', 'lg:items-baseline lg:gap-12')}>
          <section className="md:col-span-2 lg:col-span-1" aria-labelledby="footer-presentation-title">
            <h2
              id="footer-presentation-title"
              className={cn('m-0 text-xl font-bold', 'leading-heading', 'tracking-[-0.025em]', 'text-brand-background')}
            >
              {siteIdentity.name}
            </h2>

            <p className={cn('mt-3 mb-0 max-w-md', 'leading-body text-sm', 'text-brand-background/78')}>{footer.text}</p>

            <Button
              asChild
              variant="outline"
              className={cn(
                'mt-5 h-11 rounded-sm px-4',
                'border-white/55 bg-transparent',
                'text-sm font-semibold',
                'text-brand-background',
                'shadow-none',
                'hover:border-white',
                'hover:bg-white/10',
                'hover:text-brand-background',
                'focus-visible:ring-white/70',
                'focus-visible:ring-offset-brand-dark',
              )}
            >
              <Link to={getPageRoute('contact', currentLanguage)}>
                <EnvelopeSimpleIcon aria-hidden="true" className="size-[1.1875rem]" weight="bold" />
                <span>{footer.contactLabel}</span>
              </Link>
            </Button>
          </section>

          <nav aria-labelledby="footer-navigation-title">
            <h2 id="footer-navigation-title" className={cn('m-0 text-base', 'leading-heading font-semibold', 'text-brand-background')}>
              {footer.navigationTitle}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {footerNavigationItems.map((item) => (
                <li key={item.id} className="m-0">
                  <Link
                    to={item.routes[currentLanguage]}
                    className={cn(
                      'inline-flex min-h-9',
                      'items-center rounded-sm',
                      'py-1.5 text-sm',
                      'font-medium',
                      'text-brand-background/78',
                      'no-underline',
                      'transition-colors',
                      'duration-150',
                      'ease-standard',
                      'hover:text-brand-background',
                      'focus-visible:outline-none',
                      'focus-visible:ring-[3px]',
                      'focus-visible:ring-white/70',
                      'focus-visible:ring-offset-2',
                      'focus-visible:ring-offset-brand-dark',
                    )}
                  >
                    {t(item.labelKey, {
                      lng: currentLanguage,
                    })}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-social-title">
            <h2 id="footer-social-title" className={cn('m-0 text-base', 'leading-heading font-semibold', 'text-brand-background')}>
              {footer.socialProfilesTitle}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {footer.socialProfiles.map((profile) => {
                const ProfileIcon = profile.icon;

                return (
                  <li key={profile.id} className="m-0">
                    <a
                      href={profile.href}
                      target="_blank"
                      rel="noreferrer"
                      data-external="true"
                      className={cn(
                        'inline-flex min-h-9',
                        'items-center gap-2.5',
                        'rounded-sm py-1.5',
                        'text-sm font-medium',
                        'text-brand-background/78',
                        'no-underline',
                        'transition-colors',
                        'duration-150',
                        'ease-standard',
                        'hover:text-brand-background',
                        'focus-visible:outline-none',
                        'focus-visible:ring-[3px]',
                        'focus-visible:ring-white/70',
                        'focus-visible:ring-offset-2',
                        'focus-visible:ring-offset-brand-dark',
                      )}
                    >
                      <ProfileIcon aria-hidden="true" className="size-5 shrink-0" weight="regular" />

                      <span>{profile.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div
          className={cn(
            'mt-10 flex flex-col gap-2',
            'border-t border-white/20',
            'pt-5 text-xs',
            'text-brand-background/65',
            'sm:flex-row sm:items-center',
            'sm:justify-between',
          )}
        >
          <p className="m-0">{footer.copyright}</p>

          <p className="m-0">{footer.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}
