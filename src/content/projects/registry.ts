export const projectOrder = ['lxp-campus', 'molecular-communication', 'molecular-dynamics', 'iscat-platform', 'lipid-membranes'] as const;

export type ProjectId = (typeof projectOrder)[number];
