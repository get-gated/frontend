import { AppProvider } from '@gated/app';
import { UIProvider } from '@gated/ui';
import { AppProps } from 'next/app';

export default function UserApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider appName="App" auth={{ publicRoutes: '*' }}>
      <UIProvider colorMode="light">
        <Component {...pageProps} />
      </UIProvider>
    </AppProvider>
  );
}
