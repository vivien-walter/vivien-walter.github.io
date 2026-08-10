import { type ComponentProps, type KeyboardEvent, useRef } from 'react';

import { SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { SoftwarePageContent } from '@/content/software/page';
import { cn } from '@/lib/utils';

import type { SoftwareKind } from './helpers';
import SoftwareControls from './software-controls';

type HeaderProps = {
  readonly content: SoftwarePageContent['catalog'];
  readonly titleId: string;
  readonly panelId: string;
  readonly softwareTabId: string;
  readonly webApplicationsTabId: string;
  readonly librariesTabId: string;
  readonly activeKind: SoftwareKind;
  readonly controls: ComponentProps<typeof SoftwareControls>;
  readonly onKindChange: (kind: SoftwareKind) => void;
};

const softwareKinds = ['software', 'web-application', 'library'] as const satisfies readonly SoftwareKind[];

const tabClassName =
  'relative min-h-12 shrink-0 rounded-none border-0 bg-transparent px-1 py-3 text-sm font-semibold text-muted-foreground shadow-none hover:bg-transparent hover:text-brand-primary focus-visible:bg-transparent';

const activeTabClassName =
  'text-brand-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:z-10 after:h-0.5 after:bg-brand-primary';

export default function Header({
  content,
  titleId,
  panelId,
  softwareTabId,
  webApplicationsTabId,
  librariesTabId,
  activeKind,
  controls,
  onKindChange,
}: HeaderProps) {
  const softwareTabRef = useRef<HTMLButtonElement>(null);
  const webApplicationsTabRef = useRef<HTMLButtonElement>(null);
  const librariesTabRef = useRef<HTMLButtonElement>(null);

  function activateTab(kind: SoftwareKind, focusTab: boolean) {
    onKindChange(kind);

    if (!focusTab) {
      return;
    }

    const target =
      kind === 'software' ? softwareTabRef.current : kind === 'web-application' ? webApplicationsTabRef.current : librariesTabRef.current;

    target?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const activeIndex = softwareKinds.indexOf(activeKind);

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        activateTab(softwareKinds[(activeIndex - 1 + softwareKinds.length) % softwareKinds.length], true);
        break;

      case 'ArrowRight':
        event.preventDefault();
        activateTab(softwareKinds[(activeIndex + 1) % softwareKinds.length], true);
        break;

      case 'Home':
        event.preventDefault();
        activateTab('software', true);
        break;

      case 'End':
        event.preventDefault();
        activateTab('library', true);
        break;
    }
  }

  return (
    <>
      <SectionHeader className="mb-8 sm:mb-10">
        <SectionTitle id={titleId}>{content.sectionTitle}</SectionTitle>

        <SectionDescription>{content.description}</SectionDescription>
      </SectionHeader>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <div role="tablist" aria-label={content.sectionTitle} className="order-2 flex min-w-0 items-end gap-7 overflow-x-auto sm:gap-10 lg:order-1">
          <Button
            ref={softwareTabRef}
            id={softwareTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeKind === 'software'}
            aria-controls={panelId}
            tabIndex={activeKind === 'software' ? 0 : -1}
            className={cn(tabClassName, activeKind === 'software' && activeTabClassName)}
            onClick={() => {
              activateTab('software', false);
            }}
            onKeyDown={handleTabKeyDown}
          >
            {content.tabs.software}
          </Button>

          <Button
            ref={webApplicationsTabRef}
            id={webApplicationsTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeKind === 'web-application'}
            aria-controls={panelId}
            tabIndex={activeKind === 'web-application' ? 0 : -1}
            className={cn(tabClassName, activeKind === 'web-application' && activeTabClassName)}
            onClick={() => {
              activateTab('web-application', false);
            }}
            onKeyDown={handleTabKeyDown}
          >
            {content.tabs.webApplications}
          </Button>

          <Button
            ref={librariesTabRef}
            id={librariesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeKind === 'library'}
            aria-controls={panelId}
            tabIndex={activeKind === 'library' ? 0 : -1}
            className={cn(tabClassName, activeKind === 'library' && activeTabClassName)}
            onClick={() => {
              activateTab('library', false);
            }}
            onKeyDown={handleTabKeyDown}
          >
            {content.tabs.libraries}
          </Button>
        </div>

        <div className="order-1 mb-4 flex justify-end lg:order-2 lg:mb-2">
          <SoftwareControls {...controls} />
        </div>
      </div>
    </>
  );
}
