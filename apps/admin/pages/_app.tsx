import { useAuth, AppProvider } from '@gated/app';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { Spinner, Layout, BrandLogo } from '@gated/ui/components';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { UIProvider } from '@gated/ui';

export default function AdminApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider auth={{ adminOnly: true }} appName="Admin">
      <UIProvider colorMode="light">
        <Layout
          width="wide"
          header={
            <Flex py={{ base: 3, md: 8 }} justify="space-between">
              <Box
                as={Link}
                href="https://www.gated.com"
                textStyle="caption"
                fontWeight="semibold"
              >
                <a>
                  <HStack>
                    <Box mr={2}>
                      <BrandLogo height="36px" width="108px" />
                    </Box>
                    <Text>ADMIN</Text>
                  </HStack>
                </a>
              </Box>
            </Flex>
          }
        >
          <Flex flex={1}>
            <WaitForReady>
              <Component {...pageProps} />
            </WaitForReady>
          </Flex>
        </Layout>
      </UIProvider>
    </AppProvider>
  );
}

function WaitForReady({ children }: { children: ReactNode }) {
  const { isReady } = useAuth();

  if (!isReady) return <Spinner />;

  return <>{children}</>;
}
