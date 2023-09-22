import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import { StyledBaseProps } from '../Nonprofits.styled';

export const Root = styled.section<StyledBaseProps>`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const StickyWrapper = styled.div<StyledBaseProps>`
  height: 100%;
  position: relative;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 68px;
  padding: 0 2rem;
  z-index: 10;
  background-color: ${({ theme }) => transparentize(0.3, theme.colors.white)};
  box-shadow: 0px 4px 23px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  & ${Container} {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & svg {
    width: 96px;
    height: auto;
    color: ${({ theme }) => theme.colors.blue[500]};
    pointer-events: none;
  }
`;

export const FooterSummary = styled.div`
  & svg {
    width: 96px;
    height: auto;
    color: ${({ theme }) => theme.colors.blue[500]};
    pointer-events: none;
    margin-bottom: 1rem;
  }
`;

export const FooterLinks = styled.div`
  & ul {
    list-style-type: none;
  }
  & li {
    padding: 0.25rem 0;
  }
  & a {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const FooterSignup = styled.div`
  & h4 {
    font-size: 32px;
    font-weight: 600;
    color: #0b1c46;
    margin-bottom: 1rem;
  }

  & p {
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    margin-bottom: 1rem;
  }
`;

export const Footer = styled.footer<StyledBaseProps>`
  padding: 4rem 2rem;
  background-color: #f6f9fd;
  color: #69748f;

  & ${Container} {
    display: grid;

    gap: 2rem;
  }

  ${({ isMobile }) =>
    !isMobile &&
    css`
      & ${Container} {
        grid-template-columns: 2fr 1fr 2fr;
      }
    `}

  ${({ isMobile }) =>
    isMobile &&
    css`
      & ${FooterSummary} {
        order: 1;
      }
      & ${FooterSignup} {
        order: 0;
        margin-bottom: 2rem;
      }
      & ${FooterLinks} {
        order: 2;
      }
    `}
`;
