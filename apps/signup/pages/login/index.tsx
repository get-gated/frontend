import React, { memo, useEffect } from 'react';

import { Heading, Link, Text, VStack } from '@chakra-ui/react';
import RouterLink from 'next/link';

import { AuthProviderType, AuthType } from '@gated/app/auth/auth.enums';
import { isInWebview } from '@gated/utils';
import InWebview from '@components/webview-view';
import { useRouter } from 'next/router';
import { SignupLayout } from '@components/signup/signup.layout';
import { useAuthReturnValues } from '@hooks/use-auth-error-return-values.hook';
import { AuthButton, Meta } from '@gated/ui/components';

const LoginPageView = memo(() => {
  const router = useRouter();
  const { clearLoginHint } = useAuthReturnValues();

  const redirect = router.query.redirect as string;
  const state = redirect ? JSON.stringify({ redirect }) : '';

  useEffect(() => {
    clearLoginHint();
  }, [clearLoginHint]);

  if (isInWebview()) {
    return <InWebview />;
  }

  return (
    <VStack spacing={38}>
      <Heading size={{ base: 'xl', md: '2xl' }} as="h1">
        Welcome Back
      </Heading>
      <AuthButton
        authType={AuthType.Login}
        buttonTitle="Login with Google"
        authProvider={AuthProviderType.Google}
        redirectPath="/loading"
        onSuccess={() => {
          //todo: check client state for redirect path
          window.location.href = window.location.origin + '/app';
        }}
        clientState={state}
      />

      {/*<Text textStyle="caption">*/}
      {/*  Don&apos;t have an account?{' '}*/}
      {/*  <strong>*/}
      {/*    <Link as={RouterLink} href="/signup">*/}
      {/*      Sign Up*/}
      {/*    </Link>*/}
      {/*  </strong>*/}
      {/*</Text>*/}
    </VStack>
  );
});

export default function LoginPage() {
  return (
    <SignupLayout>
      <Meta title="Login to Gated" />
      <LoginPageView />
    </SignupLayout>
  );
}
