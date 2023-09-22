import styled from '@emotion/styled';
import { css } from '@emotion/react';

import { StyledBaseProps } from '@gated/ui';

export const Content = styled.div<StyledBaseProps>`
  width: 100%;
  text-align: center;

  ${({ viewport }) =>
    viewport !== 'mobile' &&
    css`
      max-width: 720px;

      & p {
        max-width: 80%;
      }
    `}
`;
