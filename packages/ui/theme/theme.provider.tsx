import {
  ChakraProvider,
  ColorMode,
  createLocalStorageManager,
  extendTheme,
  ThemeConfig,
  useColorMode,
} from '@chakra-ui/react';
import { theme } from './index';

import Head from 'next/head';
import { kebabCase } from 'lodash';
import { useApp } from '@gated/app';

interface UIProviderProps {
  children: React.ReactNode;
  colorMode?: ColorMode;
}

export function UIProvider({ children, colorMode }: UIProviderProps) {
  const config: ThemeConfig = {
    initialColorMode: colorMode || 'system',
    useSystemColorMode: !colorMode,
  };

  const uiTheme = extendTheme({ ...theme, config });
  const { appName } = useApp();
  const manager = createLocalStorageManager(`${kebabCase(appName)}-color-mode`);

  return (
    <ChakraProvider theme={uiTheme} colorModeManager={manager}>
      <UIHead />
      {children}
    </ChakraProvider>
  );
}

function UIHead() {
  const { colorMode } = useColorMode();

  return (
    <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;600;700&family=Ubuntu:wght@300;400;500;700&display=swap"
        rel="stylesheet"
      />
      {/* Favicons */}
      <link rel="icon" href={`/favicon.ico`} />
      <link
        rel="icon"
        href={`/favicon-32x32.png`}
        sizes="32x32"
        type="image/png"
      />
      <link
        rel="icon"
        href={`/favicon-16x16.png`}
        sizes="16x16"
        type="image/png"
      />

      {/* Device Icons */}
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`/apple-touch-icon.png`}
      />
      <link rel="manifest" href={`/site.webmanifest`} />
      <link rel="mask-icon" href={`/safari-pinned-tab.svg`} color="#4788FF" />
      <meta name="msapplication-TileColor" content="#4788FF" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta
        name="theme-color"
        content={colorMode === 'dark' ? '#030B1A' : '#4788FF'}
      />
    </Head>
  );
}
