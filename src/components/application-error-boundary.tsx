import { Component, type ErrorInfo, type ReactNode } from "react";

import {
  getLanguageFromPathname,
  getPageRoute,
  type SupportedLanguage,
} from "../navigation";

type ApplicationErrorBoundaryProps = {
  readonly children: ReactNode;
};

type ApplicationErrorBoundaryState = {
  readonly error: Error | null;
};

const errorMessages: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly eyebrow: string;
      readonly title: string;
      readonly message: string;
      readonly homeLink: string;
    }
  >
> = {
  fr: {
    eyebrow: "Erreur",
    title: "La page ne peut pas être affichée",
    message:
      "Une erreur inattendue empêche l’affichage de cette page. Vous pouvez revenir à l’accueil et poursuivre votre navigation.",
    homeLink: "Retour à l’accueil",
  },
  en: {
    eyebrow: "Error",
    title: "The page cannot be displayed",
    message:
      "An unexpected error is preventing this page from being displayed. You can return to the home page and continue browsing.",
    homeLink: "Return to the home page",
  },
};

class ApplicationErrorBoundary extends Component<
  ApplicationErrorBoundaryProps,
  ApplicationErrorBoundaryState
> {
  public state: ApplicationErrorBoundaryState = {
    error: null,
  };

  public static getDerivedStateFromError(
    error: Error,
  ): ApplicationErrorBoundaryState {
    return {
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Application rendering error", error, errorInfo);
  }

  public render(): ReactNode {
    if (!this.state.error) {
      return this.props.children;
    }

    const pathname =
      typeof window === "undefined" ? "/fr/" : window.location.pathname;

    const language = getLanguageFromPathname(pathname);
    const messages = errorMessages[language];

    return (
      <main className="site-main" id="main-content">
        <div className="page">
          <div className="page__inner">
            <header className="page-header">
              <p className="page-header__eyebrow">{messages.eyebrow}</p>

              <h1 className="page-header__title">{messages.title}</h1>

              <div className="page-header__introduction">
                <p>{messages.message}</p>
              </div>
            </header>

            <div className="page-actions">
              <a
                className="button-link button-link--primary"
                href={getPageRoute("home", language)}
              >
                {messages.homeLink}
              </a>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default ApplicationErrorBoundary;
