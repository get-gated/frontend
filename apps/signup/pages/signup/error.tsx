import { Meta } from '@gated/ui/components';
import { Error } from '@components/signup/Error';
import React from 'react';
import { SignupLayout } from '@components/signup/signup.layout';

export default function ErrorPage() {
  return (
    <SignupLayout>
      <Meta title="Error signing up" description="Sign up for Gated." />
      <Error />
    </SignupLayout>
  );
}
