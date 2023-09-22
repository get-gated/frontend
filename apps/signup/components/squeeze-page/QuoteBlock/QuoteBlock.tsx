import {
  Container,
  Box,
  VStack,
  Text,
  HStack,
  Center,
  Show,
} from '@chakra-ui/react';
import Image from 'next/image';
import quoteImage from '@assets/images/squeeze-page/open-quote.svg';

export const QuoteBlock = ({ text, name, image }: any) => {
  return (
    <Container scrollSnapAlign="start">
      <HStack
        w={{ base: '90%', md: '85%' }}
        mx="auto"
        spacing={4}
        height="100vh"
      >
        <VStack
          alignItems="start"
          position="relative"
          w={{ base: '100%', md: '50%' }}
        >
          <Box
            position="absolute"
            left={{ base: 0, md: '-50px' }}
            top={{ base: '-70px', md: '-50px' }}
          >
            <Image src={quoteImage.src} width="41px" height="93px" />
          </Box>

          <Text fontSize="3xl" fontWeight="semibold">
            {text}
          </Text>
          <Text fontSize="2xl">{name}</Text>
        </VStack>
        <Show above="md">
          <Center w="50%" h="100%">
            <Image width="400px" height="300px" src={image} />
          </Center>
        </Show>
      </HStack>
    </Container>
  );
};
