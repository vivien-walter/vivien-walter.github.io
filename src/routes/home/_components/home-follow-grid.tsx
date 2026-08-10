import { ArrowSquareOutIcon } from '@phosphor-icons/react';

import { InteractiveCard } from '@/components/interactive-card';
import { Card } from '@/components/ui/card';
import type { HomeFollowContent } from '@/content/home/home';
import { cn } from '@/lib/utils';

type HomeFollowGridProps = {
  readonly content: HomeFollowContent;
};

function HomeFollowGrid({ content }: HomeFollowGridProps) {
  const LocationIcon = content.location.icon;

  const cardClassName = 'h-full min-h-40 gap-0 rounded-lg py-0 border-border-strong bg-brand-background shadow-none';

  return (
    <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
      <li className="m-0 min-w-0">
        <Card className={cn(cardClassName, 'ease-standard transition-transform duration-200 hover:-translate-y-1 motion-reduce:hover:translate-y-0')}>
          <span className="text-brand-primary flex flex-1 items-center justify-center px-5 pt-7 pb-4">
            <LocationIcon aria-hidden="true" className="size-12" weight="regular" />
          </span>

          <span className="text-brand-ink flex min-h-14 items-center justify-center px-5 py-3 text-center font-semibold">
            {content.location.label}
          </span>
        </Card>
      </li>

      {content.links.map((link) => {
        const ResourceIcon = link.icon;

        return (
          <li key={link.id} className="m-0 min-w-0">
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-external="true"
              className="group text-brand-ink focus-visible:ring-ring/50 block h-full rounded-lg no-underline focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              <InteractiveCard className={cardClassName}>
                <span className="text-brand-primary group-hover:text-brand-dark flex flex-1 items-center justify-center px-5 pt-7 pb-4 transition-colors duration-200">
                  <ResourceIcon aria-hidden="true" className="size-12" weight="regular" />
                </span>

                <span className="text-brand-ink group-hover:text-brand-primary flex min-h-14 items-center justify-center px-5 py-3 text-center transition-colors duration-200">
                  <span className="inline-flex items-center gap-1.5 text-sm leading-none font-semibold">
                    <span>{link.label}</span>

                    <ArrowSquareOutIcon aria-hidden="true" className="size-4 shrink-0" weight="bold" />
                  </span>
                </span>
              </InteractiveCard>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default HomeFollowGrid;
