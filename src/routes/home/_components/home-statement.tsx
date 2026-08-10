import { ArrowRightIcon } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import { Button } from '@/components/ui/button';
import type { HomeStatementContent } from '@/content/home/home';
import type { SupportedLanguage } from '@/types/localization';

type HomeStatementProps = {
  readonly content: HomeStatementContent;
  readonly language: SupportedLanguage;
};

function HomeStatement({ content, language }: HomeStatementProps) {
  return (
    <aside className="rounded-sm border border-white/70 bg-white/7 px-6 py-8 text-white sm:px-8 sm:py-9 lg:px-10 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
        <div className="grid items-start gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
          <span aria-hidden="true" className="text-brand-accent block text-5xl leading-none sm:mt-0.5">
            “
          </span>

          <p className="!m-0 max-w-[46rem] text-sm leading-relaxed font-medium text-white sm:text-base">{content.text}</p>
        </div>

        <div className="flex lg:justify-end">
          <Button asChild variant="ghost" size="lg" className="min-h-11 rounded-sm px-2 text-white shadow-none hover:bg-white/10 hover:text-white">
            <Link to={getPageRoute(content.action.pageId, language)}>
              {content.action.label}

              <ArrowRightIcon aria-hidden="true" weight="bold" />
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default HomeStatement;
