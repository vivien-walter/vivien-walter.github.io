export const softwareOrder = ['mllpa', 'hpymon', 'formao', 'iscan', 'micro-image', 'md2stl', 'qr-generator', 'sentry', 'molcomm'] as const;

export type SoftwareId = (typeof softwareOrder)[number];
