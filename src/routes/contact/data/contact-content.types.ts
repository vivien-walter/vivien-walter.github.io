import type {
  ContentLink,
  ContentPage,
} from "@/shared/content/content.types";

export const contactMethodIconIds = [
  "email",
  "linkedin",
  "github",
  "orcid",
] as const;

export type ContactMethodIconId =
  (typeof contactMethodIconIds)[number];

export type ContactMethod = ContentLink & {
  readonly icon: ContactMethodIconId;
  readonly value: string;
  readonly actionLabel: string;
};

export const contactAvailabilityIconIds = [
  "location",
  "immediate-availability",
  "work-arrangements",
] as const;

export type ContactAvailabilityIconId =
  (typeof contactAvailabilityIconIds)[number];

export type ContactAvailabilityCard = {
  readonly id: string;
  readonly icon: ContactAvailabilityIconId;
  readonly title: string;
  readonly description: string;
  readonly highlighted?: boolean;
};

export type ContactAvailabilitySection = {
  readonly title: string;
  readonly items: readonly ContactAvailabilityCard[];
};

export type ContactContent = Omit<ContentPage, "links"> & {
  readonly links: readonly ContactMethod[];
  readonly availability: ContactAvailabilitySection;
};