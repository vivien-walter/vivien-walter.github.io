export const researchThemeOrder = [
  "molecular-interfaces",
  "optics-photonics",
  "molecular-communication",
] as const;

export type ResearchThemeId =
  (typeof researchThemeOrder)[number];