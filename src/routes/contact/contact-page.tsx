import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import { Card } from "@/components/ui/card";
import ContentLink from "@/shared/components/content-link";
import ContentSections from "@/shared/components/content-sections";
import PageHero from "@/shared/components/page-hero";

import { getContactContent } from "./data/contact-content.loader";

function ContactPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getContactContent(language);

  return (
    <div className="overflow-hidden">
      <PageHero
        breadcrumbs={{
          ariaLabel: t("breadcrumbs.label", { lng: language }),
          items: [
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.contact.title", { lng: language }),
            },
          ],
        }}
        eyebrow={t("pages.contact.title", { lng: language })}
        title={page.title}
        introduction={page.introduction}
      />

      <div
        className={[
          "mx-auto w-full max-w-editorial px-page",
          "py-12 sm:py-14 lg:py-16",
        ].join(" ")}
      >
        <ContentSections
          idPrefix="contact"
          sections={page.sections ?? []}
        />

        <section
          className="border-t border-border py-12 sm:py-14 lg:py-16"
          aria-labelledby="contact-links-title"
        >
          <header className="mb-8 max-w-readable">
            <h2
              id="contact-links-title"
              className={[
                "!m-0 text-xl font-bold leading-heading",
                "tracking-[-0.025em] text-heading",
              ].join(" ")}
            >
              {t("content.resources", { lng: language })}
            </h2>
          </header>

          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
            {page.links.map((link) => (
              <li className="m-0 min-w-0" key={link.href}>
                <Card
                  className={[
                    "h-full gap-0 overflow-hidden py-0",
                    "border-border-strong shadow-subtle",
                    "transition-[border-color,box-shadow]",
                    "duration-150 ease-standard",
                    "hover:border-primary hover:shadow-elevated",
                  ].join(" ")}
                >
                  <ContentLink
                    className={[
                      "h-full rounded-xl border-0",
                      "bg-transparent shadow-none",
                      "hover:bg-action-soft hover:shadow-none",
                    ].join(" ")}
                    link={link}
                    variant="contact"
                  />
                </Card>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default ContactPage;