import { Button } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import React, { useState } from 'react';

import { useCopyToClipboard } from '@gated/app/hooks';
import { useAnalytics } from '@gated/app';
import { slugify } from '@gated/utils';

import {
  nonprofitAtom,
  styledBasePropsAtom,
  viewportAtom,
} from '../Nonprofits.store';
import { NonprofitSignupForm } from '../NonprofitSignupForm';
import { Sticky, Root, Copy, Divider } from './NonprofitSignup.styled';

export const NonprofitSignup = () => {
  const nonprofit = useAtomValue(nonprofitAtom);
  const styledBaseProps = useAtomValue(styledBasePropsAtom);
  const viewport = useAtomValue(viewportAtom);
  const isMobile = viewport && viewport === 'mobile';
  const { track } = useAnalytics();
  const [, copy] = useCopyToClipboard();
  const [shareText, setShareText] = useState('Share');

  if (!nonprofit) return null;

  const shareData = {
    title: `Use Gated to Support ${nonprofit.name}`,
    text: `Use Gated to raise money and awareness for ${nonprofit.name}`,
    url: `https://www.gated.com/nonprofits/${slugify(nonprofit.name)}`,
  };

  const handleShare = async () => {
    if (isMobile && typeof navigator.share === 'function') {
      await navigator.share(shareData).then(() => {
        track('user_SharedNonprofitPage', {
          nonprofit_name: nonprofit.name,
          nonprofit_id: nonprofit.nonprofitId,
        });
      });
    } else {
      await copy(window.location.href).then(() => {
        setShareText('Link copied to clipboard!');
        setTimeout(() => setShareText('Share'), 1500);
        track('user_SharedNonprofitPage', {
          nonprofit_name: nonprofit.name,
          nonprofit_id: nonprofit.nonprofitId,
        });
      });
    }
  };

  return (
    <Root {...styledBaseProps}>
      <Sticky {...styledBaseProps}>
        <Copy>
          <h4>Make a Difference</h4>
          <p>
            Gated is 100% free. Start supporting a cause today and update your
            preferences anytime.
          </p>
        </Copy>

        <NonprofitSignupForm width="100%" />
        <Divider>or</Divider>
        <Copy>
          <h4>Tell a friend</h4>
          <p>
            Share with others to maximize your support for {nonprofit.name}.
          </p>
          <Button
            size="lg"
            variant="outline"
            width={{ base: '100%', md: 'full' }}
            color="blue.500"
            onClick={handleShare}
            isDisabled={shareText !== 'Share'}
          >
            {shareText}
          </Button>
        </Copy>
      </Sticky>
    </Root>
  );
};
