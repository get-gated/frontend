import { css, Global } from '@emotion/react';
import { theme } from '@gated/ui';

const globalStyles = css`
  body {
    background-color: ${theme.colors.gray[800]};
    color: white;
  }
`;
export function HighContrastStyle() {
  return <Global styles={globalStyles} />;
}
