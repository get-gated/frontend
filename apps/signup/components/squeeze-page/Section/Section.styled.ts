import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBaseProps } from '@gated/ui';

export const Root = styled.section<StyledBaseProps>`
  align-items: center;
  width: 100%;

  display: grid;

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    `}
`;

interface ContainerProps extends StyledBaseProps {
  alignment?: string | null;
}

export const Container = styled.div<ContainerProps>`
  order: ${({ alignment }) => (alignment === 'left' ? 1 : 0)};

  & .heading {
    font-size: ${({ viewport }) => (viewport === 'mobile' ? '32px' : '38px')};
    line-height: ${({ viewport }) => (viewport === 'mobile' ? '40px' : '52px')};
    font-weight: 500;
    margin-bottom: 1.5rem;
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    max-width: ${({ viewport }) => (viewport === 'mobile' ? '100%' : '80%')};

    & strong {
      text-transform: uppercase;
    }
  }

  & .body {
    position: relative;
    padding-top: 2rem;
    font-size: ${({ viewport }) => (viewport === 'mobile' ? '26px' : '28px')};
    line-height: ${({ viewport }) => (viewport === 'mobile' ? '32px' : '36px')};

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 25%;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary[80]};
    }

    & ul {
      list-style-type: none;
      padding-left: 1rem;

      & li {
        margin-bottom: 1rem;

        &:before {
          content: '\2022';
          color: ${({ theme }) => theme.colors.primary[80]};
          font-weight: bold;
          display: inline-block;
          width: 24px;
          margin-left: -1rem;
        }
      }
    }
  }
`;
