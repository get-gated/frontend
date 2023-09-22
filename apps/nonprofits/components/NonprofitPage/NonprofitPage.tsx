import React, { useEffect, useRef } from 'react';
import { Button, useBreakpointValue, useColorMode } from '@chakra-ui/react';
import { useAtomValue, useSetAtom } from 'jotai';

import { BrandLogo } from '@gated/ui/components';
import { useAnalytics } from '@gated/app';

import {
  NonprofitExplainer,
  NonprofitFAQ,
  NonprofitHero,
  NonprofitMeta,
  NonprofitMetrics,
  NonprofitReviews,
  NonprofitSignup,
  NonprofitSignupForm,
} from '../';
import {
  colorModeAtom,
  nonprofitAtom,
  styledBasePropsAtom,
  viewportAtom,
} from '../Nonprofits.store';
import {
  Container,
  Footer,
  FooterLinks,
  FooterSignup,
  FooterSummary,
  Header,
  Root,
  StickyWrapper,
} from './NonprofitPage.styled';
import { App, useAppLink } from '@gated/app/hooks';

export const NonprofitPage = () => {
  const viewport = useBreakpointValue({
    base: 'mobile',
    md: 'tablet',
    xl: 'desktop',
  });

  const { colorMode } = useColorMode();
  const { track } = useAnalytics();
  const setViewport = useSetAtom(viewportAtom);
  const setColorMode = useSetAtom(colorModeAtom);
  const styledBaseProps = useAtomValue(styledBasePropsAtom);
  const explainerSectionRef = useRef(null);
  const appLink = useAppLink();
  const nonprofit = useAtomValue(nonprofitAtom);

  useEffect(() => {
    if (viewport) setViewport(viewport);
    if (colorMode) setColorMode(colorMode);
  }, [viewport, colorMode, setViewport, setColorMode]);

  useEffect(() => {
    track('user_VisitedNonprofitPage', {
      signup_phase: 'visited',
    });
  }, [track]);

  const handleClick = () => {
    track('user_ClickedSignup', {
      signup_phase: 'intended',
    });

    window.location.href = appLink(
      App.Signup,
      `/signup?nonprofitId=${nonprofit.nonprofitId}`,
    );
  };

  return (
    <>
      <Header>
        <Container>
          <BrandLogo />
          <Button
            bg="linear-gradient(
                    265deg,
                    rgba(255, 255, 255, 0.2) 22.85%,
                    rgba(25, 106, 255, 0.2) 51.47%
                  ), #196AFF"
            color="white"
            onClick={handleClick}
            size="sm"
          >
            Sign Up
          </Button>
        </Container>
      </Header>
      <Root>
        <StickyWrapper>
          <NonprofitSignup />
          <NonprofitMeta />
          <NonprofitHero explainerSectionRef={explainerSectionRef} />
          <NonprofitMetrics />
        </StickyWrapper>
        <NonprofitReviews />
        <NonprofitExplainer ref={explainerSectionRef} />
        <NonprofitFAQ />
      </Root>
      <Footer {...styledBaseProps}>
        <Container>
          <FooterSummary>
            <BrandLogo />
            <p>
              Gated&apos;s mission is to make your inbox - and the world - a
              better place. Your email is always private and secure.
            </p>
          </FooterSummary>
          <FooterLinks>
            <ul>
              <li>
                <a href="https://www.gated.com/about/company">About</a>
              </li>
              <li>
                <a href="https://www.gated.com/about/pricing">Pricing</a>
              </li>
              <li>
                <a href="https://www.gated.com/about/careers">Careers</a>
              </li>
              <li>
                <a href="https://www.gated.com/blog">Blog</a>
              </li>
              <li>
                <a href="https://www.gated.com/about/privacy-policy">
                  Security Policy
                </a>
              </li>
              <li>
                <a href="https://www.gated.com/about/privacy-policy">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="https://www.gated.com/about/terms-of-service">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="https://www.gated.com/faq">FAQ</a>
              </li>
            </ul>
          </FooterLinks>
          <FooterSignup>
            <h4>Get started</h4>
            <p>
              Sign up for a more focused inbox - and support your favorite
              nonprofit.
            </p>
            <NonprofitSignupForm />
          </FooterSignup>
        </Container>
      </Footer>
    </>
  );
};
