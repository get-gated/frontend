import { createContext } from 'react';

export type IAppConfig = {
  env: 'production' | 'dev';
  analytics: {
    segmentWriteKey: string;
  };
  auth: {
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      tenant: string;
      clientIds?: {
        ios: string;
        android: string;
        expo: string;
        web: string;
      };
    };
  };
  origin: string;
  apiOrigin: string;
  serviceProvider: {
    labels: {
      gated: string;
      trainAsAllowed: string;
      trainAsGated: string;
    };
  };
  stripe: {
    publishableKey: string;
  };
};
export interface IAppContext {
  config?: IAppConfig | null;
  appName: string;
}

export const AppContext = createContext<IAppContext>({
  config: null,
  appName: '',
});

AppContext.displayName = 'AppContext';
