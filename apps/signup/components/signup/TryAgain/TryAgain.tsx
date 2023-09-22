/* eslint-disable react/no-children-prop */
import { Button, Heading, Image, Link, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content } from './TryAgain.styled';
import RainCloudGraphic from '@gated/assets/images/rain-cloud.png';
import React from 'react';

export const TryAgain = (props: any) => {
  const {
    title,
    description,
    buttonText,
    buttonOnClick,
    loading,
    linkLabel,
    linkText,
    linkHref,
  } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  return (
    <Content {...styledBaseProps}>
      <Image
        display="block"
        alt="Error"
        marginLeft="auto"
        marginRight="auto"
        src={RainCloudGraphic.src}
      />
      <Heading as="h1" size={{ base: 'xl', md: '2xl' }}>
        {title}
      </Heading>
      <Text as="p" fontSize={{ base: 'xl', md: '2xl' }}>
        {description}
      </Text>
      <Button
        size="xl"
        variant="neutral"
        onClick={() => buttonOnClick()}
        isDisabled={loading}
      >
        {buttonText}
      </Button>
      <Text as="p" variant="text-body-medium">
        {linkLabel}{' '}
        <Link textDecoration="underline" href={linkHref}>
          {linkText}
        </Link>
      </Text>
    </Content>
  );
};
