import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import type { SupportedLanguage } from '@/types/localization';

import { type NavigationPageId, primaryNavigationItems } from '../../routing/navigation';

interface DesktopNavigationProps {
  currentLanguage: SupportedLanguage;
  currentPageId?: NavigationPageId;
}

export default function DesktopNavigation({ currentLanguage, currentPageId }: DesktopNavigationProps) {
  /* Fetch all data for the translation */
  const { t } = useTranslation();

  return (
    <NavigationMenu
      viewport={false}
      aria-label={t('navigation.primaryLabel', {
        lng: currentLanguage,
      })}
      className="hidden h-full max-w-none min-w-0 flex-1 justify-center lg:flex"
    >
      <NavigationMenuList className="m-0 h-full min-w-0 gap-1 p-0 xl:gap-2 2xl:gap-4">
        {primaryNavigationItems.map((item) => {
          const isCurrentPage = currentPageId === item.id;

          const fullLabel = t(item.labelKey, {
            lng: currentLanguage,
          });

          const compactLabelKey = 'compactLabelKey' in item ? item.compactLabelKey : undefined;

          const compactLabel = compactLabelKey
            ? t(compactLabelKey, {
                lng: currentLanguage,
              })
            : fullLabel;

          return (
            <NavigationMenuItem key={item.id} className="m-0 h-full">
              <NavigationMenuLink
                asChild
                active={isCurrentPage}
                className="text-brand-ink ease-standard hover:text-brand-primary focus:text-brand-primary focus-visible:ring-ring/50 focus-visible:ring-offset-background data-[active=true]:text-brand-ink relative h-full min-h-20 justify-center rounded-none bg-transparent px-3 py-0 text-[0.9375rem] font-medium whitespace-nowrap no-underline shadow-none transition-colors duration-150 hover:bg-transparent focus:bg-transparent focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none data-[active=true]:bg-transparent"
              >
                <Link
                  to={item.routes[currentLanguage]}
                  aria-current={isCurrentPage ? 'page' : undefined}
                  aria-label={compactLabelKey ? fullLabel : undefined}
                >
                  {compactLabelKey ? (
                    <>
                      <span aria-hidden="true" className="2xl:hidden">
                        {compactLabel}
                      </span>

                      <span aria-hidden="true" className="hidden 2xl:inline">
                        {fullLabel}
                      </span>
                    </>
                  ) : (
                    fullLabel
                  )}
                  {isCurrentPage ? <span aria-hidden="true" className="bg-brand-primary absolute right-3 bottom-[-1px] left-3 h-1" /> : null}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
