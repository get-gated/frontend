import { AppProvider } from '@gated/app';
import { UIProvider } from '@gated/ui';
import { AppProps } from 'next/app';

export default function ChallengeApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider appName="Challenge" auth={{ publicRoutes: '*' }}>
      <UIProvider colorMode="light">
        <Component {...pageProps} />
      </UIProvider>
    </AppProvider>
  );
}
