export const softwareOrder = ['mllpa', 'hpymon', 'formao'] as const;

export type SoftwareId = (typeof softwareOrder)[number];

export const featuredSoftwareIds = ['mllpa', 'formao'] as const satisfies readonly SoftwareId[];
