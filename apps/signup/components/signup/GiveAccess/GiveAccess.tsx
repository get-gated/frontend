import { Button, Heading, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';
import { Content } from './GiveAccess.styled';
import React from 'react';
import { ConnectingLogos } from '@components/signup/Congrats/ConnectingLogos';

export const GiveAccess = (props: any) => {
  const { title, description, buttonLabel, buttonOnClick } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Content {...styledBaseProps}>
      <VStack spacing={{ base: '2rem', md: '3rem' }}>
        <ConnectingLogos isDisconnected />
        <Heading size={{ base: 'xl', md: '2xl' }} as="h1">
          {title}
        </Heading>
        <Text fontSize={{ base: 'xl', md: '2xl' }} as="p">
          {description}
        </Text>
        <Button
          w={{ base: '100%', md: '50%' }}
          size="xl"
          shadow="xl"
          variant="neutral"
          onClick={() => buttonOnClick()}
        >
          {buttonLabel}
        </Button>
      </VStack>
    </Content>
  );
};
