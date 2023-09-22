import {
  Avatar,
  Box,
  Button,
  Container,
  DarkMode,
  Heading,
  Image as Img,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useUserPageContext } from '../user-page/user-page.context';
import { Footer } from '@components/footer';
import { BackgroundArt } from '@components/background-art';
import { Header } from '@components/header';
import { App, useAppLink } from '@gated/app/hooks';
import { useApp } from '@gated/app';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  heroContent: ReactNode;
}
export function Layout({ children, heroContent }: LayoutProps) {
  const {
    user: { userId, referralCode },
    donationProfile,
  } = useUserPageContext();

  const appLink = useAppLink();
  const { config } = useApp();

  const getGatedLink = appLink(App.Signup, `/?ref=${referralCode}`);

  return (
    <>
      <Img
        src={`${config?.apiOrigin}/api/impression/${userId}/${donationProfile.nonprofit.nonprofitId}/USER_PAGE/load.gif`}
        display="none"
      />
      <Box w="full" overflowX="hidden">
        <Container pb={12}>
          <BackgroundArt>
            <DarkMode>
              <Header markDotColor="white" textColor="white">
                <Button as="a" variant="outline" href={getGatedLink}>
                  Get Gated for Free
                </Button>
              </Header>
              <VStack
                color="white"
                pb={24}
                pt={12}
                spacing={8}
                textAlign={{ base: 'center', md: 'left' }}
              >
                {heroContent}
              </VStack>
            </DarkMode>
          </BackgroundArt>
          <VStack
            spacing={4}
            p={4}
            borderRadius="md"
            bg="bg-surface"
            mt={-16}
            w={{ base: 'full', md: '500px' }}
            mx="auto"
          >
            {children}
          </VStack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
