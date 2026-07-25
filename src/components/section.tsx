import { type ComponentProps, createContext, createElement, type ElementType, type ReactNode, useContext } from 'react';

import { cn } from '@/lib/utils';

type SectionHeaderVariant = 'default' | 'inverse';

type SectionProps = ComponentProps<'section'> & {
  readonly contained?: boolean;
  readonly containerClassName?: string;
};

type SectionHeaderProps = ComponentProps<'header'> & {
  readonly variant?: SectionHeaderVariant;
};

type SectionTitleProps = Omit<ComponentProps<'h2'>, 'children'> & {
  readonly children: ReactNode;
  readonly headingLevel?: 2 | 3;
  readonly showAccent?: boolean;
};

const SectionHeaderVariantContext = createContext<SectionHeaderVariant>('default');

function Section({ children, className, contained = true, containerClassName, ...props }: SectionProps) {
  return (
    <section data-slot="section" className={cn(className)} {...props}>
      {contained ? (
        <div data-slot="section-container" className={cn('max-w-editorial px-page mx-auto w-full', containerClassName)}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}

function SectionHeader({ className, variant = 'default', ...props }: SectionHeaderProps) {
  return (
    <SectionHeaderVariantContext.Provider value={variant}>
      <header
        data-slot="section-header"
        data-variant={variant}
        className={cn('flex flex-col gap-y-5', 'sm:flex-row sm:flex-wrap sm:items-start', 'sm:gap-x-6', className)}
        {...props}
      />
    </SectionHeaderVariantContext.Provider>
  );
}

function SectionTitle({ children, className, headingLevel = 2, showAccent = true, ...props }: SectionTitleProps) {
  const variant = useContext(SectionHeaderVariantContext);

  const Heading = `h${headingLevel}` as ElementType;

  return (
    <div data-slot="section-heading" className="min-w-0 sm:flex-1">
      {createElement(
        Heading,
        {
          ...props,
          'data-slot': 'section-title',
          className: cn(
            '!m-0 text-xl font-bold',
            'leading-heading',
            'tracking-[-0.025em]',
            variant === 'inverse' ? '!text-white' : 'text-brand-ink',
            className,
          ),
        },
        children,
      )}

      {showAccent ? <span data-slot="section-accent" aria-hidden="true" className="bg-brand-accent mt-3 block h-0.5 w-12" /> : null}
    </div>
  );
}

function SectionAction({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="section-action" className={cn('flex shrink-0 items-start', 'sm:ml-auto sm:justify-end', className)} {...props} />;
}

function SectionDescription({ className, ...props }: ComponentProps<'p'>) {
  const variant = useContext(SectionHeaderVariantContext);

  return (
    <p
      data-slot="section-description"
      className={cn(
        '!m-0 w-full text-base',
        'sm:shrink-0 sm:basis-full',
        variant === 'inverse' ? 'font-medium !text-white/90' : 'text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
}

export { Section, SectionAction, SectionDescription, SectionHeader, SectionTitle };
