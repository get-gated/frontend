import { Box, Heading, Text, Container, Stack, Flex } from '@chakra-ui/react';

import boxTwoBg from '@components/squeeze-page/SplitBlock/assets/box-two-bg.svg';
import boxOneBg from '@components/squeeze-page/SplitBlock/assets/box-one-bg.svg';

export const SplitBlock = () => {
  const Content = ({ heading, text, ...rest }) => (
    <Box className="box" {...rest} p={{ base: '6rem 2rem', md: '12rem 4rem' }}>
      <Flex h={['auto', null, '375px']} alignItems="center" dir="column">
        <Heading size={{ base: 'xl', md: '3xl' }} as="h3">
          {heading}
        </Heading>
      </Flex>
      <Text
        as="p"
        fontSize={{ base: 'xl', md: '3xl' }}
        pt={{ base: '2rem', md: '0' }}
      >
        {text}
      </Text>
    </Box>
  );

  return (
    <Box position="relative">
      <Box
        backgroundColor="blue.800"
        backgroundImage={boxOneBg.src}
        backgroundRepeat="no-repeat"
        backgroundPosition="bottom right"
        w={['100%', null, '50%']}
        left="0"
        backgroundSize={['contain', null, 'auto']}
        position="absolute"
        h={['50%', null, '100%']}
        zIndex="hide"
      />
      <Box
        backgroundColor="brand.400"
        className="box-secondary box"
        backgroundImage={boxTwoBg.src}
        backgroundRepeat="no-repeat"
        backgroundPosition="top left"
        backgroundSize={['contain', null, 'auto']}
        w={['100%', null, '50%']}
        right="0"
        position="absolute"
        h={['50%', null, '100%']}
        zIndex="hide"
        top={['50%', null, 0]}
      />
      <Container>
        <Stack direction={['column', null, 'row']}>
          <Content
            heading="Email overload is painful."
            text="Gated automatically keeps distracting, unwanted emails out of
              sight, reducing inbox volume by 43% on average."
            color="white"
          />

          <Content
            heading="It's hard to be productive in your hot mess of an inbox."
            text="Gated ensures every email in your inbox is from people you know -
              or those who value your attention."
          />
        </Stack>
      </Container>
    </Box>
  );
};
