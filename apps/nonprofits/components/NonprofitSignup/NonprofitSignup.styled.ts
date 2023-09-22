import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { StyledBaseProps } from '../Nonprofits.styled';

export const Root = styled.div<StyledBaseProps>`
  order: 1;
  position: relative;
  width: 100%;
  padding: 1rem;

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      position: absolute;
      top: 0;
      right: 64px;
      z-index: 5;
      width: 440px;
      height: 100%;
    `}
`;

export const Sticky = styled.div<StyledBaseProps>`
  position: sticky;
  top: 240px;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  /* box-shadow: 0px 0px 70px 11px rgba(213, 217, 219, 0.25); */
  box-shadow: rgb(0 0 0 / 10%) 0px 3px 5px -1px,
    rgb(0 0 0 / 7%) 0px 6px 10px 0px, rgb(0 0 0 / 6%) 0px 1px 18px 0px;
  border-radius: 20px;

  ${({ isDesktop }) =>
    isDesktop &&
    css`
      padding: 3rem 2rem;
    `}
`;

export const Copy = styled.div`
  & h4 {
    font-size: 32px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0.02em;
    margin-bottom: 1rem;
  }

  & p {
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 1rem;
  }
`;

export const Divider = styled.div`
  font-size: 18px;
  font-style: italic;
  font-weight: 400;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.gray[200]};

  width: 100%;
  text-align: center;
  margin: 2rem 0;
  position: relative;

  &::before,
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    width: 35%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.gray[200]};
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;
