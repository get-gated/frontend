/* eslint-disable react/no-unescaped-entities */
import React, { forwardRef } from 'react';
import { useAtomValue } from 'jotai';
import { Button } from '@chakra-ui/react';

// import { useApp } from '@/hooks/use-app.hook';
import { useAnalytics } from '@gated/app';

import {
  nonprofitAtom,
  styledBasePropsAtom,
  viewportAtom,
} from '../Nonprofits.store';
import { List, ListItem, Root } from './NonprofitExplainer.styled';
import HowItWorksIllustration from './assets/how-it-works.svg';
import Image from 'next/image';
import { App, useAppLink } from '@gated/app/hooks';

export const NonprofitExplainer = forwardRef<HTMLElement>((_props, ref) => {
  const nonprofit = useAtomValue(nonprofitAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = useAtomValue(styledBasePropsAtom);
  const appLink = useAppLink();

  const { track } = useAnalytics();

  const handleClick = () => {
    track('user_ClickedSignup', {
      signup_phase: 'intended',
    });

    window.location.href = appLink(
      App.Signup,
      `/signup?nonprofitId=${nonprofit.nonprofitId}`,
    );
  };

  return (
    <Root ref={ref}>
      <h1>How Gated works</h1>
      {viewport !== 'mobile' && (
        <Image
          src={HowItWorksIllustration.src}
          alt="How Gated Works"
          width={HowItWorksIllustration.width}
          height={HowItWorksIllustration.height}
        />
      )}
      <List {...styledBaseProps}>
        <ListItem {...styledBaseProps}>
          <strong>1</strong>
          <span>
            You get too much email. It's hard to see important emails in your
            cluttered inbox.
          </span>
        </ListItem>
        <ListItem {...styledBaseProps}>
          <strong>2</strong>
          <span>
            Gated asks senders you don't know to donate in order to reach you.
          </span>
        </ListItem>
        <ListItem {...styledBaseProps}>
          <strong>3</strong>
          <span>
            Now your inbox only holds emails from people you know - and those
            who donate $2 (or more) to deliver their email.
          </span>
        </ListItem>
      </List>
      <Button
        bg="linear-gradient(
                    265deg,
                    rgba(255, 255, 255, 0.2) 22.85%,
                    rgba(25, 106, 255, 0.2) 51.47%
                  ), #196AFF"
        color="white"
        onClick={handleClick}
        size="lg"
        width={{ base: '100%', md: '280px' }}
        alignSelf={{ base: 'center', md: 'flex-start' }}
        mt={8}
        borderRadius="30px"
        height="60px"
      >
        Sign up free
      </Button>
    </Root>
  );
});
