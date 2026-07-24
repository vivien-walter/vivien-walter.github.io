import type { ExperienceExpertise } from "@/content/experience/page";

type ExperienceExpertiseBandProps = {
  readonly items: readonly ExperienceExpertise[];
};

function ExperienceExpertiseBand({
  items,
}: ExperienceExpertiseBandProps) {
  return (
    <div className="bg-brand-primary text-white">
      <ul
        className={[
          "mx-auto grid w-full max-w-editorial",
          "list-none gap-x-8 gap-y-10 px-page py-9",
          "sm:py-10 md:grid-cols-2",
          "lg:grid-cols-4 lg:gap-x-10 lg:py-12",
        ].join(" ")}
      >
        {items.map((item) => {
          const ExpertiseIcon = item.icon;

          return (
            <li
              key={item.id}
              className="m-0 grid min-w-0 content-start gap-4"
            >
              <ExpertiseIcon
                aria-hidden="true"
                className="size-12 justify-self-center text-white"
                weight="regular"
              />

              <div className="min-w-0 text-left">
                <h2
                  className={[
                    "!m-0 !text-base !font-bold",
                    "!leading-heading !tracking-[-0.01em]",
                    "!text-white",
                  ].join(" ")}
                >
                  {item.title}
                </h2>

                <p
                  className={[
                    "!mt-2 !mb-0 text-sm leading-body",
                    "text-white/85",
                  ].join(" ")}
                >
                  {item.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ExperienceExpertiseBand;