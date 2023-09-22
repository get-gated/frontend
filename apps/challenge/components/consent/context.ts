import { createContext, useContext } from 'react';
import { noop } from 'lodash';
import { ChallengeExpectedReasonEnum } from '@gated/graphql-types';

export type ConsentResponse = 'GRANTED' | 'DENIED';

export interface ConsentApiResponse {
  expectedEmailAddress: string;
  expectedInteractionAt: Date;
  expectedPersonalNote: string;
  consentGrantedAt?: Date;
  consentDeniedAt?: Date;
}

export interface ConsentContextValue extends ConsentApiResponse {
  hasResponded: boolean;
  response: ConsentResponse;
  setResponse: (ConsentResponse) => void;
  onRespond: () => Promise<{ error: any }>;
  error?: string;
  loading: boolean;
}
export const ConsentContext = createContext<ConsentContextValue>({
  hasResponded: false,
  response: 'GRANTED',
  setResponse: noop,
  onRespond: async () => ({
    error: null,
  }),
  expectedEmailAddress: '',
  expectedInteractionAt: new Date(),
  expectedPersonalNote: 'hey yo!!',
  loading: false,
});

export const useConsentContext = () => useContext(ConsentContext);
