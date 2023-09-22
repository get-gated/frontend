import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 3rem 0 4rem;
`;

export const Content = styled.div<StyledBaseProps>`
  padding: 1rem 0;
  width: 100%;

  & h1 {
    margin-bottom: 1rem;
  }

  & button {
    margin-top: 3rem;
  }

  ${({ viewport }) =>
    viewport === 'mobile' &&
    css`
      margin-top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & button {
        width: 100%;
      }
    `}

  ${({ viewport }) =>
    viewport === 'desktop' &&
    css`
      max-width: 50%;

      & p {
        max-width: 80%;
      }
    `}

  ${({ viewport }) =>
    viewport === 'tablet' &&
    css`
      max-width: 50%;

      & p {
        max-width: 80%;
      }
    `}
`;

export const SecondaryContent = styled.div<StyledBaseProps>`
  padding: 1rem 2rem;
  width: 100%;

  ${({ viewport }) =>
    viewport === 'mobile' &&
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      max-width: 80%;
      margin: auto;
      padding: 1rem;
    `}

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      max-width: 50%;
    `}
`;
