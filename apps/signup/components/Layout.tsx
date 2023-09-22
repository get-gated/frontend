import { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

interface Props {
  children?: ReactNode;
}

export const Layout = ({ children }: Props) => (
  <Container size="xl">{children}</Container>
);
