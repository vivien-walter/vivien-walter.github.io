export const researchThemeOrder = [
  'optics-photonics',
  'molecular-interfaces',
  'artificial-intelligence',
  'molecular-communication',
  'inclusive-education',
] as const;

export type ResearchThemeId = (typeof researchThemeOrder)[number];
