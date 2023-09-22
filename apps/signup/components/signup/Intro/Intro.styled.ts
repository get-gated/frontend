import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Content = styled.div<StyledBaseProps>`
  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      max-width: 720px;
      padding: 4rem 3rem;

      & p {
        max-width: 80%;
      }
    `}
`;
