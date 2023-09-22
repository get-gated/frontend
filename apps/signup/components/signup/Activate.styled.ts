import styled from '@emotion/styled';

export const Container = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 138px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  & ${Container} {
    padding: 0 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
