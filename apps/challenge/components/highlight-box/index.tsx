import { memo, ReactNode } from 'react';
import {
  As,
  Box,
  BoxProps,
  DarkMode,
  Icon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { IoInformationCircleOutline as InfoIcon } from 'react-icons/io5';
interface HighlightBoxProps extends BoxProps {
  heading?: string;
  headingIcon?: As;
  infoTooltip?: string | ReactNode;
}

export const HighlightBox = memo(
  ({
    heading,
    headingIcon,
    children,
    infoTooltip,
    ...rest
  }: HighlightBoxProps) => (
    <DarkMode>
      <Box
        shadow="lg"
        borderRadius="md"
        bg={{ base: 'blackAlpha.800', lg: 'blackAlpha.600' }}
        backdropBlur="5px"
        border="2px solid"
        borderColor="blackAlpha.200"
        position="relative"
        {...rest}
      >
        {heading && (
          <Text
            maxH={9}
            fontSize="sm"
            p={2}
            color="subtle"
            textAlign="center"
            borderBottom="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Icon as={headingIcon} verticalAlign="middle" mt={-1} mr={1} />{' '}
            {heading}
            {infoTooltip && (
              <Tooltip label={infoTooltip} hasArrow placement="top">
                <Box as="span" position="absolute" right={2} top={3}>
                  <Icon as={InfoIcon} />
                </Box>
              </Tooltip>
            )}
          </Text>
        )}
        {children}
      </Box>
    </DarkMode>
  ),
);
