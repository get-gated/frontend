import { StatusEnum } from '@gated/graphql-types';

export const isUnlinkedStatus = (status: StatusEnum) => {
  return status === StatusEnum.Invalid;
};
