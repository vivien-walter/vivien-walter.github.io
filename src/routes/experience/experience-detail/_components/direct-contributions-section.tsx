import { Section, SectionHeader, SectionTitle } from '@/components/section';

type DirectContribution = {
  readonly label: string;
  readonly text: string;
};

type DirectContributionsSectionProps = {
  readonly idPrefix: string;
  readonly items?: readonly DirectContribution[];
  readonly title: string;
};

export default function DirectContributionsSection({ idPrefix, items, title }: DirectContributionsSectionProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const titleId = `${idPrefix}-direct-contributions-title`;

  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby={titleId}>
      <SectionHeader className="mb-8">
        <SectionTitle id={titleId}>{title}</SectionTitle>
      </SectionHeader>

      <ul className="marker:text-copper !m-0 grid list-disc gap-3 !pl-6">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="text-foreground !m-0 pl-1">
            <strong className="text-brand-ink font-bold">{item.label}</strong>

            {' : '}

            {item.text}
          </li>
        ))}
      </ul>
    </Section>
  );
}
