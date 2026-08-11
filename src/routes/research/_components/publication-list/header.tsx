import { type ComponentProps, type KeyboardEvent, useRef } from 'react';

import { SectionDescription, SectionHeader, SectionTitle } from '@/components/section';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import type { PublicationKind } from './helpers';
import PublicationControls from './publication-controls';

type HeaderProps = {
  readonly activeKind: PublicationKind;
  readonly articlesTabId: string;
  readonly controls: ComponentProps<typeof PublicationControls>;
  readonly description?: string;
  readonly onKindChange: (kind: PublicationKind) => void;
  readonly panelId: string;
  readonly tabs: {
    readonly articles: string;
    readonly theses: string;
  };
  readonly thesesTabId: string;
  readonly title: string;
  readonly titleId: string;
};

const tabClassName =
  'text-muted-foreground hover:text-brand-primary relative min-h-12 shrink-0 rounded-none border-0 bg-transparent px-1 py-3 text-sm font-semibold shadow-none hover:bg-transparent focus-visible:bg-transparent';

const activeTabClassName =
  'text-brand-primary after:bg-brand-primary after:absolute after:right-0 after:bottom-0 after:left-0 after:z-10 after:h-0.5';

export default function Header({
  activeKind,
  articlesTabId,
  controls,
  description,
  onKindChange,
  panelId,
  tabs,
  thesesTabId,
  title,
  titleId,
}: HeaderProps) {
  const articlesTabRef = useRef<HTMLButtonElement>(null);
  const thesesTabRef = useRef<HTMLButtonElement>(null);

  function activateTab(kind: PublicationKind, focusTab: boolean) {
    onKindChange(kind);

    if (!focusTab) {
      return;
    }

    const target = kind === 'article' ? articlesTabRef.current : thesesTabRef.current;

    target?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowRight':
        event.preventDefault();
        activateTab(activeKind === 'article' ? 'thesis' : 'article', true);
        break;

      case 'Home':
        event.preventDefault();
        activateTab('article', true);
        break;

      case 'End':
        event.preventDefault();
        activateTab('thesis', true);
        break;
    }
  }

  return (
    <>
      <SectionHeader className="mb-7 sm:mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>

        {description ? <SectionDescription>{description}</SectionDescription> : null}
      </SectionHeader>

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
        <div role="tablist" aria-label={title} className="order-2 flex min-w-0 items-end gap-7 overflow-x-auto sm:gap-10 lg:order-1">
          <Button
            ref={articlesTabRef}
            id={articlesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeKind === 'article'}
            aria-controls={panelId}
            tabIndex={activeKind === 'article' ? 0 : -1}
            className={cn(tabClassName, activeKind === 'article' && activeTabClassName)}
            onClick={() => {
              activateTab('article', false);
            }}
            onKeyDown={handleTabKeyDown}
          >
            {tabs.articles}
          </Button>

          <Button
            ref={thesesTabRef}
            id={thesesTabId}
            type="button"
            role="tab"
            variant="ghost"
            aria-selected={activeKind === 'thesis'}
            aria-controls={panelId}
            tabIndex={activeKind === 'thesis' ? 0 : -1}
            className={cn(tabClassName, activeKind === 'thesis' && activeTabClassName)}
            onClick={() => {
              activateTab('thesis', false);
            }}
            onKeyDown={handleTabKeyDown}
          >
            {tabs.theses}
          </Button>
        </div>

        <div className="order-1 mb-4 flex justify-end lg:order-2 lg:mb-2">
          <PublicationControls {...controls} />
        </div>
      </div>
    </>
  );
}
