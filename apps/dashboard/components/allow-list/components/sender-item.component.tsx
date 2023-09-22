import {
  Avatar,
  Box,
  Flex,
  HStack,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { emailPartsUtil } from '@gated/utils';
import { useDashboard } from '@hooks/use-dashboard.hook';
import { RuleEnum } from '@gated/graphql-types';
import { RuleTag } from '@components/rule-tag';

interface SenderItemProps {
  displayName?: string;
  emailAddress: string;
  rule?: RuleEnum;
  inheritedRule?: RuleEnum;
  isLoaded?: boolean;
  onClick?: () => any;
}
export const SenderItem = ({
  displayName,
  emailAddress,
  rule,
  inheritedRule,
  isLoaded = true,
  onClick,
}: SenderItemProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const { onEditRule } = useDashboard();
  const { username, domain } = emailPartsUtil(emailAddress);
  return (
    <Flex
      w="full"
      onMouseOver={() => onClick && setIsHovering(true)}
      onMouseOut={() => onClick && setIsHovering(false)}
      onClick={onClick}
      cursor={isHovering ? 'pointer' : ''}
    >
      <HStack>
        <Skeleton isLoaded={isLoaded}>
          <Avatar size="xs" name={displayName || emailAddress} />
        </Skeleton>
        <Box
          textDecoration={isHovering ? 'underline' : undefined}
          flexShrink="initial"
          maxWidth="300px"
        >
          <Skeleton isLoaded={isLoaded}>
            {displayName ? (
              <Text noOfLines={1}>
                <Text as="span">{displayName}</Text>
                <Text textStyle="footnote" as="span">
                  &lt;{emailAddress}&gt;
                </Text>
              </Text>
            ) : (
              <Text noOfLines={1}>{emailAddress}</Text>
            )}
          </Skeleton>
        </Box>
      </HStack>
      <Spacer />
      <Skeleton isLoaded={isLoaded}>
        <RuleTag
          rule={rule}
          inheritedRule={inheritedRule}
          onClick={(e) => {
            e.stopPropagation();
            onEditRule({ currentRule: rule, username, domain });
          }}
        />
      </Skeleton>
    </Flex>
  );
};
