import { Meta } from '@gated/ui/components';
import React from 'react';
import { SignupLayout } from '@components/signup/signup.layout';
import { Activate } from '@components/signup/Activate';
import { WaitForReady } from '@components/wait-for-ready';

export default function ActivatePage() {
  return (
    <SignupLayout>
      <Meta title="Sign up" description="Sign up for Gated." />
      <WaitForReady>
        <Activate />
      </WaitForReady>
    </SignupLayout>
  );
}
