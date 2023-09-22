import { extendTheme, theme as baseTheme, ColorMode } from '@chakra-ui/react';
import * as components from './components';
import * as foundations from './foundations';
import { colors } from './colors';

export const theme: Record<string, any> = extendTheme({
  ...foundations,
  components: { ...components },
  colors: {
    ...baseTheme.colors,
    ...colors,
  },
  space: {
    '4.5': '1.125rem',
  },
});
type Theme = typeof theme;

export type { Theme };

export type { ColorMode };
/**
 * @deprecated do not continue to use
 */
export type Viewport = 'mobile' | 'tablet' | 'desktop' | string;

/**
 * @deprecated do not continue to use
 */
export interface StyledBaseProps {
  colorMode?: ColorMode;
  viewport?: string;
}
