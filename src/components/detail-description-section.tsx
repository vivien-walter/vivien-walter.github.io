import { XIcon } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export type DetailDescriptionImage = {
  readonly src: string;
  readonly alt: string;
  readonly objectPosition?: string;
};

export type DetailDescriptionContent = {
  readonly paragraphs: readonly string[];
  readonly image?: DetailDescriptionImage;
};

type DetailDescriptionSectionProps = {
  readonly description?: DetailDescriptionContent;
  readonly idPrefix: string;
  readonly title: string;
};

const EMPTY_PARAGRAPHS: readonly string[] = [];

function DetailDescriptionSection({ description, idPrefix, title }: DetailDescriptionSectionProps) {
  const { t } = useTranslation();

  const textRef = useRef<HTMLDivElement>(null);

  const [textHeight, setTextHeight] = useState<number>();
  const [failedImageSrc, setFailedImageSrc] = useState<string>();

  const paragraphs = description?.paragraphs ?? EMPTY_PARAGRAPHS;
  const image = description?.image;

  const showImage = image !== undefined && failedImageSrc !== image.src;

  const titleId = `${idPrefix}-description-title`;

  useEffect(() => {
    const textElement = textRef.current;

    if (!textElement) {
      return;
    }

    const updateTextHeight = () => {
      const measuredHeight = Math.ceil(textElement.getBoundingClientRect().height);

      setTextHeight(measuredHeight > 0 ? measuredHeight : undefined);
    };

    updateTextHeight();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateTextHeight);

      return () => {
        window.removeEventListener('resize', updateTextHeight);
      };
    }

    const resizeObserver = new ResizeObserver(updateTextHeight);

    resizeObserver.observe(textElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [paragraphs, showImage]);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <Section contained={false} className="pb-12 sm:pb-14 lg:pb-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <div className="flow-root">
        {showImage ? (
          <Dialog>
            <figure className={cn('float-right m-0 mb-4 ml-5', 'w-1/2 max-w-[50%]', 'sm:mb-5 sm:ml-8')}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={t('accessibility.openImage', {
                    alt: image.alt,
                  })}
                  className={cn(
                    'block w-full cursor-zoom-in rounded-lg border-0 bg-transparent p-0',
                    'focus-visible:ring-[3px] focus-visible:outline-none',
                    'focus-visible:ring-ring/50',
                  )}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={cn('mx-auto block h-auto w-full', 'border-border-strong rounded-lg border', 'object-contain')}
                    style={{
                      maxHeight: textHeight !== undefined ? `${textHeight}px` : undefined,
                      objectPosition: image.objectPosition ?? 'center',
                    }}
                    loading="lazy"
                    decoding="async"
                    onError={() => {
                      setFailedImageSrc(image.src);
                    }}
                  />
                </button>
              </DialogTrigger>
            </figure>

            <DialogContent
              aria-describedby={undefined}
              showCloseButton={false}
              className={cn(
                'w-fit max-w-[90vw] gap-0 overflow-hidden p-0',
                'border-border-strong bg-background rounded-lg border',
                'sm:max-w-[90vw]',
              )}
            >
              <figure className="relative m-0 flex max-h-[90dvh] max-w-[90vw] flex-col">
                <DialogClose
                  type="button"
                  aria-label={t('accessibility.closeImage')}
                  className={cn(
                    'absolute top-3 right-3 z-10 inline-flex size-11',
                    'items-center justify-center rounded-md',
                    'bg-heading/85 border border-white/30 text-white',
                    'hover:bg-heading transition-colors',
                    'focus-visible:ring-[3px] focus-visible:outline-none',
                    'focus-visible:ring-white/70',
                  )}
                >
                  <XIcon aria-hidden="true" className="size-5" weight="bold" />
                </DialogClose>

                <img src={image.src} alt="" className="block h-auto max-h-[calc(90dvh-5rem)] w-auto max-w-[90vw] object-contain" decoding="async" />

                <DialogTitle asChild>
                  <figcaption className="border-border text-foreground border-t px-5 py-4 text-center text-sm font-normal">{image.alt}</figcaption>
                </DialogTitle>
              </figure>
            </DialogContent>
          </Dialog>
        ) : null}

        <div ref={textRef} className="text-foreground">
          {paragraphs.map((paragraph, paragraphIndex) => (
            <p className={cn('!mt-0', paragraphIndex === paragraphs.length - 1 ? '!mb-0' : '!mb-5')} key={`${paragraphIndex}-${paragraph}`}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default DetailDescriptionSection;
