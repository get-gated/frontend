import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';
import { useApi } from '@gated/app/hooks';
import {
  ConsentApiResponse,
  ConsentContext,
  ConsentContextValue,
} from '@components/consent';
import ConsentView from '@components/consent/main.view';
import ConsentErrorView from '@components/consent/error.view';
import ConsentLoadingView from '@components/consent/loading.view';
import Head from 'next/head';

type Response = 'GRANTED' | 'DENIED';

export default function ConsentResponse() {
  const router = useRouter();
  const consentId = router.query.consentId as string;
  const initialResponse = (
    (router.query.response as string) || ''
  ).toUpperCase() as Response;

  const [response, setResponse] = useState<Response>(initialResponse);
  const [hasResponded, setHasResponded] = useState<boolean>(false);

  const [getConsent, { data: consent, loading, error }] =
    useApi<ConsentApiResponse>(`/api/challenge/consent/${consentId}`, {
      method: 'get',
    });

  const [respond, { loading: loadingRespond, error: errorRespond }] = useApi(
    '/api/challenge/consent',
  );

  useEffect(() => {
    if (!consentId) return;
    getConsent();
  }, [consentId]);

  useEffect(() => {
    if (initialResponse !== 'GRANTED' && initialResponse !== 'DENIED') {
      setResponse(null);
    }
    setResponse(initialResponse);
  }, [initialResponse]);

  useEffect(() => {
    if (!consent) return;

    if (consent.consentDeniedAt) {
      setResponse('DENIED');
      setHasResponded(true);
    }

    if (consent.consentGrantedAt) {
      setResponse('GRANTED');
      setHasResponded(true);
    }
  }, [consent]);

  const onRespond = async () => {
    const { error } = await respond({
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        consentId,
        consentResponse: response,
      }),
    });

    return { error };
  };

  if (error) {
    return <ConsentErrorView />;
  }

  if (loading || !consent) {
    return <ConsentLoadingView />;
  }

  const value: ConsentContextValue = {
    onRespond,
    hasResponded,
    response,
    setResponse,
    error: errorRespond,
    loading: loadingRespond,
    consentDeniedAt:
      consent?.consentDeniedAt && new Date(consent?.consentDeniedAt),
    consentGrantedAt:
      consent?.consentGrantedAt && new Date(consent?.consentGrantedAt),
    expectedEmailAddress: consent?.expectedEmailAddress,
    expectedInteractionAt: new Date(consent?.expectedInteractionAt),
    expectedPersonalNote: consent?.expectedPersonalNote,
  };
  return (
    <ConsentContext.Provider value={value}>
      <ConsentView />
    </ConsentContext.Provider>
  );
}
