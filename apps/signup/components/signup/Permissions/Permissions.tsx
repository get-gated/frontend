import { Box, BoxProps, Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content, Root } from './Permissions.styled';
import React from 'react';
import { PermissionButtons } from './PermissionButtons';

export const Permissions = (props: any) => {
  const { title, description } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  const permissionButtonBoxProps: BoxProps =
    viewport === 'mobile'
      ? {
          w: '100%',
          left: 0,
          alignItems: 'center',
          zIndex: 10,
          style: { position: 'fixed', bottom: 0 },
          backgroundColor: 'gray.800',
        }
      : { pt: '2rem' };

  return (
    <Root {...styledBaseProps}>
      <Content {...styledBaseProps}>
        <VStack spacing={{ base: '1rem', md: '2rem' }} pt="4rem">
          {viewport === 'mobile' && <Spacer />}
          <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
            {title}
          </Heading>
          <Text as="p" fontSize={{ base: 'xl', md: '2xl' }}>
            {description}
          </Text>
          <Box {...permissionButtonBoxProps}>
            <PermissionButtons {...props} />
          </Box>
        </VStack>
      </Content>
    </Root>
  );
};
