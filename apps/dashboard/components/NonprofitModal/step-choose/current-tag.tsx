import { Tag, TagLabel, TagLeftIcon, TagProps } from '@chakra-ui/react';
import { IoCheckmarkOutline as CurrentIcon } from 'react-icons/io5';
import React from 'react';

export const CurrentTag = (props: TagProps) => (
  <Tag colorScheme="active" {...props}>
    <TagLeftIcon as={CurrentIcon} />
    <TagLabel>Current</TagLabel>
  </Tag>
);
