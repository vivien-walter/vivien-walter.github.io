import type { SupportedLanguage } from "../../navigation";
import type { ContentDateRange } from "./content.types";

const localeByLanguage: Readonly<Record<SupportedLanguage, string>> = {
  fr: "fr-FR",
  en: "en-GB",
};

function formatContentDate(value: string, language: SupportedLanguage): string {
  const yearMatch = /^(\d{4})$/.exec(value);

  if (yearMatch) {
    return value;
  }

  const monthMatch = /^(\d{4})-(\d{2})$/.exec(value);

  if (monthMatch) {
    const [, year, month] = monthMatch;
    const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1));

    return new Intl.DateTimeFormat(localeByLanguage[language], {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }

  const dayMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);

  if (dayMatch) {
    const [, year, month, day] = dayMatch;
    const date = new Date(
      Date.UTC(Number(year), Number(month) - 1, Number(day)),
    );

    return new Intl.DateTimeFormat(localeByLanguage[language], {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }

  return value;
}

export function formatContentDateRange(
  period: ContentDateRange,
  language: SupportedLanguage,
): string {
  const start = formatContentDate(period.start, language);

  if (!period.end) {
    return start;
  }

  return `${start} – ${formatContentDate(period.end, language)}`;
}
