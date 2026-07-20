import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import Breadcrumbs from "../components/breadcrumbs";
import ContentLink from "../components/content-link";
import ContentSections from "../components/content-sections";
import PageHeader from "../components/page-header";
import { Card } from "../components/ui/card";
import { getLanguageFromPathname, getPageRoute } from "../navigation";
import { getContactContent } from "../routes/contact/data/contact-content.loader";

function ContactPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);
  const page = getContactContent(language);

  return (
    <div
      className="relative isolate overflow-hidden"
      aria-labelledby="page-title"
    >
      <div
        aria-hidden="true"
        className={[
          "pointer-events-none absolute inset-x-0 top-0 -z-10",
          "h-[clamp(18rem,42vw,32rem)]",
          "bg-[linear-gradient(135deg,rgb(32_84_147_/_0.07),transparent_55%),linear-gradient(45deg,transparent_58%,rgb(173_89_55_/_0.06))]",
        ].join(" ")}
      />

      <div className="mx-auto w-full max-w-editorial px-page py-12 sm:py-16 lg:py-24">
        <Breadcrumbs
          ariaLabel={t("breadcrumbs.label", { lng: language })}
          items={[
            {
              label: t("breadcrumbs.home", { lng: language }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.contact.title", { lng: language }),
            },
          ]}
        />

        <PageHeader
          eyebrow={t("pages.contact.title", { lng: language })}
          title={page.title}
          introduction={page.introduction}
        />

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