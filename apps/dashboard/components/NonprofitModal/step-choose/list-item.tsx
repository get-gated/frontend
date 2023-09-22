import {
  Box,
  Collapse,
  Flex,
  Heading,
  Radio,
  SkeletonText,
  Spacer,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import {
  IoStarOutline as FeaturedIcon,
  IoCheckmarkOutline as CurrentIcon,
} from 'react-icons/io5';
import React from 'react';
import { CurrentTag } from '@components/NonprofitModal/step-choose/current-tag';
interface ListItemProps {
  isSelected?: boolean;
  isCurrent?: boolean;
  name: string;
  description: string;
  isFeatured?: boolean;
  id: string;
  loading?: boolean;
  onClick?: () => void;
}

export const ListItem = ({
  isSelected = false,
  isCurrent = false,
  name,
  description,
  id,
  isFeatured = false,
  loading = false,
  onClick,
}: ListItemProps) => (
  <Box
    cursor="pointer"
    borderBottomWidth={1}
    px={2}
    py={3}
    onClick={onClick}
    w="full"
  >
    <Flex alignItems={'center'}>
      <Radio value={id} disabled={loading} pr={2} />
      <SkeletonText isLoaded={!loading} noOfLines={1}>
        <Heading size="xs" color={isSelected ? 'accent' : ''}>
          {name}
        </Heading>
      </SkeletonText>
      <Spacer />
      <Stack direction={{ base: 'column', md: 'row' }}>
        {isCurrent && <CurrentTag />}
        {isFeatured && (
          <Tag colorScheme="promote" ml={2}>
            <TagLeftIcon as={FeaturedIcon} />
            <TagLabel>Popular</TagLabel>
          </Tag>
        )}
      </Stack>
    </Flex>
    {!loading && (
      <Collapse animateOpacity in={isSelected}>
        <Text key={id} mt={2} ml={6}>
          {description}
        </Text>
      </Collapse>
    )}
  </Box>
);
