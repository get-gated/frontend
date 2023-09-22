import { css } from '@emotion/react';

import { localFonts } from './fonts';
import { reset } from './reset';

export const globalStyles = css`
  ${localFonts};
  ${reset};

  :root {
    box-sizing: border-box;
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
  }
`;
