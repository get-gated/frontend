/* eslint-disable react/no-children-prop */
import { Button, Spacer, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content } from './Congrats.styled';
import React from 'react';
import { ConnectingLogos } from './ConnectingLogos';

export const Congrats = (props: any) => {
  const { description, email, buttonText, buttonOnClick } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Content {...styledBaseProps}>
      <VStack spacing={{ base: '2rem', md: '3rem' }}>
        <ConnectingLogos />
        <Text fontSize={{ base: 'xl', md: '2xl' }}>
          {description}
          {email ? ' for ' : '!'}
          {email && <>&ldquo;{email}&rdquo;</>}
        </Text>
        <Spacer />
        <Button
          variant="neutral"
          size="xl"
          onClick={buttonOnClick}
          w={{ base: '100%', md: 'auto' }}
        >
          {buttonText}
        </Button>
      </VStack>
    </Content>
  );
};
