import { BriefcaseIcon, DownloadSimpleIcon } from '@phosphor-icons/react';

import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { ContactJobSearchContent } from '@/content/contact/contact';
import { cn } from '@/lib/utils';

type JobSearchBannerProps = {
  readonly content: ContactJobSearchContent;
};

function JobSearchBanner({ content }: JobSearchBannerProps) {
  const cvButtonClassName = cn(
    'min-h-11 w-full justify-between',
    'rounded-sm border-white',
    '!text-brand-accent !bg-white shadow-none',
    'hover:!text-brand-accent hover:!bg-white/90',
  );

  return (
    <Section className="bg-brand-accent py-10 sm:py-12">
      <div className={cn('rounded-sm border border-white/70', 'bg-white/10 px-6 py-7', 'sm:px-8 sm:py-8 lg:px-10')}>
        <div className={cn('grid gap-7', 'lg:grid-cols-[minmax(0,1fr)_auto]', 'lg:items-center lg:gap-10')}>
          <div className={cn('grid items-center gap-5', 'sm:grid-cols-[auto_minmax(0,1fr)]')}>
            <span aria-hidden="true" className={cn('flex size-14 shrink-0', 'items-center justify-center rounded-md', 'bg-white/15 text-white')}>
              <BriefcaseIcon className="size-8" weight="regular" />
            </span>

            <p className={cn('!m-0 max-w-[42rem]', 'text-base leading-relaxed font-semibold', 'sm:text-md text-white')}>{content.message}</p>
          </div>

          <div className={cn('grid gap-3', 'sm:grid-cols-2 lg:w-72 lg:grid-cols-1')}>
            <Button asChild variant="outline" size="lg" className={cvButtonClassName}>
              <a href={content.frenchCvHref} download="vivien-praud-walter-cv-fr.pdf">
                <span>{content.frenchCvLabel}</span>

                <DownloadSimpleIcon aria-hidden="true" className="size-4" weight="bold" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className={cvButtonClassName}>
              <a href={content.englishCvHref} download="vivien-praud-walter-cv-en.pdf">
                <span>{content.englishCvLabel}</span>

                <DownloadSimpleIcon aria-hidden="true" className="size-4" weight="bold" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default JobSearchBanner;
