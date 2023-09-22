import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Content = styled.div<StyledBaseProps>`
  padding: 0;
  width: 100%;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: none;

  height: 100%;

  & h1 {
    margin-top: 1rem;
    margin-bottom: 2rem;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }

  & button {
    margin-top: 1rem;
    margin-bottom: 3rem;
    width: 100%;
  }

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      max-width: 720px;
      padding: 4rem 3rem;

      & h1 {
        margin-top: 2rem;
        margin-bottom: 3rem;
      }

      & p {
        max-width: 80%;
      }

      & button {
        margin-top: 2rem;
        margin-bottom: 5rem;
        width: 348px;
        height: 72px;
      }
    `}
`;
