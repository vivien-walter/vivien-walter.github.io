import enExperienceEntriesJson from "@/locales/en/experience/entries.json";
import enExperienceIndexJson from "@/locales/en/experience/index.json";
import enExperiencePageJson from "@/locales/en/experience/page.json";
import enParallelActivitiesJson from "@/locales/en/experience/parallel-activities.json";
import enPersonalActivitiesJson from "@/locales/en/experience/personal-activities.json";
import frExperienceEntriesJson from "@/locales/fr/experience/entries.json";
import frExperienceIndexJson from "@/locales/fr/experience/index.json";
import frExperiencePageJson from "@/locales/fr/experience/page.json";
import frParallelActivitiesJson from "@/locales/fr/experience/parallel-activities.json";
import frPersonalActivitiesJson from "@/locales/fr/experience/personal-activities.json";
import type {
  ContentId,
  ContentIndex,
} from "@/shared/content/content.types";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type {
  ExperienceCollection,
  ExperienceContent,
  ExperienceExpertiseId,
  ExperiencePageContent,
  ExperienceParallelActivitiesContent,
  ExperienceParallelActivityContent,
  ExperienceParallelActivityId,
  ExperiencePersonalActivitiesContent,
  ExperiencePersonalActivityContent,
  ExperiencePersonalActivityId,
} from "./experience-content.types";

type RawExperiencePageContent = Omit<
  ExperiencePageContent,
  "expertise"
> & {
  readonly expertise: readonly {
    readonly id: string;
    readonly title: string;
    readonly description: string;
  }[];
};

type RawParallelActivitiesContent = {
  readonly order: readonly string[];
  readonly entries: {
    readonly consulting: ExperienceParallelActivityContent;
    readonly "scientific-research": ExperienceParallelActivityContent;
    readonly teaching: ExperienceParallelActivityContent;
  };
};

type RawPersonalActivitiesContent = {
  readonly order: readonly string[];
  readonly entries: {
    readonly music: ExperiencePersonalActivityContent;
    readonly illustrations: ExperiencePersonalActivityContent;
    readonly "science-communication": ExperiencePersonalActivityContent;
  };
};

function isExperienceExpertiseId(
  value: string,
): value is ExperienceExpertiseId {
  return (
    value === "project-leadership" ||
    value === "software-ai" ||
    value === "instrumentation" ||
    value === "collaboration"
  );
}

function isParallelActivityId(
  value: string | undefined,
): value is ExperienceParallelActivityId {
  return (
    value === "consulting" ||
    value === "scientific-research" ||
    value === "teaching"
  );
}

function isPersonalActivityId(
  value: string | undefined,
): value is ExperiencePersonalActivityId {
  return (
    value === "music" ||
    value === "illustrations" ||
    value === "science-communication"
  );
}

function createExperiencePageContent(
  content: RawExperiencePageContent,
): ExperiencePageContent {
  return {
    ...content,
    expertise: content.expertise.map((item) => {
      if (!isExperienceExpertiseId(item.id)) {
        throw new Error(
          `Unknown experience expertise identifier: ${item.id}`,
        );
      }

      return {
        ...item,
        id: item.id,
      };
    }),
  };
}

function createParallelActivitiesContent(
  content: RawParallelActivitiesContent,
): ExperienceParallelActivitiesContent {
  const order = content.order.map((activityId) => {
    if (!isParallelActivityId(activityId)) {
      throw new Error(
        `Unknown parallel activity identifier: ${activityId}`,
      );
    }

    return activityId;
  });

  return {
    order,
    entries: content.entries,
  };
}

function createPersonalActivitiesContent(
  content: RawPersonalActivitiesContent,
): ExperiencePersonalActivitiesContent {
  const order = content.order.map((activityId) => {
    if (!isPersonalActivityId(activityId)) {
      throw new Error(
        `Unknown personal activity identifier: ${activityId}`,
      );
    }

    return activityId;
  });

  return {
    order,
    entries: content.entries,
  };
}

const frExperiencePage = createExperiencePageContent(
  frExperiencePageJson,
);
const enExperiencePage = createExperiencePageContent(
  enExperiencePageJson,
);

const frExperienceIndex = frExperienceIndexJson satisfies ContentIndex;
const enExperienceIndex = enExperienceIndexJson satisfies ContentIndex;

const frExperiences =
  frExperienceEntriesJson satisfies ExperienceCollection;
const enExperiences =
  enExperienceEntriesJson satisfies ExperienceCollection;

const frParallelActivities = createParallelActivitiesContent(
  frParallelActivitiesJson,
);
const enParallelActivities = createParallelActivitiesContent(
  enParallelActivitiesJson,
);

const frPersonalActivities = createPersonalActivitiesContent(
  frPersonalActivitiesJson,
);
const enPersonalActivities = createPersonalActivitiesContent(
  enPersonalActivitiesJson,
);

const localizedExperiencePages: LocalizedContent<ExperiencePageContent> = {
  fr: frExperiencePage,
  en: enExperiencePage,
};

const localizedExperienceIndexes: LocalizedContent<ContentIndex> = {
  fr: frExperienceIndex,
  en: enExperienceIndex,
};

const localizedExperienceCollections: LocalizedContent<ExperienceCollection> = {
  fr: frExperiences,
  en: enExperiences,
};

const localizedParallelActivities: LocalizedContent<ExperienceParallelActivitiesContent> =
  {
    fr: frParallelActivities,
    en: enParallelActivities,
  };

const localizedPersonalActivities: LocalizedContent<ExperiencePersonalActivitiesContent> =
  {
    fr: frPersonalActivities,
    en: enPersonalActivities,
  };

function getExperienceCollection(
  language: SupportedLanguage,
): ExperienceCollection {
  return selectLocalizedContent(
    localizedExperienceCollections,
    language,
  );
}

function hasOwnExperience(
  experiences: ExperienceCollection,
  id: ContentId | undefined,
): id is ContentId {
  return (
    id !== undefined &&
    Object.prototype.hasOwnProperty.call(experiences, id)
  );
}

export function getExperiencePage(
  language: SupportedLanguage,
): ExperiencePageContent {
  return selectLocalizedContent(localizedExperiencePages, language);
}

export function getExperienceIndex(
  language: SupportedLanguage,
): ContentIndex {
  return selectLocalizedContent(localizedExperienceIndexes, language);
}

export function getExperienceById(
  language: SupportedLanguage,
  id: ContentId,
): ExperienceContent | undefined {
  const experiences = getExperienceCollection(language);

  return hasOwnExperience(experiences, id)
    ? experiences[id]
    : undefined;
}

export function getAdjacentExperienceIds(
  language: SupportedLanguage,
  id: ContentId,
): {
  readonly previousId?: ContentId;
  readonly nextId?: ContentId;
} {
  const index = getExperienceIndex(language);
  const experiences = getExperienceCollection(language);
  const position = index.order.indexOf(id);

  if (position === -1 || !hasOwnExperience(experiences, id)) {
    return {};
  }

  const previousId = index.order[position - 1];
  const nextId = index.order[position + 1];

  return {
    ...(hasOwnExperience(experiences, previousId)
      ? { previousId }
      : {}),
    ...(hasOwnExperience(experiences, nextId)
      ? { nextId }
      : {}),
  };
}

export function getParallelActivities(
  language: SupportedLanguage,
): ExperienceParallelActivitiesContent {
  return selectLocalizedContent(
    localizedParallelActivities,
    language,
  );
}

export function getParallelActivityById(
  language: SupportedLanguage,
  id: string,
): ExperienceParallelActivityContent | undefined {
  const activities = getParallelActivities(language);

  return isParallelActivityId(id)
    ? activities.entries[id]
    : undefined;
}

export function getAdjacentParallelActivityIds(
  language: SupportedLanguage,
  id: string,
): {
  readonly previousId?: ExperienceParallelActivityId;
  readonly nextId?: ExperienceParallelActivityId;
} {
  const activities = getParallelActivities(language);

  if (!isParallelActivityId(id)) {
    return {};
  }

  const position = activities.order.indexOf(id);

  if (position === -1) {
    return {};
  }

  const previousId = activities.order[position - 1];
  const nextId = activities.order[position + 1];

  return {
    ...(previousId ? { previousId } : {}),
    ...(nextId ? { nextId } : {}),
  };
}

export function getPersonalActivities(
  language: SupportedLanguage,
): ExperiencePersonalActivitiesContent {
  return selectLocalizedContent(
    localizedPersonalActivities,
    language,
  );
}