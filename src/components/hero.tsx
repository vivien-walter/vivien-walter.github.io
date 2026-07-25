import type { ComponentProps } from 'react';

import Breadcrumbs, { type BreadcrumbItemData } from '@/components/breadcrumbs';
import { cn } from '@/lib/utils';

type HeroBreadcrumbsProps = ComponentProps<'div'> & {
  readonly ariaLabel: string;
  readonly items: readonly BreadcrumbItemData[];
};

type HeroImageProps = Omit<ComponentProps<'img'>, 'alt' | 'src'> & {
  readonly alt: string;
  readonly src: string;
  readonly objectPosition?: string;
};

function Hero({ className, ...props }: ComponentProps<'section'>) {
  return <section data-slot="hero" className={cn('border-border bg-brand-hero border-b', className)} {...props} />;
}

function HeroContainer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-container"
      className={cn('max-w-editorial mx-auto grid w-full', 'lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)]', className)}
      {...props}
    />
  );
}

function HeroContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-content"
      className={cn('px-page min-w-0', 'pt-5 pb-8', 'sm:pt-6 sm:pb-10', 'lg:pt-6 lg:pb-12', 'xl:pb-14', className)}
      {...props}
    />
  );
}

function HeroBreadcrumbs({ ariaLabel, className, items, ...props }: HeroBreadcrumbsProps) {
  return (
    <div data-slot="hero-breadcrumbs" className={cn('min-h-6', className)} {...props}>
      <Breadcrumbs ariaLabel={ariaLabel} items={items} />
    </div>
  );
}

function HeroHeader({ className, ...props }: ComponentProps<'header'>) {
  return <header data-slot="hero-header" className={cn('max-w-readable', className)} {...props} />;
}

function HeroEyebrow({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="hero-eyebrow"
      className={cn('!m-0 mb-3', 'font-mono text-xs font-semibold uppercase', 'text-brand-accent tracking-[0.12em]', 'sm:mb-4', className)}
      {...props}
    />
  );
}

function HeroTitle({ className, ...props }: ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="hero-title"
      className={cn(
        '!m-0 max-w-[18ch]',
        '!text-[clamp(2.25rem,1.55rem+2.5vw,4rem)]',
        '!leading-tight !tracking-[-0.04em]',
        'text-brand-ink',
        className,
      )}
      {...props}
    />
  );
}

function HeroDescription({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="hero-description" className={cn('mt-6 max-w-[42rem]', 'text-md text-muted-foreground', className)} {...props} />;
}

function HeroActions({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="hero-actions" className={cn('mt-8 flex flex-wrap items-center', 'gap-3 sm:gap-4', className)} {...props} />;
}

function HeroFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div data-slot="hero-footer" className={cn('border-border mt-10 border-t pt-6', 'sm:mt-12 sm:pt-8', className)} {...props} />;
}

function HeroMedia({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="hero-media"
      className={cn('bg-brand-background min-h-64 min-w-0', 'sm:min-h-80', 'lg:border-border lg:min-h-full lg:border-l', className)}
      {...props}
    />
  );
}

function HeroImage({ alt, className, decoding, objectPosition, src, style, ...props }: HeroImageProps) {
  return (
    <img
      data-slot="hero-image"
      src={src}
      alt={alt}
      className={cn('h-full w-full object-cover', className)}
      style={{
        ...style,
        objectPosition: objectPosition ?? style?.objectPosition ?? 'center',
      }}
      decoding={decoding ?? 'async'}
      {...props}
    />
  );
}

export {
  Hero,
  HeroActions,
  HeroBreadcrumbs,
  HeroContainer,
  HeroContent,
  HeroDescription,
  HeroEyebrow,
  HeroFooter,
  HeroHeader,
  HeroImage,
  HeroMedia,
  HeroTitle,
};
