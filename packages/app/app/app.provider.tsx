import { AppContext, IAppContext } from './app.context';
import GraphQLProvider from '../graphql/graphql.provider';
import React, { useState } from 'react';
import Script from 'next/script';
import { AnalyticsProvider } from '../analytics/analytics.provider';
import { AuthProvider, AuthProps } from '../auth/auth.provider';

declare global {
  interface Window {
    __ENV: any;
    Intercom: any;
  }
}

interface AppProviderProps {
  appName: string;
  auth: AuthProps;
  children: React.ReactNode;
}

export function AppProvider({ children, appName, auth }: AppProviderProps) {
  const [value, setValue] = useState<IAppContext>({ config: null, appName });

  if (typeof window !== 'undefined' && !value.config && window.__ENV) {
    setValue({
      appName,
      config: {
        env: window.__ENV.REACT_APP_NODE_ENV,
        analytics: {
          segmentWriteKey:
            window.__ENV.REACT_APP_ANALYTICS_SEGMENT_CLIENT_WRITE_KEY,
        },
        apiOrigin: window.__ENV.REACT_APP_API_ORIGIN,
        origin: window.__ENV.REACT_APP_APP_ORIGIN,
        auth: {
          firebase: {
            apiKey: window.__ENV.REACT_APP_FIREBASE_API_KEY,
            authDomain: window.__ENV.REACT_APP_FIREBASE_AUTH_DOMAIN,
            projectId: window.__ENV.REACT_APP_FIREBASE_PROJECT_ID,
            tenant: window.__ENV.REACT_APP_FIREBASE_TENANT,
          },
        },
        stripe: {
          publishableKey: window.__ENV.REACT_APP_STRIPE_PUBLISHABLE_KEY,
        },
        serviceProvider: {
          labels: {
            gated: window.__ENV.REACT_APP_INBOX_LABELS_GATED,
            trainAsAllowed:
              window.__ENV.REACT_APP_INBOX_LABELS_TRAIN_AS_ALLOWED,
            trainAsGated: window.__ENV.REACT_APP_INBOX_LABELS_TRAIN_AS_GATED,
          },
        },
      },
    });
  }

  return (
    <AppContext.Provider value={value}>
      <AuthProvider {...auth}>
        <GraphQLProvider>
          <AnalyticsProvider>
            <Scripts />
            {children}
          </AnalyticsProvider>
        </GraphQLProvider>
      </AuthProvider>
    </AppContext.Provider>
  );
}

const Scripts = () => {
  return (
    <>
      <Script id="app-config" src="/__ENV.js" strategy="beforeInteractive" />
    </>
  );
};
