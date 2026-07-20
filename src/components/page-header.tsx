import { cn } from "../lib/utils";
import { Separator } from "./ui/separator";

type PageHeaderProps = {
  readonly eyebrow: string;
  readonly title: string;
  readonly introduction: string | readonly string[];
};

function PageHeader({ eyebrow, title, introduction }: PageHeaderProps) {
  const paragraphs =
    typeof introduction === "string" ? [introduction] : introduction;

  return (
    <header className="mb-16 max-w-readable sm:mb-20 lg:mb-24">
      <div className="mb-5 flex items-center gap-3">
        <Separator
          aria-hidden="true"
          className="w-10 shrink-0 bg-copper"
        />

        <p
          className={cn(
            "!m-0 font-mono text-xs font-semibold",
            "tracking-[0.08em] text-copper-strong uppercase",
          )}
        >
          {eyebrow}
        </p>
      </div>

      <h1
        id="page-title"
        className={cn(
          "!m-0 max-w-[18ch]",
          "!text-[clamp(2.25rem,1.55rem+2.5vw,4rem)]",
          "!leading-tight !tracking-[-0.04em] text-heading",
        )}
      >
        {title}
      </h1>

      <div className="mt-6 max-w-[42rem] text-md text-muted-foreground">
        {paragraphs.map((paragraph, index) => (
          <p
            className={cn(
              "!m-0",
              index > 0 && "!mt-4",
            )}
            key={`${index}-${paragraph}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}

export default PageHeader;