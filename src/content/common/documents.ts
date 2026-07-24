import cvEnUrl from '@/assets/documents/cv/vivien-praud-walter-cv-en.pdf?url';
import cvFrUrl from '@/assets/documents/cv/vivien-praud-walter-cv-fr.pdf?url';
import type { SupportedLanguage } from '@/types/localization';

type PublicDocument = {
  href: string;
  downloadName: string;
};

type LocalizedPublicDocument = Record<SupportedLanguage, PublicDocument>;

export const curriculumVitaeDocuments = {
  fr: {
    href: cvFrUrl,
    downloadName: 'vivien-praud-walter-cv-fr.pdf',
  },
  en: {
    href: cvEnUrl,
    downloadName: 'vivien-praud-walter-cv-en.pdf',
  },
} as const satisfies LocalizedPublicDocument;
