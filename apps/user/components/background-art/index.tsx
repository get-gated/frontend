import { Box, useBreakpointValue } from '@chakra-ui/react';

import DefaultImage from '@gated/assets/images/alexander-grey-62vi3TG5EDg-unsplash.jpg';

export const BackgroundArt = ({ children }) => {
  /** based on current container paddings as we can not do this in a way that will cause an overflow because overflow:hidden will break position:sticky **/
  const margin = useBreakpointValue({
    base: 'calc(var(--chakra-space-4) * -1)',
    md: 'calc(var(--chakra-space-8) * -1)',
    xl: 'calc(var(--chakra-sizes-7xl) / 2 - 50vw - var(--chakra-space-8))',
  });
  return (
    <Box position="relative" w="full">
      <Box
        zIndex="hide"
        position="absolute"
        width="100vw"
        overflow="hidden"
        top="-150px"
        height="calc(100% + 150px)"
        marginLeft={margin}
        marginRight={margin}
      >
        <Box
          position="absolute"
          left="0"
          top="0"
          width="100%"
          height="100%"
          backgroundSize="cover"
          backgroundImage={DefaultImage.src}
          transform="scale(1.2)"
          filter="grayscale(20%) blur(4px)"
        />
        <Box
          position="absolute"
          left="0"
          top="0"
          width="100%"
          height="100%"
          opacity="0.8"
          bgGradient="linear(to-r, primary.800, green.800)"
        />
      </Box>
      {children}
    </Box>
  );
};
