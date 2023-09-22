import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { HTMLMotionProps, motion } from 'framer-motion';
import { darken } from 'polished';
import { css } from '@emotion/react';

export const Root = styled.section`
  padding: 2rem 2rem 6rem;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 680px;
  min-height: 280px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Review = styled(motion.figure)<HTMLMotionProps<'figure'>>`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex: none;

  & p {
    width: 100%;
    max-width: 680px;

    font-size: 32px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0.02em;
    flex: none;
    margin-bottom: 0.75rem;
  }

  & figcaption {
    text-align: right;
  }
`;

export const Actions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0.5rem;
`;

export const Control = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  color: #cacdd1;
  background-color: #eef1f7;

  &:active {
    background-color: ${darken(0.1, '#eef1f7')};
  }
`;

export const Avatars = styled.div`
  display: grid;
  grid-template-columns: repeat(9, max-content);
  gap: 0.125rem;
  align-items: flex-end;
`;

interface AvatarProps extends HTMLMotionProps<'img'> {
  isActive?: boolean;
}
export const Avatar = styled(motion.img, {
  shouldForwardProp: (prop: string) =>
    (!['isActive'].includes(prop) && isPropValid(prop)) || prop === 'children',
})<AvatarProps>`
  border-radius: 50%;
  width: ${({ isActive }) => (isActive ? '64px' : '32px')};
  width: ${({ isActive }) => (isActive ? '64px' : '32px')};
  ${({ isActive }) =>
    isActive &&
    css`
      order: -1;
    `}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  max-width: 680px;
`;
