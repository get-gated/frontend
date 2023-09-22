import Constants from 'expo-constants';
import React from 'react';
import { AppContext, IAppContext } from './app.context';
import GraphQLProvider from '../graphql/graphql.provider';
import { MobileAuthProvider } from '../auth/mobile-auth.provider';

interface MobileAppProviderProps {
  children: React.ReactNode;
  appName: string;
}

export function MobileAppProvider({
  children,
  appName,
}: MobileAppProviderProps) {
  const config: IAppContext = {
    config: {
      apiOrigin: Constants.manifest?.extra?.apiOrigin,
      origin: Constants.manifest?.extra?.webOrigin,
      auth: {
        firebase: {
          apiKey: Constants.manifest?.extra?.firebaseApiKey,
          tenant: Constants.manifest?.extra?.firebaseTenant,
          projectId: Constants.manifest?.extra?.firebaseProjectId,
          authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
          clientIds: {
            ios: Constants.manifest?.extra?.firebaseIosClientId,
            android: Constants.manifest?.extra?.firebaseAndroidClientId,
            web: Constants.manifest?.extra?.firebaseWebClientId,
            expo: Constants.manifest?.extra?.firebaseExpoClientId,
          },
        },
      },
      stripe: { publishableKey: '' },
      serviceProvider: {
        labels: {
          gated: '',
          trainAsAllowed: '',
          trainAsGated: '',
        },
      },
      env: Constants.manifest?.extra?.env,
      analytics: {
        segmentWriteKey: '',
      },
    },
    appName,
  };
  return (
    <AppContext.Provider value={config}>
      <MobileAuthProvider>
        <GraphQLProvider>{children}</GraphQLProvider>
      </MobileAuthProvider>
    </AppContext.Provider>
  );
}
