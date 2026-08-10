import { WarningIcon } from '@phosphor-icons/react';

interface DisclaimerBannerProps {
  readonly text?: string;
}

export default function DisclaimerBanner({ text }: DisclaimerBannerProps) {
  const disclaimer = text?.trim();

  if (!disclaimer) {
    return null;
  }

  return (
    <aside className="bg-brand-accent py-10 sm:py-12">
      <div className="max-w-editorial px-page mx-auto w-full">
        <div className="grid items-center gap-5 sm:grid-cols-[auto_minmax(0,1fr)]">
          <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-md bg-white/15 text-white">
            <WarningIcon className="size-8" weight="regular" />
          </span>

          <p className="!m-0 text-base leading-relaxed font-semibold text-white">{disclaimer}</p>
        </div>
      </div>
    </aside>
  );
}
