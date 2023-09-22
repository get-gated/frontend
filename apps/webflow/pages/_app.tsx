import type { AppProps } from 'next/app';
import { UIProvider } from '@gated/ui';
import { AppProvider } from '@gated/app';

export default function WebflowApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider appName="Webflow Components" auth={{ publicRoutes: '*' }}>
      <UIProvider colorMode="light">
        <Component {...pageProps} />
      </UIProvider>
    </AppProvider>
  );
}
