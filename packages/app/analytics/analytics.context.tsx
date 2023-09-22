import { createContext } from 'react';

type KeyVal<T> = {
  [key: string]: T;
};

export interface IAnalyticsContext {
  track: (event: string, attributes?: KeyVal<any>) => Promise<void>;
  script: string;
  page: (pageName: string, properties: { [key: string]: any }) => void;
  identify: (traits: { [key: string]: any }) => void;
}

export const AnalyticsContext = createContext<IAnalyticsContext>({
  track: () => null,
  script: '',
  page: () => null,
  identify: () => null,
});
AnalyticsContext.displayName = 'AnalyticsContext';
