export const publicationOrder = [
  'ieee-molecular-communication-2026',
  'nature-iscat-2025',
  'jmicroscopy-iscat-2025',
  'biophysj-cppelp-2024',
  'jacs-iscat-2023',
  'nature-molecular-communication-2023',
  'bba-ripple-phase-2021',
  'jcompchem-mllpa-2021',
  'pccp-mllpa-2020',
  'langmuir-dragonfly-2019',
  'nature-cppelp-2017',
  'thesis-2017',
] as const;

export type PublicationId = (typeof publicationOrder)[number];

export const featuredPublicationIds = [
  'nature-molecular-communication-2023',
  // "ieee-cnn-2026",
  // "jmicroscopy-2024",
] as const satisfies readonly PublicationId[];
