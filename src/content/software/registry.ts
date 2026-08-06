export const softwareOrder = [
  'mllpa',
  'hpymon',
  'formao',
  'iscan',
  'micro-image',
  'md2stl',
  'qr-generator',
  'sentry',
  'molcomm',
  'autocorrelation',
] as const;

export type SoftwareId = (typeof softwareOrder)[number];
