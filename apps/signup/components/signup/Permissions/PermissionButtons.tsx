import { Button, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content } from './Permissions.styled';
import React from 'react';

export const PermissionButtons = (props: any) => {
  const { buttonLabel, buttonOnClick, homeLabel, homeOnClick } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Content {...styledBaseProps}>
      <VStack spacing={{ base: '0.5rem', md: '1rem' }}>
        <Button
          size="lg"
          w="200px"
          variant="neutral"
          onClick={() => buttonOnClick()}
        >
          {buttonLabel}
        </Button>
        <Button
          w="200px"
          size="lg"
          variant="ghost"
          _hover={{ bg: 'whiteAlpha.200' }}
          onClick={() => homeOnClick()}
        >
          {homeLabel}
        </Button>
      </VStack>
    </Content>
  );
};
