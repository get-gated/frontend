import React from 'react';
import { SignupLayout } from '@components/signup/signup.layout';
import { Spinner, Meta } from '@gated/ui/components';

export default function LoadingPage() {
  return (
    <SignupLayout>
      <Meta title="Loading" description="Gated is loading." />
      <Spinner />
    </SignupLayout>
  );
}
