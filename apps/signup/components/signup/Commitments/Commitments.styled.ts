import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Root = styled.div<StyledBaseProps>`
  padding: 1rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.blue[600]};
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;

  ${({ viewport }) =>
    viewport !== 'desktop' &&
    css`
      display: block;
      justify-content: center;
    `}
`;

export const Content = styled.div<StyledBaseProps>`
  width: 100%;
  max-width: 720px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10rem;

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      padding: 1rem 2rem;
      margin-bottom: 2rem;

      & h1 {
        font-size: 36px;
      }
    `}
`;
