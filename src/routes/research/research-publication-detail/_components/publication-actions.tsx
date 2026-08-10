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

function PublicationActions({ website, pdf, websiteLabel, pdfLabel }: PublicationActionsProps) {
  if (!website && !pdf) {
    return null;
  }

  return (
    <div className="pb-8 sm:pb-10">
      <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
        {website ? (
          <li className="m-0 min-w-0">
            <a
              href={website.href}
              target="_blank"
              rel="noopener noreferrer"
              data-external="true"
              className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <InteractiveCard
                interaction="group"
                className="border-border-strong bg-brand-background h-full min-h-28 gap-0 overflow-hidden py-0 shadow-none"
              >
                <span className="grid h-full min-w-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 p-5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'text-brand-primary flex size-12 shrink-0 items-center justify-center transition-colors duration-200',
                      website.iconSrc ? 'rounded-none bg-transparent' : 'bg-action-soft rounded-md',
                    )}
                  >
                    {website.iconSrc ? (
                      <img src={website.iconSrc} alt="" className="max-h-10 max-w-12 object-contain" />
                    ) : (
                      <ArrowSquareOutIcon className="size-6" weight="regular" />
                    )}
                  </span>

                  <span className="leading-heading text-brand-ink group-hover:text-brand-primary min-w-0 font-semibold transition-colors duration-200">
                    {websiteLabel}
                  </span>
                </span>
              </InteractiveCard>
            </a>
          </li>
        ) : null}

        {pdf ? (
          <li className="m-0 min-w-0">
            <a
              href={pdf.href}
              download={pdf.downloadName}
              className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <InteractiveCard
                interaction="group"
                className="border-border-strong bg-brand-background h-full min-h-28 gap-0 overflow-hidden py-0 shadow-none"
              >
                <span className="grid h-full min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-4 p-5">
                  <span
                    aria-hidden="true"
                    className="text-brand-primary flex size-12 shrink-0 items-center justify-center transition-colors duration-200"
                  >
                    <DownloadSimpleIcon className="size-6" weight="regular" />
                  </span>

                  <span className="leading-heading text-brand-ink group-hover:text-brand-primary min-w-0 font-semibold transition-colors duration-200">
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
