/* eslint-disable react/no-children-prop */
import { Heading, Link, Text, VStack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content } from './Intro.styled';
import { SignupButton } from '@gated/ui/components';

export const Intro = (props: any) => {
  const {
    title,
    emphasis,
    description,
    linkDescription,
    linkLabel,
    linkOnClick,
    nonprofitId,
  } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Content {...styledBaseProps}>
      <VStack spacing="2rem" alignItems="start">
        <Heading size={{ base: 'xl', md: '2xl' }} as="h1">
          {title}
        </Heading>
        <Text fontSize={{ base: 'xl', md: '2xl' }} as="p">
          <strong>{emphasis}</strong> {description}
        </Text>
        <SignupButton
          nonprofitId={nonprofitId}
          buttonProps={{
            maxWidth: '100%',
            size: 'lg',
            variant: 'neutral',
            color: '#000001', //TODO: Figure out another way to solve for iOS Safari
          }}
        />
        <Text as="p" variant="text-body-medium">
          {linkDescription}{' '}
          <Link onClick={linkOnClick}>
            <u>{linkLabel}</u>
          </Link>
        </Text>
      </VStack>
    </Content>
  );
};
