import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBaseProps } from '@gated/ui';

export const FooterContainer = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const FooterPrimary = styled.div``;

export const FooterSecondary = styled.div`
  display: flex;
`;

export const Root = styled.footer<StyledBaseProps>`
  padding: ${({ theme }) => `${theme.space['12']} 0`};
  background-color: ${({ theme }) => theme.colors.gray[800]};
  color: ${({ theme }) => theme.colors.white};

  & ${FooterContainer} {
    display: grid;

    ${({ viewport }) =>
      viewport !== 'mobile' &&
      css`
        grid-template-columns: repeat(2, 1fr);
      `}
  }

  & ${FooterSecondary} {
    ${({ viewport }) =>
      viewport === 'mobile' &&
      css`
        order: -1;
        margin-bottom: 3rem;
        & button {
          width: 100%;
        }
      `}

    ${({ viewport }) =>
      viewport !== 'mobile' &&
      css`
        align-items: flex-end;
        justify-content: flex-end;
      `}
  }
`;

export const FooterSocialLinks = styled.div`
  display: grid;
  grid-template-columns: repeat(4, max-content);
  gap: 32px;
  margin: 2rem 0 6rem;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
  & svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.colors.gray[800]};
  }
`;

export const FooterLinks = styled.div`
  & ul {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(3, min-content);
    gap: 70px;
  }
`;
