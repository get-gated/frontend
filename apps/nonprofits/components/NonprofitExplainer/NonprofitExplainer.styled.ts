/* eslint-disable @typescript-eslint/ban-ts-comment */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { StyledBaseProps } from '../Nonprofits.styled';

import maskUpper from './assets/mask-upper.svg';
import maskLower from './assets/mask-lower.svg';

export const Root = styled.section`
  position: relative;
  padding: calc(4rem + 220px) 2rem;
  background-color: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &::before,
  &::after {
    content: '';
    width: 100%;
    height: 110px;
    position: absolute;
    left: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: right;
  }

  &::before {
    top: 0;
    background-image: url(${maskUpper.src});
  }

  &::after {
    bottom: 0;
    background-image: url(${maskLower.src});
  }

  & h1 {
    font-size: 40px;
    font-weight: 300;
    line-height: 48px;
    letter-spacing: 0.02em;
    z-index: 1;
  }

  & svg {
    margin-top: 120px;
  }

  & button {
    z-index: 1;
  }
`;

export const List = styled.ul<StyledBaseProps>`
  display: grid;
  gap: 2rem;
  list-style-type: none;
  margin-top: 80px;

  ${({ isMobile }) =>
    !isMobile &&
    css`
      grid-template-columns: repeat(3, 1fr);
    `}
`;

export const ListItem = styled.li<StyledBaseProps>`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 1px -1px rgb(0 0 0 / 20%),
    0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);
  border-radius: 60px;
  padding: 2rem;
  color: ${({ theme }) => theme.colors.blue[900]};
  font-size: 24px;
  line-height: 36px;
  letter-spacing: 0.02em;
  height: fit-content;

  & strong,
  & span {
    display: block;
  }

  & strong {
    font-weight: 700;
    margin-bottom: 0.5rem;
    display: none;
  }

  & span {
    font-weight: 300;
  }

  ${({ isMobile }) =>
    isMobile &&
    css`
      & strong {
        display: block;
      }
    `}
`;
