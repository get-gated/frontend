import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Root = styled.div<StyledBaseProps>`
  height: 100%;
  width: 100%;
  padding: 1rem;

  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: right;

  ${({ viewport }) =>
    viewport !== 'desktop' &&
    css`
      justify-content: center;
    `}
`;

export const Content = styled.div<StyledBaseProps>`
  width: 100%;
  padding: 1rem;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      max-width: 500px;
    `}
`;
