export const softwareOrder = [
  "mllpa",
] as const;

export type SoftwareId =
  (typeof softwareOrder)[number];

export const featuredSoftwareIds = [
  "mllpa",
] as const satisfies readonly SoftwareId[];