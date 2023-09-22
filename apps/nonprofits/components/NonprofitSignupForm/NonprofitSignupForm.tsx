import React from 'react';
import { ButtonProps } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { nonprofitAtom } from '../Nonprofits.store';

import { SignupButton } from '@gated/ui/components';

export const NonprofitSignupForm = (props: ButtonProps) => {
  const nonprofit = useAtomValue(nonprofitAtom);

  if (!nonprofit) return null;
  return (
    <SignupButton
      buttonProps={{
        ...props,
        variant: 'outline',
        backgroundColor: 'yellow.50',
      }}
      nonprofitId={nonprofit.nonprofitId}
    />
  );
};
