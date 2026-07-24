export const projectOrder = [
  "lxp-campus",
  "molecular-communication",
  "iscat-platform",
  "mllpa-project",
  "medical-microscope",
] as const;

export type ProjectId =
  (typeof projectOrder)[number];

export const featuredProjectIds = [
  "lxp-campus",
] as const satisfies readonly ProjectId[];