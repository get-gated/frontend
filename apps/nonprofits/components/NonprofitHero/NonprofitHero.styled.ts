import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { transparentize } from 'polished';

import imageMask from './image-mask.svg';

import { StyledBaseProps } from '../Nonprofits.styled';

export const Root = styled.section<StyledBaseProps>`
  width: 100%;
  min-height: 70vh;
  position: relative;
  z-index: 2;
`;

export const Container = styled.div<StyledBaseProps>`
  width: 100%;
  height: 100%;
  display: grid;
  align-items: center;

  ${({ isTablet, isDesktop }) =>
    (isTablet || isDesktop) &&
    css`
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    `}
`;

export const Content = styled.div<StyledBaseProps>`
  padding: 2rem;

  ${({ isMobile, theme }) =>
    isMobile &&
    css`
      color: ${theme.colors.white};
      background-color: ${transparentize(0.3, theme.colors.blue[700])};
    `}

  & h1 {
    font-size: ${({ isMobile }) => (isMobile ? '38px' : '48px')};
    line-height: ${({ isMobile }) => (isMobile ? '56px' : '60px')};
    font-weight: 300;
    letter-spacing: 0.02em;
    margin-bottom: 96px;

    & strong {
      display: block;
      font-weight: 700;
    }
  }

  & h4 {
    font-size: 28px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0.02em;
    margin-bottom: 24px;
  }

  & h3 {
    font-size: 32px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0.02em;
    margin-bottom: 24px;
  }

  & button {
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    text-decoration: underline;
  }
`;

export const Background = styled.div<StyledBaseProps>`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  ${({ isMobile }) =>
    isMobile &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    `}

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(4px);
    transform: scale(1.1);
  }

  &::before {
    display: ${({ isMobile }) => (isMobile ? 'none' : 'block')};
    content: '';
    width: 60px;
    height: 100%;
    position: absolute;
    top: 0;
    left: -1px;
    background-image: url(${imageMask.src});
    z-index: 1;

    background-repeat: no-repeat;
    background-size: cover;
    background-position: right;
  }
`;
