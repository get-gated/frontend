import styled from '@emotion/styled';
import Marquee from 'react-fast-marquee';
import { StyledBaseProps } from '@gated/ui';
import { css } from '@emotion/react';

export const Root = styled.div`
  position: relative;
  width: 100%;
  padding: 0 0 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoContainer = styled(Marquee)`
  width: 100%;
  padding: 3rem 0;
  overflow: hidden;
`;

export const ImageWrapper = styled.div<StyledBaseProps>`
  position: relative;
  width: 144px;
  height: 38.4px;

  filter: grayscale(100%);

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      width: 180px;
      height: 48px;
      margin-right: 1rem;
    `}
`;
