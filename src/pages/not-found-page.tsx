import { Link, useLocation } from "react-router-dom";

import PageHeader from "../components/page-header";
import {
  getLanguageFromPathname,
  getPageRoute,
  type SupportedLanguage,
} from "../navigation";

const messages: Readonly<
  Record<
    SupportedLanguage,
    {
      readonly eyebrow: string;
      readonly title: string;
      readonly introduction: string;
      readonly homeLink: string;
      readonly projectsLink: string;
      readonly softwareLink: string;
      readonly navigationLabel: string;
    }
  >
> = {
  fr: {
    eyebrow: "Page introuvable",
    title: "Cette page n’existe pas",
    introduction:
      "L’adresse demandée ne correspond à aucune page disponible. Le contenu a peut-être été déplacé ou le lien est incorrect.",
    homeLink: "Retour à l’accueil",
    projectsLink: "Voir les projets",
    softwareLink: "Voir les logiciels",
    navigationLabel: "Navigation après une page introuvable",
  },
  en: {
    eyebrow: "Page not found",
    title: "This page does not exist",
    introduction:
      "The requested address does not match any available page. The content may have moved or the link may be incorrect.",
    homeLink: "Return to the home page",
    projectsLink: "View projects",
    softwareLink: "View software",
    navigationLabel: "Navigation after a page-not-found error",
  },
};

function NotFoundPage() {
  const location = useLocation();
  const language = getLanguageFromPathname(location.pathname);
  const content = messages[language];

  return (
    <article className="page" aria-labelledby="page-title">
      <div className="page__inner">
        <PageHeader
          eyebrow={content.eyebrow}
          title={content.title}
          introduction={content.introduction}
        />

        <nav className="page-actions" aria-label={content.navigationLabel}>
          <Link
            className="button-link button-link--primary"
            to={getPageRoute("home", language)}
          >
            {content.homeLink}
          </Link>

          <Link
            className="button-link button-link--secondary"
            to={getPageRoute("projects", language)}
          >
            {content.projectsLink}
          </Link>

          <Link
            className="button-link button-link--secondary"
            to={getPageRoute("software", language)}
          >
            {content.softwareLink}
          </Link>
        </nav>
      </div>
    </article>
  );
}

export default NotFoundPage;
