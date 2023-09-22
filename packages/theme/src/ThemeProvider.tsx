import React, { FC } from 'react';
import { Global } from '@emotion/react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { globalStyles } from './global';
import { theme as defaultTheme } from './theme';
import { DefaultTheme } from './types';

interface ThemeProviderProps {
  theme?: Partial<DefaultTheme>;
  children: React.ReactNode;
  resetCSS?: boolean;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  theme = {},
  resetCSS = true,
}) => {
  const extended = extendTheme(defaultTheme, theme);
  return (
    <ChakraProvider theme={extended} resetCSS={resetCSS}>
      <Global styles={globalStyles} />
      {children}
    </ChakraProvider>
  );
};
