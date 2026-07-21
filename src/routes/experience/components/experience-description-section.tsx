import {
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/shared/components/section-header";

import type { ExperienceDescriptionContent } from "../data/experience-content.types";

const EMPTY_PARAGRAPHS: readonly string[] = [];

type ExperienceDescriptionSectionProps = {
  readonly description?: ExperienceDescriptionContent;
  readonly idPrefix: string;
  readonly title: string;
};

function ExperienceDescriptionSection({
  description,
  idPrefix,
  title,
}: ExperienceDescriptionSectionProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [textHeight, setTextHeight] = useState<number>();
  const [hasImageError, setHasImageError] = useState(false);

  const paragraphs =
    description?.paragraphs ?? EMPTY_PARAGRAPHS;
  const image = description?.image;
  const showImage = image !== undefined && !hasImageError;
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
      window.addEventListener("resize", updateTextHeight);

      return () => {
        window.removeEventListener(
          "resize",
          updateTextHeight,
        );
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
              onError={() => setHasImageError(true)}
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

export default ExperienceDescriptionSection;