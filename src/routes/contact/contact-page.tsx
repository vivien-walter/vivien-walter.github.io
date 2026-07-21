import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import PageHero from "@/shared/components/page-hero";
import SectionHeader from "@/shared/components/section-header";

import ContactAvailabilitySection from "./components/contact-availability-section";
import ContactMethodCard from "./components/contact-method-card";
import JobSearchBanner from "./components/job-search-banner";
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
          ariaLabel: t("breadcrumbs.label", {
            lng: language,
          }),
          items: [
            {
              label: t("breadcrumbs.home", {
                lng: language,
              }),
              to: getPageRoute("home", language),
            },
            {
              label: t("pages.contact.title", {
                lng: language,
              }),
            },
          ],
        }}
        eyebrow={t("pages.contact.title", {
          lng: language,
        })}
        title={page.title}
        introduction={page.introduction}
      />

      <div className="mx-auto w-full max-w-editorial px-page">
        <section
          className="py-12 sm:py-14 lg:py-16"
          aria-labelledby="contact-methods-title"
        >
          <SectionHeader
            title={t("pages.contact.methodsTitle", {
              lng: language,
            })}
            titleId="contact-methods-title"
            className="mb-8 sm:mb-10"
          />

          <ul
            className={[
              "m-0 grid list-none gap-5 p-0",
              "sm:grid-cols-2 lg:grid-cols-4",
            ].join(" ")}
          >
            {page.links.map((method) => (
              <li
                key={method.href}
                className="m-0 min-w-0"
              >
                <ContactMethodCard method={method} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <JobSearchBanner
        message={t("pages.contact.jobSearch.message", {
          lng: language,
        })}
        frenchCvLabel={t(
          "pages.contact.jobSearch.downloadCvFr",
          {
            lng: language,
          },
        )}
        englishCvLabel={t(
          "pages.contact.jobSearch.downloadCvEn",
          {
            lng: language,
          },
        )}
      />

      <div className="mx-auto w-full max-w-editorial px-page">
        <ContactAvailabilitySection
          content={page.availability}
        />
      </div>
    </div>
  );
}

export default ContactPage;