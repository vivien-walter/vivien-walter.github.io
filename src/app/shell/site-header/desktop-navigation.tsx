import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
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
      className={cn('hidden h-full min-w-0', 'max-w-none flex-1', 'justify-center lg:flex')}
    >
      <NavigationMenuList className={cn('m-0 h-full min-w-0', 'gap-1 p-0', 'xl:gap-2 2xl:gap-4')}>
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
                className={cn(
                  'relative h-full',
                  'min-h-20 justify-center',
                  'rounded-none',
                  'bg-transparent px-3 py-0',
                  'text-[0.9375rem]',
                  'font-medium whitespace-nowrap',
                  'text-brand-ink',
                  'no-underline shadow-none',
                  'transition-colors',
                  'duration-150',
                  'ease-standard',
                  'hover:bg-transparent',
                  'hover:text-brand-primary',
                  'focus:bg-transparent',
                  'focus:text-brand-primary',
                  'focus-visible:outline-none',
                  'focus-visible:ring-[3px]',
                  'focus-visible:ring-ring/50',
                  'focus-visible:ring-offset-2',
                  'focus-visible:ring-offset-background',
                  'data-[active=true]:bg-transparent',
                  'data-[active=true]:text-brand-ink',
                )}
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
                  {isCurrentPage ? (
                    <span aria-hidden="true" className={cn('absolute right-3', 'bottom-[-1px] left-3', 'h-1', 'bg-brand-primary')} />
                  ) : null}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
