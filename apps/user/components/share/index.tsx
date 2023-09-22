import { HStack, Icon, IconButton } from '@chakra-ui/react';
import {
  IoLogoLinkedin as LinkedInIcon,
  IoLogoTwitter as TwitterIcon,
  IoMail as EmailIcon,
} from 'react-icons/io5';
import React from 'react';
import { useAnalytics } from '@gated/app';
interface ShareProps {
  nonprofitName: string;
}
export const Share = ({ nonprofitName }: ShareProps) => {
  const { track } = useAnalytics();
  const link = `https://gated.com/`;

  const subject = 'Check Out Gated';
  const body = `I just used Gated to ensure my email gets seen, by making a donation to ${nonprofitName}.\n${link}`;

  const tweet = `I just used Gated to ensure my email gets seen, by making a donation to ${nonprofitName}. ${link}`;

  return (
    <HStack spacing={12}>
      <IconButton
        variant="ghost"
        icon={<Icon as={LinkedInIcon} boxSize={8} />}
        colorScheme="secondary"
        aria-label="LinkedIn"
        size="lg"
        onClick={() => {
          track('challenge_share_clicked', { target: 'LINKEDIN' });
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              link,
            )}`,
            '_blank',
          );
        }}
      />

      <IconButton
        variant="ghost"
        icon={<Icon as={TwitterIcon} boxSize={8} />}
        colorScheme="secondary"
        aria-label="Twitter"
        size="lg"
        onClick={() => {
          track('challenge_share_clicked', { target: 'TWITTER' });
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweet,
            )}`,
            '_blank',
          );
        }}
      />
      <IconButton
        variant="ghost"
        icon={<Icon as={EmailIcon} boxSize={8} />}
        colorScheme="secondary"
        aria-label="Email"
        size="lg"
        onClick={() => {
          track('challenge_share_clicked', { target: 'EMAIL' });

          window.location.href = `mailto:?subject=${encodeURIComponent(
            subject,
          )}&body=${encodeURIComponent(body)}`;
        }}
      />
    </HStack>
  );
};
