export const publicationOrder = [
  "nature-molecular-communication-2023",
  // "ieee-cnn-2026",
  // "jmicroscopy-2024",
  // "jacs-2023",
  // "nature-self-assembly-2025",
  // "pccp-2020",
  // "jcc-mllpa-2021",
  // "bba-2021",
] as const;

export type PublicationId =
  (typeof publicationOrder)[number];

export const featuredPublicationIds = [
  "nature-molecular-communication-2023",
  // "ieee-cnn-2026",
  // "jmicroscopy-2024",
] as const satisfies readonly PublicationId[];