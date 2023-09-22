import {
  Box,
  Button,
  Divider,
  Flex,
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
  IoCheckmarkOutline as CheckIcon,
  IoDocumentOutline as MemoIcon,
} from 'react-icons/io5';
import { formatCurrencyUtil } from '@gated/utils';
import { RelativeTime } from '@gated/ui/components';

import { CreateSendRequest } from '@components/requests/create-send-request';
import { Request } from '@components/requests/request';
import { useState } from 'react';

export default function SentRequests() {
  const reqDisclosure = useDisclosure();
  const [selectedReq, setSelectedReq] = useState<string>();

  const { data } = useDonationRequestsQuery({
    variables: {
      input: {
        type: DonationRequestTypeEnum.SingleUse,
      },
    },
  });

  return (
    <VStack>
      <CreateSendRequest {...reqDisclosure} />
      <Request
        isOpen={!!selectedReq}
        id={selectedReq}
        onClose={() => setSelectedReq('')}
      />
      <Button onClick={reqDisclosure.onOpen}>Send New Request</Button>
      <Box bg="bg-surface" p={4} borderRadius="md" w="400px">
        {data?.donationRequests.edges.map(({ node: item }) => (
          <Box
            key={item.id}
            onClick={() => {
              setSelectedReq(item.id);
            }}
          >
            <Flex>
              <Tooltip label={item.memo}>
                <Box pr={2}>
                  <Icon as={MemoIcon} color="muted" />
                </Box>
              </Tooltip>
              <Text fontWeight="bold">
                {formatCurrencyUtil(item.amountInCents)}
              </Text>
              <Spacer />
              <Text textStyle="caption">
                requested <RelativeTime timestamp={item.createdAt} />
              </Text>

              {!item.isActive && (
                <Box pl={2}>
                  <Icon color="success" as={CheckIcon} />
                </Box>
              )}
            </Flex>
            <Divider />
          </Box>
        ))}
      </Box>
    </VStack>
  );
}
