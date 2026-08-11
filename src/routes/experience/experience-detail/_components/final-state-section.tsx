import { Section, SectionHeader, SectionTitle } from '@/components/section';
import { Card } from '@/components/ui/card';
import { getExperienceDetailById } from '@/content/experience/experiences/page';
import { cn } from '@/lib/utils';

type ExperienceDetail = NonNullable<ReturnType<typeof getExperienceDetailById>>;

type FinalStateSectionProps = {
  readonly finalState: NonNullable<ExperienceDetail['finalState']>;
  readonly idPrefix: string;
};

export default function FinalStateSection({ finalState, idPrefix }: FinalStateSectionProps) {
  return (
    <Section className="py-12 sm:py-14 lg:py-16" aria-labelledby={`${idPrefix}-final-state-title`}>
      <SectionHeader className="mb-8">
        <SectionTitle id={`${idPrefix}-final-state-title`}>{finalState.title}</SectionTitle>
      </SectionHeader>

      <Card
        className={cn(
          'shadow-subtle gap-0 rounded-lg py-0',
          finalState.completed ? 'border-brand-primary/30 bg-action-soft' : 'border-brand-accent/30 bg-copper-soft',
        )}
      >
        <p className="max-w-readable text-brand-ink !m-0 px-5 py-6 sm:px-6 sm:py-7">{finalState.text}</p>
      </Card>
    </Section>
  );
}
