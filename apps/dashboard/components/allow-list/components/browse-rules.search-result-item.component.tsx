import React, { useState } from 'react';
import { useDashboard } from '@hooks/use-dashboard.hook';
import { RuleTag } from '@components/rule-tag';
import {
  Avatar,
  Flex,
  Skeleton,
  SkeletonCircle,
  Spacer,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RelativeTime, SenderAvatar } from '@gated/ui/components';
import { RuleEnum, Training } from '@gated/graphql-types';

interface SearchResultItemProps {
  result: Training;
  isLoaded?: boolean;
  onClick?: () => any;
}
export const SearchResultItem = ({
  result,
  isLoaded = true,
  onClick,
}: SearchResultItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const windowSize = useBreakpointValue({
    base: 'mobile',
    md: 'desktop',
  });
  const { onEditRule } = useDashboard();
  return (
    <Flex
      w="full"
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      _hover={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <SkeletonCircle isLoaded={isLoaded} mr={1}>
        {result?.username ? (
          <Avatar name={result.username} boxSize="30px" />
        ) : (
          <SenderAvatar sender={result.domain} />
        )}
      </SkeletonCircle>
      <Skeleton isLoaded={isLoaded} mr={3} h={5}>
        <Text
          textDecoration={isHovering ? 'underline' : ''}
          fontWeight="semibold"
        >
          {result.username && `${result.username}@`}
          {result.domain}
        </Text>
      </Skeleton>
      <Spacer />
      <Skeleton isLoaded={isLoaded} h={3}>
        {windowSize === 'desktop' && (
          <Text textStyle="footnote" mr={3}>
            created <RelativeTime timestamp={result?.createdAt} />
          </Text>
        )}
      </Skeleton>

      <Skeleton isLoaded={isLoaded}>
        <RuleTag
          rule={result?.rule as RuleEnum}
          onClick={(e) => {
            e.stopPropagation();

            onEditRule({
              ruleId: result.id,
              currentRule: result.rule,
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
