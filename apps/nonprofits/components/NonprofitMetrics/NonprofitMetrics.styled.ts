import styled from '@emotion/styled';

export const Root = styled.section`
  padding: 0 2rem;
  width: 100%;
  max-width: 660px;

  & h3 {
    font-size: 32px;
    font-weight: 300;
    line-height: 36px;
    letter-spacing: 0.02em;

    & + h3 {
      margin-top: 64px;
      margin-bottom: 24px;
    }
  }

  /* & svg {
    &.arrow {
      width: 70px;
      height: 185px;
      margin-bottom: 40px;
    }

    &.metrics {
      width: 100%;
      max-width: 480px;
      height: auto;
      margin-bottom: 32px;
    }
  } */
`;
