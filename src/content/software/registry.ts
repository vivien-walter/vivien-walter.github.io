export const softwareOrder = ['mllpa', 'hpymon', 'formao'] as const;

export type SoftwareId = (typeof softwareOrder)[number];
