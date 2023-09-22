import {
  Box,
  BoxProps,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Spacer,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import {
  DonationRequestTypeEnum,
  useDonationRequestsQuery,
} from '@gated/graphql-types';

import {
  IoAddOutline as AddIcon,
  IoStarOutline as FeaturedIcon,
} from 'react-icons/io5';

import { CreatePageRequest } from '@components/requests/create-page-request';
import { Request } from '@components/requests/request';
import { useState } from 'react';
import { formatCurrencyUtil } from '@gated/utils';

export default function PageRequests() {
  const createDisclosure = useDisclosure();
  const [selectedReq, setSelectedReq] = useState<string>();

  const { data } = useDonationRequestsQuery({
    variables: {
      input: {
        type: DonationRequestTypeEnum.LongLiving,
      },
    },
  });

  const boxProps: Partial<BoxProps> = {
    cursor: 'pointer',
    bg: 'bg-surface',
    p: 5,
    minW: 200,
    borderRadius: 'md',
    mr: 5,
    textAlign: 'center',
    flexDir: 'column',
    pos: 'relative',
    overflow: 'hidden',
  };

  return (
    <VStack>
      <CreatePageRequest {...createDisclosure} />
      <Request
        isOpen={!!selectedReq}
        id={selectedReq}
        onClose={() => setSelectedReq('')}
      />

      <Flex>
        {data?.donationRequests.edges.map(({ node: item }) => (
          <Box
            key={item.id}
            onClick={() => {
              setSelectedReq(item.id);
            }}
            {...boxProps}
          >
            {item.isFeatured && (
              <Center
                pos="absolute"
                left={0}
                top="0"
                bg="bg-active"
                w="30px"
                h="30px"
                borderBottomRightRadius="lg"
              >
                <Icon as={FeaturedIcon} boxSize={4} color="active" />
              </Center>
            )}
            <Text>{item.name}</Text>
            <Divider my={2} />
            <Heading size="sm">
              {formatCurrencyUtil(item.amountInCents)}
            </Heading>
          </Box>
        ))}
        <Center {...boxProps} onClick={createDisclosure.onOpen}>
          <Box>
            <Icon as={AddIcon} boxSize={8} />
          </Box>
          <Text w="full">New page</Text>
        </Center>
      </Flex>
    </VStack>
  );
}
