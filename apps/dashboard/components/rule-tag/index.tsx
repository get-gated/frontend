import {
  Tag,
  TagLabel,
  TagLeftIcon,
  TagProps,
  TagRightIcon,
  Tooltip,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import {
  MdCopyAll as InheritIcon,
  MdModeEdit as EditIcon,
} from 'react-icons/md';
import { RuleEnum } from '@gated/graphql-types';

interface RuleTagProps extends TagProps {
  rule?: RuleEnum;
  inheritedRule?: RuleEnum;
  onClick?: (any) => any | void;
}
export const RuleTag = ({
  rule,
  inheritedRule,
  onClick,
  ...rest
}: RuleTagProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const effectiveRule = rule || inheritedRule;
  const isInheritedRule = !rule && Boolean(inheritedRule);

  let label = '',
    color,
    tooltip;
  switch (effectiveRule) {
    case RuleEnum.Mute:
      label = 'Gated & Unchallenged';
      color = 'muted';

      break;
    case RuleEnum.Allow:
      label = 'Allowed';
      color = 'allowed';
      break;
    case RuleEnum.Gate:
      label = 'Gated';
      color = 'gated';
      break;
    default:
      label = 'No Rule';
      color = 'untrained';
      tooltip = 'No rule set. Gated will determine best action.';
  }

  if (isInheritedRule) tooltip = 'Based on a domain or system rule.';

  const tag = (
    <Tag
      onMouseOver={() => setIsHovering(true)}
      onMouseOut={() => setIsHovering(false)}
      colorScheme={color}
      onClick={onClick}
      _hover={{
        cursor: onClick && 'pointer',
      }}
      opacity={isInheritedRule ? 0.5 : 1}
      {...rest}
    >
      {isHovering && onClick && <TagLeftIcon boxSize="15px" as={EditIcon} />}
      <TagLabel>{label}</TagLabel>
      {isInheritedRule && <TagRightIcon boxSize="12px" as={InheritIcon} />}
    </Tag>
  );

  if (tooltip) {
    return <Tooltip label={<em>{tooltip}</em>}>{tag}</Tooltip>;
  }

  return tag;
};
