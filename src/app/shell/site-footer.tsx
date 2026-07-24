import { useTranslation } from "react-i18next";
import {
  Link,
  useLocation,
} from "react-router-dom";

import { Button } from "@/components/ui/button";
import { getFooterContent } from "@/content/common/footer";
import { cn } from "@/lib/utils";

import {
  getLanguageFromPathname,
  primaryNavigationItems,
} from "../routing/navigation";
import LanguageSwitcher from "./language-switcher";

function SiteFooter() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage =
    getLanguageFromPathname(
      location.pathname,
    );

  const footer =
    getFooterContent(currentLanguage);

  const EmailIcon = footer.email.icon;

  const footerNavigationItems =
    primaryNavigationItems.filter(
      (item) => item.id !== "contact",
    );

  return (
    <footer className="bg-brand-dark text-brand-background">
      <div
        className={cn(
          "mx-auto w-full max-w-editorial px-page",
          "pt-12 pb-5 sm:pt-14 sm:pb-5",
          "lg:pt-16 lg:pb-5",
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
                "m-0 text-xl font-bold",
                "leading-heading",
                "tracking-[-0.025em]",
                "text-brand-background",
              )}
            >
              {t("site.name", {
                lng: currentLanguage,
              })}
            </h2>

            <p
              className={cn(
                "mt-3 mb-0 max-w-md",
                "text-sm leading-body",
                "text-brand-background/78",
              )}
            >
              {footer.text}
            </p>

            <Button
              asChild
              variant="outline"
              className={cn(
                "mt-5 h-11 rounded-sm px-4",
                "border-white/55 bg-transparent",
                "text-sm font-semibold",
                "text-brand-background",
                "shadow-none",
                "hover:border-white",
                "hover:bg-white/10",
                "hover:text-brand-background",
                "focus-visible:ring-white/70",
                "focus-visible:ring-offset-brand-dark",
              )}
            >
              <a href={footer.email.href}>
                <EmailIcon
                  aria-hidden="true"
                  className="size-[1.1875rem]"
                  weight="bold"
                />

                <span>
                  {footer.contactLabel}
                </span>
              </a>
            </Button>
          </section>

          <nav aria-labelledby="footer-navigation-title">
            <h2
              id="footer-navigation-title"
              className={cn(
                "m-0 text-base",
                "font-semibold leading-heading",
                "text-brand-background",
              )}
            >
              {footer.navigationTitle}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {footerNavigationItems.map(
                (item) => (
                  <li
                    key={item.id}
                    className="m-0"
                  >
                    <Link
                      to={
                        item.routes[
                          currentLanguage
                        ]
                      }
                      className={cn(
                        "inline-flex min-h-9",
                        "items-center rounded-sm",
                        "py-1.5 text-sm",
                        "font-medium",
                        "text-brand-background/78",
                        "no-underline",
                        "transition-colors",
                        "duration-150",
                        "ease-standard",
                        "hover:text-brand-background",
                        "focus-visible:outline-none",
                        "focus-visible:ring-[3px]",
                        "focus-visible:ring-white/70",
                        "focus-visible:ring-offset-2",
                        "focus-visible:ring-offset-brand-dark",
                      )}
                    >
                      {t(item.labelKey, {
                        lng: currentLanguage,
                      })}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <section aria-labelledby="footer-social-title">
            <h2
              id="footer-social-title"
              className={cn(
                "m-0 text-base",
                "font-semibold leading-heading",
                "text-brand-background",
              )}
            >
              {footer.socialProfilesTitle}
            </h2>

            <ul className="mt-3 mb-0 grid list-none gap-0 p-0">
              {footer.socialProfiles.map(
                (profile) => {
                  const ProfileIcon =
                    profile.icon;

                  return (
                    <li
                      key={profile.id}
                      className="m-0"
                    >
                      <a
                        href={profile.href}
                        target="_blank"
                        rel="noreferrer"
                        data-external="true"
                        className={cn(
                          "inline-flex min-h-9",
                          "items-center gap-2.5",
                          "rounded-sm py-1.5",
                          "text-sm font-medium",
                          "text-brand-background/78",
                          "no-underline",
                          "transition-colors",
                          "duration-150",
                          "ease-standard",
                          "hover:text-brand-background",
                          "focus-visible:outline-none",
                          "focus-visible:ring-[3px]",
                          "focus-visible:ring-white/70",
                          "focus-visible:ring-offset-2",
                          "focus-visible:ring-offset-brand-dark",
                        )}
                      >
                        <ProfileIcon
                          aria-hidden="true"
                          className="size-5 shrink-0"
                          weight="regular"
                        />

                        <span>
                          {profile.label}
                        </span>
                      </a>
                    </li>
                  );
                },
              )}
            </ul>

            <div className="mt-3">
              <LanguageSwitcher variant="dark" />
            </div>
          </section>
        </div>

        <div
          className={cn(
            "mt-10 flex flex-col gap-2",
            "border-t border-white/20",
            "pt-5 text-xs",
            "text-brand-background/65",
            "sm:flex-row sm:items-center",
            "sm:justify-between",
          )}
        >
          <p className="m-0">
            {footer.copyright}
          </p>

          <p className="m-0">
            {footer.lastUpdated}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;