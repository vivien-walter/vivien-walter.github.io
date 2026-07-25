import { HouseIcon } from '@phosphor-icons/react';
import { Component, type ErrorInfo, type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { siteIdentity } from '@/content/common/site';
import { defaultLanguage } from '@/lib/content/localization';
import { cn } from '@/lib/utils';

import i18n from '../i18n';
import { getLanguageFromPathname, getPageRoute } from '../routing/navigation';

type ApplicationErrorBoundaryProps = {
  readonly children: ReactNode;
};

type ApplicationErrorBoundaryState = {
  readonly error: Error | null;
};

/* Définit la classe gérant l'affichage des messages d'erreur */
export default class ApplicationErrorBoundary extends Component<ApplicationErrorBoundaryProps, ApplicationErrorBoundaryState> {
  public state: ApplicationErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ApplicationErrorBoundaryState {
    return {
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    /* Affiche l'erreur dans la console */
    console.error('Application rendering error', error, errorInfo);

    /* Affiche le message d'erreur */
    const pathname = typeof window === 'undefined' ? getPageRoute('home', defaultLanguage) : window.location.pathname;
    const language = getLanguageFromPathname(pathname);

    document.title = `${i18n.t('errors.title', {
      lng: language,
    })} | ${siteIdentity.name}`;
  }

  public render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    const pathname = typeof window === 'undefined' ? getPageRoute('home', defaultLanguage) : window.location.pathname;

    const language = getLanguageFromPathname(pathname);

    return (
      <main id="main-content" className="bg-background text-foreground relative isolate min-h-screen min-h-svh">
        <div
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 -z-10',
            'h-[clamp(18rem,42vw,32rem)]',
            'bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-primary)_7%,transparent),transparent_55%),linear-gradient(45deg,transparent_58%,color-mix(in_srgb,var(--brand-accent)_6%,transparent))]',
          )}
        />

        <div className="max-w-readable px-page mx-auto flex min-h-screen min-h-svh w-full items-center py-12">
          <Card className="border-border-strong shadow-elevated w-full">
            <CardHeader className="gap-4">
              <p className="text-copper-strong !m-0 font-mono text-xs font-semibold tracking-[0.08em] uppercase">
                {i18n.t('errors.eyebrow', {
                  lng: language,
                })}
              </p>

              <CardTitle>
                <h1 id="page-title" className="leading-heading text-heading !m-0 !text-xl tracking-[-0.025em] sm:!text-2xl">
                  {i18n.t('errors.title', {
                    lng: language,
                  })}
                </h1>
              </CardTitle>

              <CardDescription className="leading-body text-base">
                {i18n.t('errors.message', {
                  lng: language,
                })}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Button asChild size="lg" className="min-h-11">
                <a href={getPageRoute('home', language)}>
                  <HouseIcon aria-hidden="true" weight="bold" />

                  {i18n.t('errors.homeLink', {
                    lng: language,
                  })}
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }
}
