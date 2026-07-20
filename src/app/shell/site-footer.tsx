import {
  EnvelopeSimpleIcon,
  GithubLogoIcon,
  IdentificationBadgeIcon,
  LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getContactContent } from "@/routes/contact/data/contact-content.loader";

import {
  getLanguageFromPathname,
  primaryNavigationItems,
} from "../routing/navigation";
import LanguageSwitcher from "./language-switcher";

const footerLabels = {
  fr: {
    navigation: "Navigation",
    socialProfiles: "Réseaux sociaux",
    contact: "Me contacter",
    copyright: "© 2026 Vivien Praud Walter",
    lastUpdated: "Dernière mise à jour : juillet 2026",
  },
  en: {
    navigation: "Navigation",
    socialProfiles: "Social profiles",
    contact: "Contact me",
    copyright: "© 2026 Vivien Praud Walter",
    lastUpdated: "Last updated: July 2026",
  },
} as const;

const socialProfilePatterns = [
  {
    pattern: /^https:\/\/(?:www\.)?linkedin\.com\//,
    icon: LinkedinLogoIcon,
  },
  {
    pattern: /^https:\/\/github\.com\//,
    icon: GithubLogoIcon,
  },
  {
    pattern: /^https:\/\/orcid\.org\//,
    icon: IdentificationBadgeIcon,
  },
] as const;

function SiteFooter() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);
  const labels = footerLabels[currentLanguage];
  const contactContent = getContactContent(currentLanguage);

  const emailLink = contactContent.links.find((link) =>
    link.href.startsWith("mailto:"),
  );

  const socialProfileLinks = socialProfilePatterns.flatMap(
    ({ pattern, icon }) => {
      const link = contactContent.links.find((item) =>
        pattern.test(item.href),
      );

      return link
        ? [
            {
              ...link,
              icon,
            },
          ]
        : [];
    },
  );

  const footerNavigationItems = primaryNavigationItems.filter(
    (item) => item.id !== "contact",
  );

  return (
    <footer className="bg-brand-dark text-brand-background">
      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
   "pt-12 pb-5 sm:pt-14 sm:pb-5 lg:pt-16 lg:pb-5",
        )}
      >
        <div
          className={cn(
            "grid gap-10",
            "md:grid-cols-2",
            "lg:grid-cols-[1.35fr_0.8fr_0.9fr]",
            "lg:items-baseline lg:gap-12",
          )}
        >
          <section
            className="md:col-span-2 lg:col-span-1"
            aria-labelledby="footer-presentation-title"
          >
            <h2
              id="footer-presentation-title"
              className={cn(
                "m-0 text-xl leading-heading font-bold",
                "tracking-[-0.025em] text-brand-background",
              )}
            >
              {t("site.name", {
                lng: currentLanguage,
              })}
            </h2>

            <p
              className={cn(
                "mt-3 mb-0 max-w-md",
                "text-sm leading-body text-brand-background/78",
              )}
            >
              {t("footer.text", {
                lng: currentLanguage,
              })}
            </p>

            {emailLink ? (
              <Button
                asChild
                variant="outline"
                className={cn(
                  "mt-5 h-11 rounded-sm px-4",
                  "border-white/55 bg-transparent",
                  "text-sm font-semibold text-brand-background",
                  "shadow-none",
                  "hover:border-white hover:bg-white/10",
                  "hover:text-brand-background",
                  "focus-visible:ring-white/70",
                  "focus-visible:ring-offset-brand-dark",
                )}
              >
                <a href={emailLink.href}>
                  <EnvelopeSimpleIcon
                    aria-hidden="true"
                    size={19}
                    weight="bold"
                  />

                  <span>{labels.contact}</span>
                </a>
              </Button>
            ) : null}
          </section>

          <nav aria-labelledby="footer-navigation-title">
            <h2
              id="footer-navigation-title"
              className={cn(
                "m-0 text-base leading-heading font-semibold",
                "text-brand-background",
              )}
            >
              {labels.navigation}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {footerNavigationItems.map((item) => (
                <li className="m-0" key={item.id}>
                  <Link
                    to={item.routes[currentLanguage]}
                    className={cn(
                      "inline-flex min-h-9 items-center rounded-sm",
                      "py-1.5 text-sm font-medium",
                      "text-brand-background/78 no-underline",
                      "transition-colors duration-150 ease-standard",
                      "hover:text-brand-background",
                      "focus-visible:outline-none",
                      "focus-visible:ring-[3px] focus-visible:ring-white/70",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-brand-dark",
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
            <h2
              id="footer-social-title"
              className={cn(
                "m-0 text-base leading-heading font-semibold",
                "text-brand-background",
              )}
            >
              {labels.socialProfiles}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {socialProfileLinks.map((link) => {
                const Icon = link.icon;

                return (
                  <li className="m-0" key={link.href}>
                    <a
                      href={link.href}
                      className={cn(
                        "inline-flex min-h-9 items-center gap-2.5",
                        "rounded-sm py-1.5 text-sm font-medium",
                        "text-brand-background/78 no-underline",
                        "transition-colors duration-150 ease-standard",
                        "hover:text-brand-background",
                        "focus-visible:outline-none",
                        "focus-visible:ring-[3px]",
                        "focus-visible:ring-white/70",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-brand-dark",
                      )}
                    >
                      <Icon
                        aria-hidden="true"
                        className="size-5 shrink-0"
                        weight="regular"
                      />

                      <span>{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-3">
              <LanguageSwitcher variant="dark" />
            </div>
          </section>
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-2",
            "border-t border-white/20 pt-5",
            "text-xs text-brand-background/65",
            "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="m-0">{labels.copyright}</p>
          <p className="m-0">{labels.lastUpdated}</p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;