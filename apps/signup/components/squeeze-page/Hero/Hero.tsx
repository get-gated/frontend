import { Container, Heading, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';

import { colorModeAtom, viewportAtom } from '@/store';

import { Content, Root, SecondaryContent } from './Hero.styled';

import { SignupButton } from '@gated/ui/components';

export const Hero = (props: any) => {
  const { title, description, secondaryContent } = props;

  const colorMode = useAtomValue(colorModeAtom);
  const viewport = useAtomValue(viewportAtom);
  const styledBaseProps = { colorMode, viewport };

  const buttonSize = viewport === 'desktop' ? 'xl' : 'lg';

  return (
    <Container>
      <Root>
        <Content {...styledBaseProps}>
          <Heading size={{ base: '2xl', md: '3xl' }} as="h1">
            {title}
          </Heading>
          <Text fontSize={{ base: '2xl', md: '3xl' }} as="p">
            {description}
          </Text>
          <SignupButton buttonProps={{ size: buttonSize }} />
        </Content>
        <SecondaryContent {...styledBaseProps}>
          {secondaryContent}
        </SecondaryContent>
      </Root>
    </Container>
  );
};
