import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import { cn } from "../lib/utils";
import {
  getLanguageFromPathname,
  getPageIdFromPathname,
  mobileNavigationItems,
} from "../navigation";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const mobileNavigationLabels = {
  fr: {
    open: "Ouvrir la navigation",
    close: "Fermer la navigation",
    description: "Accéder aux différentes rubriques du portfolio.",
  },
  en: {
    open: "Open navigation",
    close: "Close navigation",
    description: "Access the different sections of the portfolio.",
  },
} as const;

function MobileNavigation() {
  const location = useLocation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = getLanguageFromPathname(location.pathname);
  const currentPageId = getPageIdFromPathname(location.pathname);
  const labels = mobileNavigationLabels[currentLanguage];

  const navigationLabel = t("navigation.primaryLabel", {
    lng: currentLanguage,
  });

  return (
    <div className="xl:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            aria-label={labels.open}
            className="size-11 border-border-strong bg-card shadow-none"
          >
            <ListIcon aria-hidden="true" size={20} weight="bold" />
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton={false}
          className={cn(
            "w-[calc(100%-1rem)] max-w-sm gap-0 p-0",
            "border-border-strong bg-background shadow-elevated",
          )}
        >
          <SheetHeader className="relative gap-2 border-b border-border px-5 py-5 pr-16 text-left">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 shrink-0 bg-copper"
              />

              <SheetTitle className="m-0 text-base font-semibold tracking-tight text-heading">
                {navigationLabel}
              </SheetTitle>
            </div>

            <SheetDescription className="sr-only">
              {labels.description}
            </SheetDescription>

            <SheetClose asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={labels.close}
                className="absolute top-3 right-3 size-11"
              >
                <XIcon aria-hidden="true" size={20} weight="bold" />
              </Button>
            </SheetClose>
          </SheetHeader>

          <nav
            aria-label={navigationLabel}
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-5 sm:px-5"
          >
            <ul className="m-0 grid list-none gap-1 p-0">
              {mobileNavigationItems.map((item, index) => {
                const isCurrentPage = currentPageId === item.id;

                return (
                  <li className="m-0" key={item.id}>
                    <Link
                      className={cn(
                        "grid min-h-14 grid-cols-[2rem_minmax(0,1fr)_0.75rem]",
                        "items-center gap-3 rounded-md border-l-2 px-4 py-3",
                        "text-sm font-medium no-underline",
                        "transition-colors duration-150 ease-standard",
                        "focus-visible:outline-none focus-visible:ring-[3px]",
                        "focus-visible:ring-ring/50",
                        isCurrentPage
                          ? [
                              "border-copper bg-copper-soft",
                              "font-semibold text-copper-strong",
                            ]
                          : [
                              "border-transparent text-heading",
                              "hover:border-border-strong hover:bg-muted",
                              "hover:text-heading",
                              "active:border-copper active:bg-copper-soft",
                            ],
                      )}
                      to={item.routes[currentLanguage]}
                      aria-current={isCurrentPage ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted-foreground"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span>
                        {t(item.labelKey, {
                          lng: currentLanguage,
                        })}
                      </span>

                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-2 rounded-full",
                          isCurrentPage ? "bg-copper" : "bg-transparent",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavigation;
