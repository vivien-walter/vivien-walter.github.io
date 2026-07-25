import { ArrowRightIcon } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { getPageRoute } from '@/app/routing/navigation';
import { Button } from '@/components/ui/button';
import type { HomeResearchAxis } from '@/content/home/home';
import { cn } from '@/lib/utils';
import type { SupportedLanguage } from '@/types/localization';

type ResearchAxisListProps = {
  readonly items: readonly HomeResearchAxis[];
  readonly language: SupportedLanguage;
};

function ResearchAxisList({ items, language }: ResearchAxisListProps) {
  const { t } = useTranslation();

  const researchRoute = getPageRoute('research', language);

  return (
    <ul className={cn('m-0 grid list-none p-0', 'md:grid-cols-2 lg:grid-cols-4')}>
      {items.map((axis, index) => {
        const Icon = axis.icon;
        const titleId = `home-research-axis-${axis.id}`;

        return (
          <li
            key={axis.id}
            className={cn(
              'border-border m-0 border-t py-7',
              'first:border-t-0 first:pt-0',
              'last:pb-0',
              'md:border-t-0 md:px-6 md:py-0',
              index % 2 === 0 ? 'md:pl-0' : 'md:border-l md:pr-0',
              index >= 2 && 'md:mt-10',
              'lg:mt-0 lg:border-l lg:px-7',
              index === 0 && 'lg:border-l-0 lg:pl-0',
              index === items.length - 1 && 'lg:pr-0',
            )}
          >
            <article className="flex h-full min-w-0 flex-col items-start" aria-labelledby={titleId}>
              <Icon aria-hidden="true" className="text-brand-primary size-8 self-center" weight="regular" />

              <h3 id={titleId} className={cn('!mx-0 !mt-4 !mb-0', 'text-md leading-heading font-bold', 'text-brand-ink tracking-[-0.015em]')}>
                {axis.title}
              </h3>

              <p className={cn('!mx-0 !mt-4 !mb-0', 'text-sm leading-relaxed', 'text-muted-foreground')}>{axis.description}</p>

              <div className="mt-auto pt-6">
                <Button
                  asChild
                  variant="ghost"
                  className={cn('group -ml-2 min-h-10 w-fit gap-0 px-2', 'text-brand-primary', 'hover:bg-action-soft', 'hover:text-brand-primary')}
                >
                  <Link to={researchRoute}>
                    <span
                      className={cn(
                        'max-w-0 -translate-x-2 overflow-hidden',
                        'opacity-0',
                        'transition-[max-width,margin,opacity,transform]',
                        'duration-500 ease-out',
                        'group-hover:mr-2 group-hover:max-w-40',
                        'group-hover:translate-x-0 group-hover:opacity-100',
                        'group-focus-visible:mr-2',
                        'group-focus-visible:max-w-40',
                        'group-focus-visible:translate-x-0',
                        'group-focus-visible:opacity-100',
                        'motion-reduce:transition-none',
                        'motion-reduce:transform-none',
                      )}
                    >
                      {t('actions.learnMore', {
                        lng: language,
                      })}
                    </span>

                    <ArrowRightIcon aria-hidden="true" weight="bold" />
                  </Link>
                </Button>
              </div>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

export default ResearchAxisList;
