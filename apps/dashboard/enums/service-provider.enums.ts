import { theme } from '@gated/ui';
import { StatusEnum } from '@gated/graphql-types';

const StartedAccountColor = theme.colors.blue['500'];
const InvalidAccountColor = theme.colors.red['500'];
const InitializingAccountColor = theme.colors.orange['500'];

const ConnectionStatusColors: Record<StatusEnum, string> = {
  [StatusEnum.Running]: StartedAccountColor,
  [StatusEnum.Invalid]: InvalidAccountColor,
  [StatusEnum.Initializing]: InitializingAccountColor,
  [StatusEnum.Provisioned]: StartedAccountColor,
};

export { StartedAccountColor };
export { InvalidAccountColor };
export { InitializingAccountColor };
export { ConnectionStatusColors };
