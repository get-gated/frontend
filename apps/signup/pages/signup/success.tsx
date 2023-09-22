import { Meta } from '@gated/ui/components';

import React from 'react';
import { SignupLayout } from '@components/signup/signup.layout';
import { Success } from '@components/signup/Success';
import { WaitForReady } from '@components/wait-for-ready';

export default function SuccessPage() {
  return (
    <SignupLayout>
      <Meta
        title="Sign up successful!"
        description="Sign up for Gated is successful."
      />
      <WaitForReady>
        <Success />
      </WaitForReady>
    </SignupLayout>
  );
}
