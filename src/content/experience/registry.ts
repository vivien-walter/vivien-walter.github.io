export const experienceOrder = [
  'imaginexr',
  'kcl-molecular-communication',
  'teaching-thermodynamics',
  'teaching-ai',
  'kcl-iscat',
  'consultant-microscope',
  'strasbourg-mllpa',
  'strasbourg-thesis',
] as const;

export type ExperienceId = (typeof experienceOrder)[number];

export const personalActivityOrder = ['music', 'boardgames'] as const;

export type PersonalActivityId = (typeof personalActivityOrder)[number];
