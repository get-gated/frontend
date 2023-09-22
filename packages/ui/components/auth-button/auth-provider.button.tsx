import { Box, Button, ButtonProps, Circle, Icon } from '@chakra-ui/react';

import { GoogleIcon } from '../google-icon';
import {
  IoLogoLinkedin as LinkedinIcon,
  //  IoLogoGoogle as GoogleIcon,
} from 'react-icons/io5';

import { AuthProviderType } from '@gated/app';
import { useMemo } from 'react';

export interface AuthProviderButtonProps {
  onClick?: () => void;
  buttonTitle: string;
  buttonProps?: Omit<ButtonProps, 'onClick'>;
  authProvider: AuthProviderType;
  showIcon?: boolean;
}

export const AuthProviderButton = ({
  authProvider,
  onClick,
  buttonTitle,
  buttonProps = {},
  showIcon = true,
}: AuthProviderButtonProps) => {
  const { size = 'md', ...rest } = buttonProps;

  const icon = useMemo<JSX.Element>(() => {
    if (!showIcon) return null;

    switch (authProvider) {
      case AuthProviderType.Google:
        return (
          <Circle bg="white" p={2} ml={-3} mr="2">
            <Icon as={GoogleIcon} bg="white" />
          </Circle>
        );

      case AuthProviderType.LinkedIn:
        return <LinkedinIcon />;
    }
  }, [authProvider, showIcon]);

  return (
    <Button
      variant="primary"
      onClick={onClick}
      size={size}
      overflow="hidden"
      leftIcon={icon}
      {...rest}
    >
      {buttonTitle}
    </Button>
  );
};
