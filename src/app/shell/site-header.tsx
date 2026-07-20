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

  const navigationLabel = t("navigation.primaryLabel", {
    lng: currentLanguage,
  });

  const isHomePage = currentPageId === "home";

  return (
    <header
      className={cn(
        "sticky top-0 z-40",
        "border-b border-border bg-background/95",
        "supports-[backdrop-filter]:backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "mx-auto grid min-h-16 w-full max-w-wide",
          "grid-cols-[minmax(0,1fr)_auto] items-center gap-3",
          "px-page py-2",
          "xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:gap-6",
        )}
      >
        <Button
          asChild
          variant="ghost"
          size="lg"
          className={cn(
            "h-11 min-w-0 justify-start rounded-none",
            "border-l-2 border-copper px-3 py-0",
            "text-base font-semibold tracking-[-0.02em] text-heading",
            "shadow-none hover:bg-muted hover:text-heading",
          )}
        >
          <Link
            to={getPageRoute("home", currentLanguage)}
            aria-current={isHomePage ? "page" : undefined}
          >
            <span className="truncate">
              {t("site.name", {
                lng: currentLanguage,
              })}
            </span>
          </Link>
        </Button>

        <NavigationMenu
          viewport={false}
          aria-label={navigationLabel}
          className="hidden w-full max-w-none justify-center xl:flex"
        >
          <NavigationMenuList className="m-0 flex-wrap gap-1 p-0">
            {primaryNavigationItems.map((item) => {
              const isCurrentPage = currentPageId === item.id;

              return (
                <NavigationMenuItem className="m-0" key={item.id}>
                  <NavigationMenuLink
                    asChild
                    active={isCurrentPage}
                    className={cn(
                      "min-h-11 justify-center rounded-none",
                      "border-b-2 border-transparent bg-transparent",
                      "px-3 py-2 text-sm font-medium",
                      "text-muted-foreground no-underline shadow-none",
                      "transition-colors duration-150 ease-standard",
                      "hover:bg-transparent hover:text-heading",
                      "focus:bg-transparent focus:text-heading",
                      "focus-visible:outline-none",
                      "focus-visible:ring-[3px] focus-visible:ring-ring/50",
                      "data-[active=true]:bg-transparent",
                      "data-[active=true]:text-heading",
                      isCurrentPage && [
                        "border-copper font-semibold text-heading",
                        "hover:border-copper",
                      ],
                    )}
                  >
                    <Link
                      to={item.routes[currentLanguage]}
                      aria-current={isCurrentPage ? "page" : undefined}
                    >
                      {t(item.labelKey, {
                        lng: currentLanguage,
                      })}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex shrink-0 items-center justify-end gap-2 justify-self-end">
          <LanguageSwitcher />
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;