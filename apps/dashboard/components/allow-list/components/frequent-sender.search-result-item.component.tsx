import React, { useState } from 'react';
import { useDashboard } from '@hooks/use-dashboard.hook';
import {
  Box,
  Flex,
  Icon,
  Skeleton,
  SkeletonCircle,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { MdEmail as ReceivedIcon } from 'react-icons/md';
import { SentReceivedStat } from '@gated/graphql-types';
import { SenderAvatar } from '@gated/ui/components';
import { formatSenderFromPartsUtil } from '@gated/utils';
import { RuleTag } from '@components/rule-tag';

interface SearchResultItemProps {
  result: SentReceivedStat;
  isLoaded?: boolean;
  onClick?: () => any;
}
export const FrequentSenderSearchResultItem = ({
  result,
  isLoaded = true,
  onClick,
}: SearchResultItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { onEditRule } = useDashboard();
  return (
    <Flex
      w="full"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      _hover={{ cursor: 'pointer' }}
      alignItems="center"
      onClick={onClick}
    >
      <SkeletonCircle isLoaded={isLoaded} mr={1}>
        <SenderAvatar
          sender={formatSenderFromPartsUtil(
            result?.username as string,
            result?.domain,
          )}
        />
      </SkeletonCircle>
      <Skeleton isLoaded={isLoaded} h={5}>
        <Text textDecoration={isHovering ? 'underline' : ''} noOfLines={1}>
          {result?.username && `${result?.username}@`}
          {result?.domain}
        </Text>
      </Skeleton>
      <Spacer />
      <Skeleton isLoaded={isLoaded} h={3} mr={3}>
        {result?.receivedCount && (
          <Box mr={3}>
            <Text fontSize="xs" color="gray">
              <Icon mr={1} as={ReceivedIcon} />
              {result.receivedCount}
            </Text>
          </Box>
        )}
      </Skeleton>

      <Skeleton isLoaded={isLoaded}>
        <RuleTag
          rule={result?.training?.rule || undefined}
          inheritedRule={result?.training?.inheritedRule || undefined}
          onClick={(e) => {
            e.stopPropagation();
            onEditRule({
              ruleId: result.id,
              currentRule: result.training?.rule,
              isDomainOnly: !result.username,
              domain: result.domain,
              username: result.username,
            });
          }}
        />
      </Skeleton>
    </Flex>
  );
};
