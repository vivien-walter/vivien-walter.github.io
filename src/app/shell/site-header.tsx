import { DownloadSimpleIcon } from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import {
  getLanguageFromPathname,
  getPageIdFromPathname,
  getPageRoute,
  primaryNavigationItems,
} from "../routing/navigation";
import LanguageSwitcher from "./language-switcher";
import MobileNavigation from "./mobile-navigation";

function SiteHeader() {
  const location = useLocation();
  const { t } = useTranslation();

  const currentLanguage = getLanguageFromPathname(location.pathname);
  const currentPageId = getPageIdFromPathname(location.pathname);
  const isHomePage = currentPageId === "home";

  const navigationLabel = t("navigation.primaryLabel", {
    lng: currentLanguage,
  });

  const siteName = t("site.name", {
    lng: currentLanguage,
  });

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "border-b border-border bg-brand-background/95",
        "supports-[backdrop-filter]:backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "grid min-h-20 w-full",
          "grid-cols-[minmax(0,1fr)_auto] items-stretch gap-3",
          "px-page",
          "lg:grid-cols-[auto_minmax(0,1fr)_auto]",
          "lg:gap-6 xl:gap-10",
        )}
      >
        <Link
          to={getPageRoute("home", currentLanguage)}
          aria-current={isHomePage ? "page" : undefined}
          className={cn(
            "relative flex min-w-0 items-center self-stretch py-3",
            "text-brand-ink no-underline",
            "transition-colors duration-150 ease-standard",
            "hover:text-brand-primary",
            "focus-visible:rounded-sm focus-visible:outline-none",
            "focus-visible:ring-[3px] focus-visible:ring-ring/50",
            "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        >
          <span className="grid min-w-0 gap-1 lg:hidden">
            <span
              className={cn(
                "text-xl leading-none font-bold",
                "tracking-[-0.035em]",
              )}
            >
              VPW
            </span>

            <span
              className={cn(
                "truncate text-xs leading-tight font-medium",
                "tracking-[-0.01em] text-brand-ink",
              )}
            >
              {siteName}
            </span>
          </span>

          <span
            className={cn(
              "hidden truncate lg:block",
              "text-[clamp(1.25rem,1rem+0.8vw,1.875rem)]",
              "leading-none font-bold tracking-[-0.035em]",
            )}
          >
            {siteName}
          </span>

          {isHomePage && (
            <span
              aria-hidden="true"
              className="absolute bottom-[-1px] left-0 h-1 w-12 bg-brand-primary"
            />
          )}
        </Link>

        <NavigationMenu
          viewport={false}
          aria-label={navigationLabel}
          className="hidden h-full w-full max-w-none justify-center lg:flex"
        >
          <NavigationMenuList className="m-0 h-full gap-2 p-0 xl:gap-4">
            {primaryNavigationItems.map((item) => {
              const isCurrentPage = currentPageId === item.id;

              return (
                <NavigationMenuItem className="m-0 h-full" key={item.id}>
                  <NavigationMenuLink
                    asChild
                    active={isCurrentPage}
                    className={cn(
                      "relative h-full min-h-20 justify-center",
                      "rounded-none bg-transparent px-3 py-0",
                      "text-[0.9375rem] font-medium text-brand-ink",
                      "no-underline shadow-none",
                      "transition-colors duration-150 ease-standard",
                      "hover:bg-transparent hover:text-brand-primary",
                      "focus:bg-transparent focus:text-brand-primary",
                      "focus-visible:outline-none",
                      "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      "focus-visible:ring-offset-2",
                      "focus-visible:ring-offset-background",
                      "data-[active=true]:bg-transparent",
                      "data-[active=true]:text-brand-ink",
                      isCurrentPage && "font-semibold",
                    )}
                  >
                    <Link
                      to={item.routes[currentLanguage]}
                      aria-current={isCurrentPage ? "page" : undefined}
                    >
                      {t(item.labelKey, {
                        lng: currentLanguage,
                      })}

                      {isCurrentPage && (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "absolute right-3 bottom-[-1px] left-3",
                            "h-1 bg-brand-primary",
                          )}
                        />
                      )}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center justify-end gap-2 justify-self-end">
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          <Button
            type="button"
            disabled
            className={cn(
              "hidden h-12 rounded-sm px-5",
              "bg-brand-primary text-base font-medium",
              "text-primary-foreground shadow-subtle",
              "disabled:cursor-not-allowed disabled:opacity-100",
              "lg:inline-flex",
            )}
          >
            <DownloadSimpleIcon aria-hidden="true" size={20} weight="bold" />
            <span>CV</span>
          </Button>

          <div className="lg:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;