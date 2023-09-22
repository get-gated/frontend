import { ButtonProps, IconProps } from '@chakra-ui/react';
import { AuthProviderType, AuthType } from '@gated/app';
import { App, useAppLink } from '@gated/app/hooks';
import { AuthButton } from '../auth-button';

type SignupButtonProps = {
  state?: string;
  nonprofitId?: string;
  buttonProps?: ButtonProps;
  iconProps?: IconProps;
};

export function SignupButton({
  buttonProps = {},
  state,
  nonprofitId,
}: SignupButtonProps) {
  const appLink = useAppLink();

  return (
    <AuthButton
      authType={AuthType.SignUp}
      buttonTitle="Sign up with Google"
      authProvider={AuthProviderType.Google}
      redirectPath="/loading"
      buttonProps={{ shadow: 'md', variant: 'primary', ...buttonProps }}
      clientState={state}
      nonprofitId={nonprofitId}
      onSuccess={async () => {
        window.location.href = appLink(App.Dashboard, '/app');
      }}
    />
  );
}
