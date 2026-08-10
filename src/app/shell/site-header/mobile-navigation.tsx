import {
  BriefcaseIcon,
  CodeIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  HouseIcon,
  ListIcon,
  MicroscopeIcon,
  UserIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { curriculumVitaeDocuments } from '@/content/common/documents';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

import { navigationItems, type NavigationPageId } from '../../routing/navigation';
import LanguageSwitcher from '../language-switcher';

const navigationIcons = {
  home: HouseIcon,
  experience: UserIcon,
  projects: BriefcaseIcon,
  research: MicroscopeIcon,
  software: CodeIcon,
  contact: EnvelopeSimpleIcon,
} as const;

interface MobileNavigationProps {
  siteName: string;
  shortSiteName: string;
  currentLanguage: SupportedLanguage;
  currentPageId?: NavigationPageId;
}

export default function MobileNavigation({ siteName, shortSiteName, currentLanguage, currentPageId }: MobileNavigationProps) {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const curriculumVitae = curriculumVitaeDocuments[currentLanguage];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('navigation.mobile.open', {
            lng: currentLanguage,
          })}
          className="text-brand-ink hover:bg-brand-hero hover:text-brand-primary focus-visible:ring-brand-primary/50 size-11 rounded-sm shadow-none"
        >
          <ListIcon aria-hidden="true" size={24} weight="bold" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        showCloseButton={false}
        className="bg-brand-dark text-brand-background shadow-elevated h-svh w-full max-w-none gap-0 border-l border-white/20 p-0 sm:max-w-none"
      >
        <SheetHeader className="relative grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 border-b border-white/20 px-6 py-5 pr-4 text-left">
          <SheetTitle className="text-brand-background m-0 grid min-w-0 gap-1">
            <span className="text-xl leading-none font-bold tracking-[-0.035em]">{shortSiteName}</span>

            <span className="text-brand-background/85 truncate text-xs leading-tight font-medium tracking-[-0.01em]">{siteName}</span>
          </SheetTitle>

          <LanguageSwitcher
            variant="inverse"
            onNavigate={() => {
              setIsOpen(false);
            }}
          />

          <SheetClose asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={t('navigation.mobile.close', {
                lng: currentLanguage,
              })}
              className="text-brand-background hover:text-brand-background size-11 rounded-sm shadow-none hover:bg-white/10 focus-visible:ring-white/70"
            >
              <XIcon aria-hidden="true" size={24} weight="regular" />
            </Button>
          </SheetClose>

          <SheetDescription className="sr-only">
            {t('navigation.mobile.description', {
              lng: currentLanguage,
            })}
          </SheetDescription>
        </SheetHeader>

        <nav
          aria-label={t('navigation.primaryLabel', {
            lng: currentLanguage,
          })}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6"
        >
          <ul className="m-0 grid list-none gap-1 p-0">
            {navigationItems.map((item) => {
              const isCurrentPage = currentPageId === item.id;

              const NavigationIcon = navigationIcons[item.id];

              return (
                <li key={item.id} className="m-0">
                  <Link
                    to={item.routes[currentLanguage]}
                    aria-current={isCurrentPage ? 'page' : undefined}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                    className={cn(
                      'ease-standard relative grid min-h-12 grid-cols-[1.5rem_minmax(0,1fr)] items-center gap-4 px-3 py-3 text-base no-underline transition-colors duration-150 focus-visible:ring-[3px] focus-visible:ring-white/70 focus-visible:outline-none',
                      isCurrentPage
                        ? 'text-brand-background bg-white/10 font-semibold'
                        : 'text-brand-background/90 hover:text-brand-background font-medium hover:bg-white/10',
                    )}
                  >
                    <NavigationIcon aria-hidden="true" size={22} weight={isCurrentPage ? 'bold' : 'regular'} />

                    <span>
                      {t(item.labelKey, {
                        lng: currentLanguage,
                      })}
                    </span>

                    {isCurrentPage ? <span aria-hidden="true" className="absolute right-3 bottom-0 left-3 h-px bg-white" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="px-6 pb-8">
          <div className="border-t border-white/20 pt-5">
            <Button
              asChild
              variant="ghost"
              className="text-brand-background hover:text-brand-background h-12 w-full justify-start rounded-sm px-3 text-base font-medium shadow-none hover:bg-white/10 focus-visible:ring-white/70"
            >
              <a
                href={curriculumVitae.href}
                download={curriculumVitae.downloadName}
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                <DownloadSimpleIcon aria-hidden="true" size={22} weight="regular" />

                <span>
                  {t('navigation.mobile.cvLabel', {
                    lng: currentLanguage,
                  })}
                </span>
              </a>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
