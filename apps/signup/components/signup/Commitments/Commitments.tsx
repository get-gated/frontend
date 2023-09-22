/* eslint-disable react/no-children-prop */
import { Box, Center, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content, Root } from './Commitments.styled';
import React from 'react';
import Image from 'next/image';

import Inbox from '@assets/images/signup/inbox.svg';
import Sender from '@assets/images/signup/sender.svg';
import Reply from '@assets/images/signup/reply.svg';
import Delete from '@assets/images/signup/delete.svg';
import Data from '@assets/images/signup/data.svg';
import Share from '@assets/images/signup/share.svg';
import GlowIndicator from '@assets/images/signup/glow-indicator.svg';

enum infoText {
  Inbox = "We keep your inbox clean by moving emails from people you don't know into a separate folder, so you can see them whenever you need them.",
  Sender = 'We only look at the To and From information of your emails to determine if you know the sender or not.',
  Reply = 'We automatically reply with a customizable email to unknown senders on your behalf.',
  Delete = 'We never delete your emails and you can always find emails from unknown senders whenever you want.',
  Share = 'We never look at the content of your emails and never sell or share your data.',
  Data = "We don't hold your data hostage. If Gated isn't right for you, you can delete your account and remove all of your email data from our system at any time.",
}

interface infoBoxProps {
  image: any;
  text: string;
}

const InfoBox = (props: infoBoxProps) => {
  return (
    <HStack
      py="0.75rem"
      pr="1rem"
      pl="0.5rem"
      color="black"
      bgColor="white"
      borderRadius="20px"
      spacing=".25rem"
      maxWidth="720px"
      maxHeight="200px"
    >
      <Center width={props.image.width}>
        <Image
          src={props.image.src}
          alt="Inbox"
          width={props.image.width}
          height={props.image.height}
        />
      </Center>
      <Box flex={1}>
        <Text>{props.text}</Text>
      </Box>
    </HStack>
  );
};

export const Commitments = () => {
  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Root {...styledBaseProps}>
      <Content {...styledBaseProps}>
        <VStack spacing="2rem" overflow="auto">
          <VStack align="left">
            <HStack>
              <Image
                src={GlowIndicator.src}
                alt="Indicator"
                width={GlowIndicator.width}
                height={GlowIndicator.height}
              />
              <Heading
                size="md"
                variant="text-display-small"
                fontSize="22px" //TODO: Replace with new variant
              >
                What we do
              </Heading>
            </HStack>
            <InfoBox image={Inbox} text={infoText.Inbox} />
            <InfoBox image={Sender} text={infoText.Sender} />
            <InfoBox image={Reply} text={infoText.Reply} />
          </VStack>
          <VStack align="left">
            <HStack>
              <Image
                src={GlowIndicator.src}
                alt="Indicator"
                width={GlowIndicator.width}
                height={GlowIndicator.height}
              />
              <Heading size="md">What we DON&apos;T do</Heading>
            </HStack>
            <InfoBox image={Delete} text={infoText.Delete} />
            <InfoBox image={Share} text={infoText.Share} />
            <InfoBox image={Data} text={infoText.Data} />
          </VStack>
        </VStack>
      </Content>
    </Root>
  );
};
