import {
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import SectionHeader from "./section-header";

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

function DetailDescriptionSection({
  description,
  idPrefix,
  title,
}: DetailDescriptionSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<number>();
  const [failedImageSrc, setFailedImageSrc] =
    useState<string>();

  const paragraphs =
    description?.paragraphs ?? EMPTY_PARAGRAPHS;

  const image = description?.image;

  const showImage =
    image !== undefined &&
    failedImageSrc !== image.src;

  const titleId = `${idPrefix}-description-title`;

  useEffect(() => {
    const textElement = textRef.current;

    if (!textElement) {
      return;
    }

    const updateTextHeight = () => {
      const measuredHeight = Math.ceil(
        textElement.getBoundingClientRect().height,
      );

      setTextHeight(
        measuredHeight > 0 ? measuredHeight : undefined,
      );
    };

    updateTextHeight();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener(
        "resize",
        updateTextHeight,
      );

      return () => {
        window.removeEventListener(
          "resize",
          updateTextHeight,
        );
      };
    }

    const resizeObserver =
      new ResizeObserver(updateTextHeight);

    resizeObserver.observe(textElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, [paragraphs, showImage]);

  if (paragraphs.length === 0) {
    return null;
  }

  return (
    <section
      className="pb-12 sm:pb-14 lg:pb-16"
      aria-labelledby={titleId}
    >
      <SectionHeader
        title={title}
        titleId={titleId}
        className="mb-8"
      />

      <div className="flow-root">
        {showImage ? (
          <figure
            className={cn(
              "float-right m-0 mb-4 ml-5",
              "w-1/2 max-w-[50%]",
              "sm:mb-5 sm:ml-8",
            )}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={cn(
                "mx-auto block h-auto w-full",
                "rounded-lg border border-border-strong",
                "object-contain",
              )}
              style={{
                maxHeight:
                  textHeight !== undefined
                    ? `${textHeight}px`
                    : undefined,
                objectPosition:
                  image.objectPosition ?? "center",
              }}
              loading="lazy"
              decoding="async"
              onError={() => {
                setFailedImageSrc(image.src);
              }}
            />
          </figure>
        ) : null}

        <div
          ref={textRef}
          className="text-foreground"
        >
          {paragraphs.map(
            (paragraph, paragraphIndex) => (
              <p
                className={cn(
                  "!mt-0",
                  paragraphIndex ===
                    paragraphs.length - 1
                    ? "!mb-0"
                    : "!mb-5",
                )}
                key={`${paragraphIndex}-${paragraph}`}
              >
                {paragraph}
              </p>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default DetailDescriptionSection;