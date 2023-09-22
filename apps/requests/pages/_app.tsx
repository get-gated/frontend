import type { AppProps } from 'next/app';
import {
  AppProvider,
  AuthStatus,
  MeProvider,
  useAuth,
  useMe,
} from '@gated/app';
import { UIProvider } from '@gated/ui';
import { Header } from '@components/header';
import { Layout, Spinner } from '@gated/ui/components';
import { Flex } from '@chakra-ui/react';

import { App, useAppLink } from '@gated/app/hooks';
import Head from 'next/head';

const Loading = () => (
  <Flex flex={1} minHeight="100vh">
    <Spinner />
  </Flex>
);

export default function DashboardApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider appName="Requests" auth={{ privateRoutes: '*' }}>
      <UIProvider>
        <Head>
          <title>Gated Requests Beta</title>
        </Head>

        <MeProvider>
          <Content>
            <Component {...pageProps} />
          </Content>
        </MeProvider>
      </UIProvider>
    </AppProvider>
  );
}

function Content({ children }) {
  const { isReady, status, logout } = useAuth();
  const link = useAppLink();
  const { user, isReady: isMeReady } = useMe();

  const onLogout = async () => {
    await logout();

    window.location.href = link(App.Signup, '/login');
  };

  console.log(isReady, status, user);

  return (
    <Layout
      width="wide"
      header={
        <Header
          avatar={user?.avatar}
          name={user?.fullName}
          isSignedIn={status === AuthStatus.SignedIn}
          onLogout={onLogout}
        />
      }
    >
      {!isReady || !isMeReady || !user ? <Loading /> : children}
    </Layout>
  );
}
