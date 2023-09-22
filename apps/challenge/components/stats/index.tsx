import {
  DarkMode,
  Stack,
  Stat,
  StatNumber,
  Text,
  Image,
  BoxProps,
  Center,
} from '@chakra-ui/react';
import CountUp from 'react-countup';
import React, { memo } from 'react';
import { HighlightBox } from '@components/highlight-box';
import { IoArrowUndoOutline as ReplyIcon } from 'react-icons/io5';
import G2Logo from '@assets/images/G2_Crowd_logo.svg';

export const Stats = memo(() => {
  const boxProps: Partial<BoxProps> = {
    minW: { base: '167px', md: '180px', xl: '200px' },
    w: { base: '50%', xl: 'auto' },
  };
  return (
    <DarkMode>
      <Stack direction={{ base: 'row', md: 'column', lg: 'row', xl: 'column' }}>
        <HighlightBox
          {...boxProps}
          heading="Reply Rate"
          headingIcon={ReplyIcon}
          infoTooltip={
            <Text>
              Average reply rate
              <sup>†</sup> to donations made to Gated users
            </Text>
          }
        >
          <Stat w="full" textAlign="center">
            <StatNumber color="accent">
              <CountUp start={0} end={46} suffix="%" duration={2} useEasing />
            </StatNumber>
          </Stat>
        </HighlightBox>

        <HighlightBox {...boxProps} p={3} as={Center}>
          <Stack direction="row" alignItems="center">
            <Image src={G2Logo.src} height="30px" alt="G2 Logo" pr="2" />

            <Text
              fontWeight="semibold"
              color="muted"
              fontSize={{ base: 'sm', md: 'md' }}
            >
              High Performer
              <br />
              Fall 2022
            </Text>
          </Stack>
        </HighlightBox>
      </Stack>
    </DarkMode>
  );
});
