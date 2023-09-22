import React, { memo, useEffect } from 'react';
import { useAnalytics } from '@gated/app';
import { useRouter } from 'next/router';

const OAuthCancelledView = memo(() => {
  const { track } = useAnalytics();
  const router = useRouter();

  useEffect(() => {
    track('frontend_user_OauthCancelled');
    router.replace('/signup');
  }, []);

  return <></>;
});

export default OAuthCancelledView;
