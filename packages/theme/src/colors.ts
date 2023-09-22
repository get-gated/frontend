import common from './colors/common';
import error from './colors/error';
import neutral from './colors/neutral';
import neutralVariant from './colors/neutralVariant';
import primary from './colors/primary';
import secondary from './colors/secondary';
import tertiary from './colors/tertiary';

// A tonal palette consists of thirteen tones, including white and black. A tone value of 100 is equivalent to the idea of light at its maximum and results in white. Every tone value between 0 and 100 expresses the amount of light present in the color.
export const colors = {
  ...common,
  error,
  // The neutral key color is used to derive the roles of surface and background, as well as high emphasis text and icons.
  neutral,
  // The neutral variant key color is used to derive medium emphasis text and icons, surface variants, and component outlines.
  neutralVariant,
  // The primary key color is used to derive roles for key components across the UI, such as the FAB, prominent buttons, active states, as well as the tint of elevated surfaces.
  primary,
  // The secondary key color is used for less prominent components in the UI such as filter chips, while expanding the opportunity for color expression.
  secondary,
  // The tertiary key color is used to derive the roles of contrasting accents that can be used to balance primary and secondary colors or bring heightened attention to an element.
  tertiary,
};

export type Colors = typeof colors;
