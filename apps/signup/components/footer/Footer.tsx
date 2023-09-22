import {
  IoLogoTwitter as IconTwitter,
  IoLogoTiktok as IconTikTok,
  IoLogoLinkedin as IconLinkedIn,
  IoMic as IconPodcast,
} from 'react-icons/io5';

import { SignupButton } from '@gated/ui/components';

import { LogoNext } from '@components';

import {
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
  Box,
  Link,
  Heading,
} from '@chakra-ui/react';

export const Footer = () => {
  return (
    <Box bg="bg-muted" scrollSnapAlign="end">
      <Container as="footer" role="contentinfo">
        <Stack
          spacing="8"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          py={{ base: '12', md: '16' }}
        >
          <Stack spacing={{ base: '6', md: '8' }} align="start">
            <LogoNext />
            <ButtonGroup variant="solid" colorScheme="gray" color="muted">
              <IconButton
                as="a"
                icon={<IconLinkedIn />}
                aria-label="Gated on LinkedIn"
                href="https://www.linkedin.com/company/gated"
                target="_blank"
                rel="noopener noreferrer"
              />
              <IconButton
                as="a"
                icon={<IconTikTok />}
                aria-label="Gated on TikTok"
                href="https://www.tiktok.com/@teamgated"
                target="_blank"
                rel="noopener noreferrer"
              />

              <IconButton
                as="a"
                icon={<IconTwitter />}
                aria-label="Gated on Twitter"
                href="https://www.twitter.com/teamgated"
                target="_blank"
                rel="noopener noreferrer"
              />

              <IconButton
                as="a"
                icon={<IconPodcast />}
                aria-label="Gated's Podcast"
                href="https://podcasts.apple.com/us/podcast/finding-focus/id1635153064"
                target="_blank"
                rel="noopener noreferrer"
              />
            </ButtonGroup>
          </Stack>
          <Stack
            direction={{ base: 'column-reverse', md: 'column', lg: 'row' }}
            spacing={{ base: '12', md: '8' }}
            color="muted"
            fontWeight="semibold"
          >
            <Stack direction="row" spacing="8">
              <Stack
                spacing="3"
                minW={{ base: 24, lg: 36 }}
                flex="1"
                shouldWrapChildren
              >
                <Link href="https://www.gated.com/about/company">About</Link>
                <Link href="https://www.gated.com/about/manifesto">
                  Manifesto
                </Link>
                <Link href="https://www.gated.com/blog">Blog</Link>
                <Link href="https://www.gated.com/about/pricing">Pricing</Link>
              </Stack>

              <Stack
                spacing="3"
                minW={{ base: 24, lg: 36 }}
                flex="1"
                shouldWrapChildren
                alignItems="start"
              >
                <Link href="https://www.gated.com/for/users">Who We Help</Link>
                <Link href="https://www.gated.com/faq">FAQ</Link>
                <Link href="https://www.gated.com/about/privacy-policy">
                  Privacy
                </Link>
                <Link href="https://www.gated.com/about/terms-of-service">
                  Terms
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack spacing="4">
            <Heading size="sm" color="subtle">
              Get Gated for Free
            </Heading>

            <SignupButton />
          </Stack>
        </Stack>
        <Divider />
        <Stack
          pt="8"
          pb="12"
          justify="space-between"
          direction={{ base: 'column-reverse', md: 'row' }}
          align="center"
        >
          <Text fontSize="sm" color="subtle">
            &copy; {new Date().getFullYear()} Gated, Inc. All rights reserved.
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
