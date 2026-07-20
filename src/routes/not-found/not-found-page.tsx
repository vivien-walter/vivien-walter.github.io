import {
  ArrowRightIcon,
  HouseIcon,
} from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  getLanguageFromPathname,
  getPageRoute,
} from "@/app/routing/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PageHeader from "@/shared/components/page-header";

function NotFoundPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPathname(location.pathname);

  return (
    <article
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
        <PageHeader
          eyebrow={t("notFound.eyebrow", { lng: language })}
          title={t("notFound.title", { lng: language })}
          introduction={t("notFound.introduction", {
            lng: language,
          })}
        />

        <nav
          aria-label={t("notFound.navigationLabel", {
            lng: language,
          })}
          className="max-w-readable"
        >
          <Card className="gap-0 border-border-strong py-0 shadow-subtle">
            <CardHeader className="border-b border-border px-5 py-5 sm:px-6">
              <CardTitle className="text-base text-heading">
                {t("notFound.navigationLabel", {
                  lng: language,
                })}
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-3 p-5 sm:flex-row sm:flex-wrap sm:p-6">
              <Button
                asChild
                size="lg"
                className="min-h-11 sm:min-w-40"
              >
                <Link to={getPageRoute("home", language)}>
                  <HouseIcon aria-hidden="true" weight="bold" />
                  {t("notFound.homeLink", { lng: language })}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className={[
                  "min-h-11 border-border-strong bg-card",
                  "text-heading shadow-none",
                  "hover:border-primary hover:bg-action-soft",
                  "hover:text-action-strong",
                ].join(" ")}
              >
                <Link to={getPageRoute("projects", language)}>
                  {t("notFound.projectsLink", { lng: language })}
                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className={[
                  "min-h-11 border-border-strong bg-card",
                  "text-heading shadow-none",
                  "hover:border-primary hover:bg-action-soft",
                  "hover:text-action-strong",
                ].join(" ")}
              >
                <Link to={getPageRoute("software", language)}>
                  {t("notFound.softwareLink", { lng: language })}
                  <ArrowRightIcon aria-hidden="true" weight="bold" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </nav>
      </div>
    </article>
  );
}

export default NotFoundPage;