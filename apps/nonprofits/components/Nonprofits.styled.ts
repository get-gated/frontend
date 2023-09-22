import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { ColorMode, Viewport } from '@gated/ui';

export type StyledBaseProps = {
  colorMode?: ColorMode;
  isDesktop?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  viewport?: Viewport;
};

export const globalStyleOverrides = css`
  body {
    background: white !important;
  }
`;

export const Root = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.colors.gray[800]};
`;
