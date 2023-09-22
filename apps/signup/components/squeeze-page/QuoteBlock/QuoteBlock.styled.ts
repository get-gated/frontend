import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBaseProps } from '@gated/ui';

interface RootProps extends StyledBaseProps {
  alignment?: string | null;
  image?: string | null;
  imageAlignment?: string | null;
}

export const Root = styled.section<RootProps>`
  padding: 12rem 3rem;
  display: flex;
  align-items: center;
  justify-content: ${({ alignment }) =>
    alignment === 'left' ? 'flex-start' : 'center'};
  text-align: ${({ alignment }) => (alignment === 'left' ? 'left' : 'center')};

  & > div {
    ${({ viewport }) =>
      viewport !== 'mobile' &&
      css`
        max-width: 50%;
      `}
  }
`;

export const QuoteContainer = styled.div`
  font-family: ${({ theme }) => theme.fonts.body};

  & p {
    font-size: 32px;
    font-weight: ${({ theme }) => theme.fontWeights.medium};
    line-height: ${({ theme }) => theme.lineHeights.heading};
    margin-bottom: 2rem;
  }

  & figcaption {
    font-size: 32px;
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`;
