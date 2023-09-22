/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useAtomValue } from 'jotai';

import { nonprofitAtom, styledBasePropsAtom } from '../Nonprofits.store';

import { Root } from './NonprofitMetrics.styled';
import ArrowIllustration from './assets/arrow.svg';
import MetricsIllustration from './assets/metrics.svg';
import Image from 'next/image';

export const NonprofitMetrics = () => {
  const nonprofit = useAtomValue(nonprofitAtom);
  const styledBaseProps = useAtomValue(styledBasePropsAtom);

  if (!nonprofit) return null;

  return (
    <Root {...styledBaseProps}>
      <Image
        alt=""
        className="arrow"
        width={ArrowIllustration.width}
        height={ArrowIllustration.height}
        src={ArrowIllustration.src}
      />
      <h3>
        When you use Gated, unknown senders donate to charity to reach your
        inbox.
      </h3>
      <h3>You'll help {nonprofit.name} by</h3>
      <Image
        alt=""
        className="metrics"
        width={MetricsIllustration.width}
        height={MetricsIllustration.height}
        src={MetricsIllustration.src}
      />
    </Root>
  );
};
