import styled from '@emotion/styled';
import { HTMLMotionProps, motion } from 'framer-motion';
import { theme } from '@gated/ui';
export const userTestimonialVariants = ['default', 'accent'] as const;
export type UserTestimonialVariant = typeof userTestimonialVariants[number];

interface RootProps extends HTMLMotionProps<'div'> {
  variant?: UserTestimonialVariant;
}

const AVATAR_CONTAINER_SIZE = 100;
const AVATAR_OFFSET = 0.975;
const AVATAR_SIZE = AVATAR_CONTAINER_SIZE * AVATAR_OFFSET;

export const AvatarContainer = styled.div`
  position: relative;
  width: ${AVATAR_CONTAINER_SIZE}px;
  height: ${AVATAR_CONTAINER_SIZE}px;
  border-radius: 50%;
`;

export const Avatar = styled.img`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  transform: translate3d(0.5rem, 0.75rem, 0);
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.blue[100]};
  filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.12));
`;

export const Root = styled(motion.div)<RootProps>`
  position: relative;
  width: 460px;
  height: fit-content;
  margin: 1rem;
  padding: 2rem;
  border-radius: 12px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;

  ${({ variant }) =>
    variant === 'default' &&
    `
    background-color: ${theme.colors.white};

    & h3 {
      color: ${theme.colors.blue[800]};
    }

    & strong {
      color: ${theme.colors.blue[900]};
    }
    
    & span {
      color: ${theme.colors.gray[700]};
    }
  `}

  ${({ variant }) =>
    variant === 'accent' &&
    `
    background-color: ${theme.colors.blue[500]};

    & h3 {
      color: ${theme.colors.white};
    }

    & strong {
      color: ${theme.colors.blue[100]};
    }
    
    & span {
      color: ${theme.colors.gray[100]};
    }
  `}  

  & svg {
    width: 62px;
    height: 43px;
    position: absolute;
    top: 0;
    left: 2rem;
    transform: translateY(-50%);
    filter: drop-shadow(0px 1px 2px rgba(0, 0, 0, 0.12));

    ${({ variant }) =>
      variant === 'default' &&
      `
        color: #fee49d;
    `}

    ${({ variant }) =>
      variant === 'accent' &&
      `
        color: #d6fcee;
    `}
  }

  ${AvatarContainer} {
    ${({ variant }) =>
      variant === 'default' &&
      `
        background-color: #FFE49D;
    `}

    ${({ variant }) =>
      variant === 'accent' &&
      `
        background-color: #d6fcee;
    `}
  }
`;

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 0.5rem;
  margin-bottom: 1rem;

  & h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }
`;

export const Meta = styled.p`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 500;

  & strong {
    font-weight: 700;
  }
`;
