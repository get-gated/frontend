import { AppProps } from 'next/app';

import { Global } from '@emotion/react';

import { AppProvider } from '@gated/app';

import { globalStyleOverrides, Root } from '@components/Nonprofits.styled';
import { UIProvider } from '@gated/ui';

interface NonprofitsAppPageProps {
  cookies: string;
}

export default function NonprofitsApp({
  Component,
  pageProps,
}: AppProps<NonprofitsAppPageProps>) {
  return (
    <AppProvider appName="Non Profit Pages" auth={{ publicRoutes: '*' }}>
      <UIProvider colorMode="light">
        <Global styles={globalStyleOverrides} />
        <Root>
          <Component {...pageProps} />
        </Root>
      </UIProvider>
    </AppProvider>
  );
}
