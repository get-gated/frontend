import React from 'react';
import { Heading, HStack, Icon, Link } from '@chakra-ui/react';
import { BsFillPlayCircleFill } from 'react-icons/bs';

export const InfoVideoLink = () => {
  return (
    <Link
      textStyle="lead"
      placeSelf="center"
      href="https://player.vimeo.com/video/602127721"
      isExternal
    >
      <HStack>
        <Icon as={BsFillPlayCircleFill} />
        <Heading size="sm"> Watch how gated works</Heading>
      </HStack>
    </Link>
  );
};
