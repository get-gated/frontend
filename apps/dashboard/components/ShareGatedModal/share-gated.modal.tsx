import {
  Box,
  Button,
  Center,
  Divider,
  Fade,
  HStack,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  VStack,
} from '@chakra-ui/react';

import {
  IoLogoLinkedin as LinkedInIcon,
  IoLogoTwitter as TwitterIcon,
  IoMail as EmailIcon,
  IoLogoSlack as SlackIcon,
  IoCloseOutline as CloseIcon,
} from 'react-icons/io5';

import { useState } from 'react';
import { CopyInput } from '@gated/ui/components';
import { useMe } from '@gated/app';

export function ShareGatedModal({ isOpen, onClose }: UseDisclosureProps) {
  const [showSlack, setShowSlack] = useState(false);
  const { user } = useMe();
  const link = `https://gated.com/?ref=${user.referralCode}`;

  const subject = 'Join me on Gated';
  const body = `Keep unwanted messages out of your inbox while raising money for a cause you care about -- 100% Free!\n${link}`;

  const tweet = `I’m making my inbox - and the world - a better place. Join me and try Gated for free! ${link}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>Share Gated</ModalHeader>
        <ModalBody>
          <VStack spacing={3}>
            <Text>
              Help your network make their inboxes - and the world - a better
              place.
            </Text>
            <Divider variant="subtle" />
            <VStack position="relative">
              <Text textStyle="caption">Share on...</Text>
              <HStack spacing={12}>
                <IconButton
                  variant="ghost"
                  icon={<Icon as={LinkedInIcon} boxSize={8} />}
                  colorScheme="secondary"
                  aria-label="LinkedIn"
                  size="lg"
                  onClick={() =>
                    window.open(
                      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                        link,
                      )}`,
                      '_blank',
                    )
                  }
                />

                <IconButton
                  variant="ghost"
                  icon={<Icon as={TwitterIcon} boxSize={8} />}
                  colorScheme="secondary"
                  aria-label="Twitter"
                  size="lg"
                  onClick={() =>
                    window.open(
                      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        tweet,
                      )}`,
                      '_blank',
                    )
                  }
                />
                <IconButton
                  variant="ghost"
                  icon={<Icon as={SlackIcon} boxSize={8} />}
                  colorScheme="secondary"
                  aria-label="Slack"
                  size="lg"
                  onClick={() => setShowSlack(true)}
                />
                <IconButton
                  variant="ghost"
                  icon={<Icon as={EmailIcon} boxSize={8} />}
                  colorScheme="secondary"
                  aria-label="Email"
                  size="lg"
                  onClick={() =>
                    (window.location.href = `mailto:?subject=${encodeURIComponent(
                      subject,
                    )}&body=${encodeURIComponent(body)}`)
                  }
                />
              </HStack>

              <Center
                as={Fade}
                in={showSlack}
                unmountOnExit
                position="absolute"
                backgroundColor="bg-surface"
                top="-10px"
                left="-20px"
                right="-20px"
                bottom="0px"
              >
                <Text pr={2} textStyle="caption">
                  To share Gated on Slack, copy your Personal Share Link below
                  and paste into Slack.
                </Text>
                <IconButton
                  icon={<CloseIcon />}
                  aria-label="Close"
                  variant="outline"
                  onClick={() => setShowSlack(false)}
                />
              </Center>
            </VStack>
            <Divider variant="subtle" />
            <Box w="full">
              <CopyInput value={link} label="Your Personal Share Link" />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Done</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
