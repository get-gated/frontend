/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';
//import { Theme as CustomTheme } from './styles/types';

import { Theme as CustomTheme } from './theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
