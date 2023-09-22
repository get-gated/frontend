import { Meta } from '@gated/ui/components';

import React from 'react';
import { SignupLayout } from '@components/signup/signup.layout';
import { Signup } from '@components/signup/Signup';

export default function SignupPage() {
  return (
    <SignupLayout>
      <Meta
        title="Block Unwanted Emails & Raise Money for Charity | Get Gated"
        description="Add Gated to your work email now and get rid of annoying, unwanted emails while supporting your favorite cause. Sign up for Gated now!"
      />
      <Signup />
    </SignupLayout>
  );
}
