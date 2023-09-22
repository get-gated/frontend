import { systemFonts } from './fonts';

const fonts = {
  heading: `"Ubuntu", ${systemFonts}`,
  body: `"SourceSansPro", ${systemFonts}`,
};

const fontSizes = {
  '3xs': '0.45rem',
  '2xs': '0.625rem',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  '2xl': '1.5rem',
  '3xl': '1.875rem',
  '4xl': '2.25rem',
  '5xl': '3rem',
  '6xl': '3.75rem',
  '7xl': '4.5rem',
  '8xl': '6rem',
  '9xl': '8rem',
};

const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const lineHeights = {
  body: 'calc(1em + 0.5rem)',
  heading: 1.125,
};

const textStyles = {
  'text-display-large': {
    fontSize: '56px',
    fontWeight: 700,
    letterSpacing: '-0.25px',
    lineHeight: 'heading',
    fontFamily: 'Ubuntu',
  },
  'text-display-medium': {
    fontSize: '44px',
    fontWeight: 700,
    letterSpacing: '0rem',
    lineHeight: 'heading',
    fontFamily: 'Ubuntu',
  },
  'text-display-small': {
    fontSize: '40px',
    fontWeight: 700,
    letterSpacing: '0rem',
    lineHeight: 'heading',
    fontFamily: 'Ubuntu',
  },
  'text-headline-large': {
    fontSize: '32px',
    fontWeight: 400,
    letterSpacing: '0rem',
    lineHeight: '40px',
    fontFamily: 'SourceSansPro',
  },
  'text-headline-medium': {
    fontSize: '28px',
    fontWeight: 400,
    letterSpacing: '0rem',
    lineHeight: '36px',
    fontFamily: 'SourceSansPro',
  },
  'text-headline-small': {
    fontSize: '24px',
    fontWeight: 400,
    letterSpacing: '0rem',
    lineHeight: '30px',
    fontFamily: 'SourceSansPro',
  },
  'text-body-regular': {
    fontSize: '1rem',
    fontWeight: 'regular',
    letterSpacing: '0rem',
    lineHeight: 'body',
    fontFamily: 'SourceSansPro',
  },
  'text-body-medium': {
    fontSize: '1rem',
    fontWeight: 'medium',
    letterSpacing: '0rem',
    lineHeight: 'body',
    fontFamily: 'SourceSansPro',
  },
  'text-body-bold': {
    fontSize: '1rem',
    fontWeight: 'bold',
    letterSpacing: '0rem',
    lineHeight: 'body',
    fontFamily: 'SourceSansPro',
  },
};

export { fonts, fontSizes, fontWeights, lineHeights, textStyles };

export type LineHeights = typeof lineHeights;
export type FontWeights = typeof fontWeights;
export type FontSizes = typeof fontSizes;

export interface FontFamilies {
  heading: string;
  body: string;
}
