import React, { memo } from 'react';

import GoogleAuthInsufficientScopesPage from './google-auth-insufficient-scopes.page';
import { useAuthRedirect } from '@gated/app';
import { AuthProviderType, AuthType } from '@gated/app';
import { useAnalytics } from '@gated/app';

interface GoogleAuthInsufficientScopesProps {
  loginHint: string;
}

const GoogleAuthInsufficientScopes = memo<GoogleAuthInsufficientScopesProps>(
  () => {
    const { redirectToAuth, loading } = useAuthRedirect(
      AuthProviderType.Google,
      AuthType.SignUp,
      '/onboarding',
    );

    const { track } = useAnalytics();

    const onReAuth = async () => {
      track('frontend_user_ClickedSignUpScopesTryAgain');
      await redirectToAuth();
    };

    return (
      <GoogleAuthInsufficientScopesPage
        onForward={onReAuth}
        loading={loading}
      />
    );
  },
);

export default GoogleAuthInsufficientScopes;
