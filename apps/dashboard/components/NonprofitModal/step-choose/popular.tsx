import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useNonprofit } from '@components/NonprofitModal/context';
import { useNonprofitsQuery } from '@gated/graphql-types';
import React from 'react';
import { CurrentTag } from '@components/NonprofitModal/step-choose/current-tag';
import {
  IoChevronDown as ExpandIcon,
  IoChevronUp as CollapseIcon,
} from 'react-icons/io5';

export const Popular = () => {
  const { selected, currentId, setSelected } = useNonprofit();
  const { data, loading } = useNonprofitsQuery({
    variables: { input: { isFeatured: true } },
  });

  return (
    <RadioGroup
      value={selected?.id}
      as={VStack}
      spacing={6}
      alignItems="start"
      w="full"
    >
      <Text
        textStyle="caption"
        w="full"
        textAlign="center"
        scrollSnapAlign="start"
      >
        Select a popular nonprofit below or choose a category above.
      </Text>
      {data?.nonprofits.nonprofits.map((nonprofit) => {
        return (
          <PopularItem
            id={nonprofit.id}
            onClick={() => setSelected(nonprofit)}
            key={nonprofit.id}
            name={nonprofit.name}
            image={nonprofit.art}
            description={nonprofit.description}
            isSelected={selected.id === nonprofit.id}
            isCurrent={currentId === nonprofit.id}
          />
        );
      })}
    </RadioGroup>
  );
};

interface PopularItemProps extends BoxProps {
  id: string;
  name: string;
  image: string;
  description?: string;
  isCurrent?: boolean;
  isSelected?: boolean;
}
const PopularItem = ({
  id,
  name,
  description,
  image,
  isSelected,
  isCurrent,
  ...rest
}: PopularItemProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      cursor="pointer"
      w="full"
      borderRadius="md"
      shadow={isSelected && 'outline'}
      shadowColor="red"
      h={{ base: '200px', sm: '240px', md: '260px' }}
      {...rest}
      position="relative"
      overflow="hidden"
      transition="transform .2s ease-out"
      transform={isSelected && 'scale(1.01)'}
      scrollSnapAlign="center"
    >
      <Box
        backgroundImage={image}
        backgroundSize="cover"
        backgroundPosition="center"
        position="absolute"
        w="100%"
        h="100%"
        transition="transform .2s ease-out"
        transform={isSelected && 'scale(1.1)'}
      />
      {isCurrent && (
        <CurrentTag position="absolute" top={2} right={2} shadow="md" />
      )}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        color="white"
        px={3}
        py={4}
        bg="blackAlpha.800"
        backdropFilter="blur(8px) grayscale(.5)"
        textShadow="0 0 3px black"
        maxH="100%"
        overflow="scroll"
        borderRadius="md"
      >
        <Flex w="full">
          <Radio value={id} colorScheme="blue" pr="2" />
          <Heading size="sm">{name}</Heading>
          <Spacer />
          <Button
            rightIcon={isOpen ? <ExpandIcon /> : <CollapseIcon />}
            variant="tertiary"
            color="white"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            Info
          </Button>
        </Flex>
        <Collapse in={isOpen}>
          <Box pt={2} pr={2} pl={6} overflow="scroll">
            {description}
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
};
