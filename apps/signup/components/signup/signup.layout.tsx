import React, { ReactNode } from 'react';

interface SignupLayoutProps {
  children: ReactNode;
}
import { Layout } from '@components';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { HighContrastStyle } from '@components/high-contrast-style';

const Content = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex: 1;
`;

export const SignupLayout = ({ children }: SignupLayoutProps) => {
  return (
    <>
      <HighContrastStyle />
      <Layout>
        <Flex minH="100vh">
          <Content>{children}</Content>
        </Flex>
      </Layout>
    </>
  );
};
