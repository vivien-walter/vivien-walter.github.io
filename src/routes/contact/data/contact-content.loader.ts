import enContactContentJson from "@/locales/en/contact/page.json";
import frContactContentJson from "@/locales/fr/contact/page.json";
import {
  selectLocalizedContent,
  type LocalizedContent,
  type SupportedLanguage,
} from "@/shared/content/localized-content";

import type {
  ContactAvailabilityIconId,
  ContactContent,
  ContactMethodIconId,
} from "./contact-content.types";

type ContactContentSource =
  | typeof frContactContentJson
  | typeof enContactContentJson;

function parseContactMethodIcon(
  icon: string,
): ContactMethodIconId {
  switch (icon) {
    case "email":
    case "linkedin":
    case "github":
    case "orcid":
      return icon;

    default:
      throw new Error(
        `Icône de méthode de contact inconnue : ${icon}`,
      );
  }
}

function parseContactAvailabilityIcon(
  icon: string,
): ContactAvailabilityIconId {
  switch (icon) {
    case "location":
    case "immediate-availability":
    case "work-arrangements":
      return icon;

    default:
      throw new Error(
        `Icône de disponibilité inconnue : ${icon}`,
      );
  }
}

function parseContactContent(
  source: ContactContentSource,
): ContactContent {
  return {
    ...source,
    links: source.links.map((link) => ({
      ...link,
      icon: parseContactMethodIcon(link.icon),
    })),
    availability: {
      ...source.availability,
      items: source.availability.items.map((item) => ({
        ...item,
        icon: parseContactAvailabilityIcon(item.icon),
      })),
    },
  };
}

const frContactContent = parseContactContent(
  frContactContentJson,
);

const enContactContent = parseContactContent(
  enContactContentJson,
);

const localizedContactContent = {
  fr: frContactContent,
  en: enContactContent,
} satisfies LocalizedContent<ContactContent>;

export function getContactContent(
  language: SupportedLanguage,
): ContactContent {
  return selectLocalizedContent(
    localizedContactContent,
    language,
  );
}