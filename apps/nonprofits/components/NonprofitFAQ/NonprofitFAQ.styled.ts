import styled from '@emotion/styled';

export const Root = styled.section`
  padding: 4rem 2rem;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 680px;
`;

export const Question = styled.h3`
  font-size: 32px;
  font-weight: 300;
  line-height: 36px;
  letter-spacing: 0.02em;
  margin-bottom: 2rem;
`;

export const Copy = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  margin-bottom: 1rem;
`;

export const Wrapper = styled.div`
  & button {
    font-weight: 600;
  }
`;
