/* eslint-disable @typescript-eslint/no-empty-interface */
import '@emotion/react';
import { DefaultTheme } from './src/types';

declare module '@emotion/react' {
  export interface Theme extends DefaultTheme {}
}
