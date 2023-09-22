import {
  Box,
  BoxProps,
  Button,
  Container,
  Flex,
  Slide,
  SlideDirection,
  Spacer,
  useBreakpointValue,
} from '@chakra-ui/react';

import { debounce } from 'lodash';
import { AuthProviderType, AuthStatus, AuthType, useAuth } from '@gated/app';
import { App, useAppLink } from '@gated/app/hooks';

import { LogoNext } from '../LogoNext';
import { MutableRefObject, useEffect, useState } from 'react';
import { AuthButton } from '@gated/ui/components/auth-button';

export const Header = ({
  pageRef,
  showStickyHeaderTargetRef,
}: {
  pageRef: MutableRefObject<HTMLDivElement>;
  showStickyHeaderTargetRef: MutableRefObject<HTMLDivElement>;
}) => {
  const appLink = useAppLink();
  const { status } = useAuth();

  const [showStickyHeader, setShowStickyHeader] = useState(false);

  const logoWidth = useBreakpointValue({
    base: '120px',
    sm: '140px',
  });

  // Sticky Menu Area
  useEffect(() => {
    if (!pageRef) return;
    pageRef.current.addEventListener('scroll', isSticky);

    return () => {
      pageRef.current.removeEventListener('scroll', isSticky);
    };
  }, [pageRef]);

  /* Method that will fix header after a specific scrollable */
  const isSticky = debounce(
    () => {
      const scrollTop = pageRef.current.scrollTop;
      setShowStickyHeader(
        scrollTop >= showStickyHeaderTargetRef.current.offsetTop,
      );
    },
    50,
    { leading: true },
  );

  interface HeaderFrameProps extends BoxProps {
    backgroundElement?: JSX.Element;
    in?: boolean;
    direction?: SlideDirection;
  }

  const HeaderFrame = ({
    backgroundElement = null,
    children,
    ...rest
  }: HeaderFrameProps) => (
    <Box zIndex="sticky" w="full" top="0" left="0" {...rest}>
      {backgroundElement}
      <Container>
        <Flex
          align="center"
          justifyContent="space-between"
          height={rest.height}
        >
          {children}
        </Flex>
      </Container>
    </Box>
  );

  return (
    <>
      <Box scrollSnapAlign="start">
        <HeaderFrame height="138px">
          <LogoNext width={logoWidth} />
          <Spacer />
          {status === AuthStatus.SignedIn ? (
            <Button
              shadow="md"
              bg="white"
              _hover={{
                bg: 'gray.100',
              }}
              onClick={() =>
                (window.location.href = appLink(App.Dashboard, '/app'))
              }
            >
              My Dashboard
            </Button>
          ) : (
            <AuthButton
              redirectPath="/loading"
              buttonTitle="Login"
              authProvider={AuthProviderType.Google}
              authType={AuthType.Login}
              buttonProps={{
                variant: 'neutral',
              }}
            />
          )}
        </HeaderFrame>
      </Box>

      <HeaderFrame
        as={Slide}
        in={showStickyHeader}
        direction="top"
        backgroundElement={
          <Box
            position="absolute"
            h="100%"
            w="100%"
            bg="rgba(255, 255, 255, 0.8)"
            backdropFilter="blur(5px)"
            zIndex="hide"
          />
        }
        borderBottom="1px solid"
        borderColor="gray.50"
        position="fixed"
        top="0"
        height="80px"
        transition="margin-top 1s ease"
        shadow="sm"
      >
        <LogoNext width="100px" />
        <Spacer />
        <Button
          mr={2}
          variant="primary"
          shadow="md"
          onClick={() =>
            (window.location.href = appLink(App.Signup, `/signup`))
          }
        >
          Get Started
        </Button>
      </HeaderFrame>
    </>
  );
};
