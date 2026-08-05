import { ArrowSquareOutIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import type { PublicationPdf, PublicationWebsite } from '@/content/research/publication-content';
import { cn } from '@/lib/utils';

type PublicationActionsProps = {
  readonly website?: PublicationWebsite;
  readonly pdf?: PublicationPdf;
  readonly websiteLabel: string;
  readonly pdfLabel: string;
};

const actionLinkClassName = cn(
  'group block h-full rounded-lg',
  'text-brand-ink no-underline',
  'focus-visible:outline-none',
  'focus-visible:ring-[3px]',
  'focus-visible:ring-ring/50',
  'focus-visible:ring-offset-2',
);

const actionCardClassName = cn('h-full min-h-28 gap-0 overflow-hidden py-0', 'border-border-strong', 'bg-brand-background', 'shadow-none');

const actionIconClassName = cn('flex size-12 shrink-0', 'items-center justify-center', 'text-brand-primary', 'transition-colors duration-200');

function PublicationActions({ website, pdf, websiteLabel, pdfLabel }: PublicationActionsProps) {
  if (!website && !pdf) {
    return null;
  }

  return (
    <div className="pb-8 sm:pb-10">
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
        {website ? (
          <li className="m-0 min-w-0">
            <a href={website.href} target="_blank" rel="noopener noreferrer" data-external="true" className={actionLinkClassName}>
              <InteractiveCard interaction="group" className={actionCardClassName}>
                <span className={cn('grid h-full min-w-0', 'grid-cols-[auto_minmax(0,1fr)_auto]', 'items-center gap-4 p-5')}>
                  <span
                    aria-hidden="true"
                    className={cn(actionIconClassName, website.iconSrc ? 'rounded-none bg-transparent' : 'bg-action-soft rounded-md')}
                  >
                    {website.iconSrc ? (
                      <img src={website.iconSrc} alt="" className="max-h-10 max-w-12 object-contain" />
                    ) : (
                      <ArrowSquareOutIcon className="size-6" weight="regular" />
                    )}
                  </span>

                  <span
                    className={cn(
                      'min-w-0 font-semibold',
                      'leading-heading text-brand-ink',
                      'transition-colors duration-200',
                      'group-hover:text-brand-primary',
                    )}
                  >
                    {websiteLabel}
                  </span>
                </span>
              </InteractiveCard>
            </a>
          </li>
        ) : null}

        {pdf ? (
          <li className="m-0 min-w-0">
            <a href={pdf.href} download={pdf.downloadName} className={actionLinkClassName}>
              <InteractiveCard interaction="group" className={actionCardClassName}>
                <span className={cn('grid h-full min-w-0', 'grid-cols-[auto_minmax(0,1fr)]', 'items-center gap-4 p-5')}>
                  <span aria-hidden="true" className={actionIconClassName}>
                    <DownloadSimpleIcon className="size-6" weight="regular" />
                  </span>

                  <span
                    className={cn(
                      'min-w-0 font-semibold',
                      'leading-heading text-brand-ink',
                      'transition-colors duration-200',
                      'group-hover:text-brand-primary',
                    )}
                  >
                    {pdfLabel}
                  </span>
                </span>
              </InteractiveCard>
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  );
}

export default PublicationActions;
