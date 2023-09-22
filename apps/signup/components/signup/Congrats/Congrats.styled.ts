import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Content = styled.div<StyledBaseProps>`
  text-align: center;

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      padding: 4rem 3rem;

      & p {
        max-width: 80%;
      }
    `}
`;
