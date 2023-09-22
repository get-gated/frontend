import { AppProps } from 'next/app';
import { AppProvider } from '@gated/app';
import { UIProvider } from '@gated/ui';

export default function SignupApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider
      appName="Signup"
      auth={{
        publicRoutes: '*',
        privateRoutes: ['/signup/success'],
      }}
    >
      <UIProvider colorMode="light">
        <Component {...pageProps} />
      </UIProvider>
    </AppProvider>
  );
}
