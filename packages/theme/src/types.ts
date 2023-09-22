import { ColorMode, SystemStyleObject } from '@chakra-ui/react';
import { ComponentStyleConfig } from '@chakra-ui/theme';
import { GlobalStyles } from '@chakra-ui/theme-tools';
import { Sizes } from './sizes';
import { Breakpoints } from './breakpoints';
import { Colors } from './colors';
import {
  FontFamilies,
  FontSizes,
  FontWeights,
  LineHeights,
} from './typography';
import { Space } from './space';
import { Radii } from './radii';
import { ZIndices } from './zIndices';

export interface DefaultTheme {
  breakpoints: Breakpoints;
  colors: Colors;
  components: {
    [key: string]: ComponentStyleConfig;
  };
  fonts: FontFamilies;
  fontSizes: FontSizes;
  fontWeights: FontWeights;
  lineHeights: LineHeights;
  space: Space;
  sizes: Sizes;
  styles?: GlobalStyles;
  textStyles: {
    [key: string]: SystemStyleObject;
  };
  radii: Radii;
  zIndices: ZIndices;
}

export type Viewport = 'mobile' | 'tablet' | 'desktop' | string;
export type { ColorMode };

export interface StyledBaseProps {
  colorMode?: ColorMode;
  viewport?: string;
}
