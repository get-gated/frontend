import {
  IoLogoTwitter as IconTwitter,
  IoLogoTiktok as IconTikTok,
  IoLogoLinkedin as IconLinkedIn,
  IoMic as IconPodcast,
} from 'react-icons/io5';

import { BrandLogo } from '@gated/ui/components';

import {
  ButtonGroup,
  Container,
  Divider,
  IconButton,
  Stack,
  Text,
  Box,
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
            <BrandLogo />
          </Stack>

          <Stack spacing="4">
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
