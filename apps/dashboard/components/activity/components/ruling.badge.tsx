import { Badge, Tooltip } from '@chakra-ui/react';
import { RuleEnum } from '@gated/graphql-types';

interface IRulingBadge {
  tooltip: string;
  rule: RuleEnum;
}

export const RulingBadge = ({ tooltip, rule }: IRulingBadge) => {
  let statusColor;
  switch (rule) {
    case RuleEnum.Allow:
      statusColor = 'green';
      break;
    case RuleEnum.Mute:
      statusColor = 'yellow';
      break;
    case RuleEnum.Gate:
      statusColor = 'red';
      break;
    case RuleEnum.Ignore:
      statusColor = 'gray';
      break;
  }

  return (
    <Tooltip hasArrow label={tooltip}>
      <Badge colorScheme={statusColor}>{rule}</Badge>
    </Tooltip>
  );
};
