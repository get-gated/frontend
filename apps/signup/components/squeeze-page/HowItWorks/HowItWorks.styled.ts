import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBaseProps } from '@gated/ui';

import backgroundShape from './assets/background-shape.svg';

export const Root = styled.div`
  position: relative;
  background-image: url(${backgroundShape.src});
  background-repeat: no-repeat;
  background-position: left center;
`;

export const Callout = styled.div<StyledBaseProps>`
  position: relative;
  width: 100%;
  max-width: 500px;
  margin-top: -300px;

  ${({ viewport }) =>
    viewport === 'desktop' &&
    css`
      left: 50%;
    `}

  & img {
    z-index: -1;
  }

  & .callout-text {
    font-size: 38px;
    line-height: 44px;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.light};

    & strong {
      text-transform: uppercase;
    }
  }
`;
