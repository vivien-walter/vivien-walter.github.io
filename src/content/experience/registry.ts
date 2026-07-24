export const experienceOrder = [
  "imaginexr",
  "kcl-molecular-communication",
  "kcl-iscat",
  "strasbourg-mllpa",
] as const;

export type ExperienceId =
  (typeof experienceOrder)[number];

export const parallelActivityOrder = [
  "consulting",
  "scientific-research",
  "teaching",
] as const;

export type ParallelActivityId =
  (typeof parallelActivityOrder)[number];