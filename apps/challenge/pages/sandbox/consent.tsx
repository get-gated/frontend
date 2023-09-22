import { ConsentContext, ConsentContextValue } from '@components/consent';
import ConsentView from '@components/consent/main.view';
import React from 'react';
import { noop } from 'lodash';

export default function ConsentSandbox() {
  const value: ConsentContextValue = {
    onRespond: async () => ({
      error: null,
    }),
    hasResponded: false,
    response: 'DENIED',
    setResponse: noop,
    error: null,
    loading: false,
    //consentDeniedAt: new Date(),
    //consentGrantedAt: new Date(),
    expectedEmailAddress: 'jimmy.smith@liveride.com',
    expectedInteractionAt: new Date(),
    expectedPersonalNote:
      'Hi Jennifer, we met last week at the BigJam Conference. Wanted to follow up with a proposal.',
  };
  return (
    <ConsentContext.Provider value={value}>
      <ConsentView />
      {/*<ConsentLoadingView />*/}
      {/*<ConsentErrorView />*/}
    </ConsentContext.Provider>
  );
}
