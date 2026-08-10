import { ArrowRightIcon, BriefcaseIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import { Section } from '@/components/section';
import { Button } from '@/components/ui/button';
import type { ExperiencePageContent } from '@/content/experience/page';
import type { SupportedLanguage } from '@/types/localization';

type ExperienceContactBannerProps = {
  readonly content: ExperiencePageContent['contactBanner'];
  readonly language: SupportedLanguage;
};

function ExperienceContactBanner({ content, language }: ExperienceContactBannerProps) {
  return (
    <Section className="bg-brand-accent py-10 sm:py-12">
      <div className="rounded-sm border border-white/70 bg-white/10 px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
          <div className="grid items-center gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
            <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
              <BriefcaseIcon className="size-8" weight="regular" />
            </span>

            <p className="sm:text-md !m-0 max-w-[42rem] text-base leading-relaxed font-semibold text-white">{content.message}</p>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="!text-brand-accent hover:!text-brand-accent min-h-11 w-full justify-between rounded-sm border-white !bg-white shadow-none hover:!bg-white/90 lg:w-64"
          >
            <Link to={getPageRoute('contact', language)}>
              <span>{content.actionLabel}</span>

              <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}

export default ExperienceContactBanner;
