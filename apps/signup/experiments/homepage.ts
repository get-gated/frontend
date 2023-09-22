import { ExperimentConfig } from '@gated/experiment';

export enum HomePageVariant {
  Control = 'control',
  Accolades = 'accolades',
}
export const homePageExperiment: ExperimentConfig = {
  name: 'homepage-hero-accolade',
  route: '/',
  variants: [
    {
      name: HomePageVariant.Control,
      rate: 1,
    },
  ],
};
