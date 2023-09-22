import { AuthProviderType } from '@gated/app';
import { ProviderEnum } from '@gated/graphql-types';

export const connectionProviderToAuthProviderUtil = (
  provider: ProviderEnum,
) => {
  switch (provider) {
    case ProviderEnum.Google:
      return AuthProviderType.Google;
  }
};
