import { Button, useDisclosure } from '@chakra-ui/react';
import { OnboardingStepProps } from './onboarding-step.interface';
import { OnboardingStepCard } from './onboarding-step-card';
import { gql } from '@apollo/client';
import {
  useMarkOnboardingTaskCompleteMutation,
  useOnboardingConnectInboxQuery,
  UserTaskEnum,
  UserTaskResolutionEnum,
} from '@gated/graphql-types';
import { AuthProviderType, AuthType } from '@gated/app';
import { ConnectAbortModal } from '@components/ConnectAbortModal';
import { useRef } from 'react';
import { AuthButton, AuthButtonProps } from '@gated/ui/components/auth-button';

gql`
  query OnboardingConnectInbox {
    me {
      notificationSettings {
        email
      }
    }
  }
`;

export const OnboardingStepConnectInbox = ({
  isActive,
  isCompleted,
  isCurrent,
  onComplete,
  onJumpTo,
}: OnboardingStepProps) => {
  const title = isCompleted
    ? 'Your inbox is connected!'
    : 'Connect to your inbox';

  const { loading, data } = useOnboardingConnectInboxQuery({
    fetchPolicy: 'cache-first',
  });
  const [markTaskComplete] = useMarkOnboardingTaskCompleteMutation();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const tryAgainLoginHint = useRef('');

  const onAuthSuccess = async () => {
    onClose();
    //todo: add optimistic response
    await markTaskComplete({
      variables: {
        input: {
          task: UserTaskEnum.ConnectFirstAccount,
          resolution: UserTaskResolutionEnum.Completed,
        },
      },
    });
    onComplete();
  };

  const suggestedEmail = data?.me.notificationSettings.email || '';

  const authButtonProps: Omit<AuthButtonProps, 'buttonTitle'> = {
    authProvider: AuthProviderType.Google,
    authType: AuthType.Link,
    redirectPath: '/loading',
    onSuccess: onAuthSuccess,
    onCancel: () => {
      onOpen();
    },
  };

  const primaryCta = isCompleted ? (
    <AuthButton
      buttonTitle="Connect Another Inbox"
      buttonProps={{
        variant: 'primary',
        isLoading: loading,
      }}
      onOpen={() => (tryAgainLoginHint.current = '')}
      {...authButtonProps}
    />
  ) : (
    <AuthButton
      buttonProps={{
        variant: 'primary',
        isLoading: loading,
        textOverflow: 'ellipsis',
        noOfLines: 1,
      }}
      onOpen={() => (tryAgainLoginHint.current = suggestedEmail)}
      showIcon={false}
      buttonTitle={`Connect to ${suggestedEmail}`}
      loginHint={suggestedEmail}
      {...authButtonProps}
    />
  );

  const secondaryCta = isCompleted ? (
    <Button
      variant="secondary"
      isLoading={loading}
      colorScheme="blue"
      onClick={onComplete}
    >
      Not Now
    </Button>
  ) : (
    <AuthButton
      buttonTitle="Connect to a different inbox"
      onOpen={() => (tryAgainLoginHint.current = '')}
      showIcon={false}
      buttonProps={{
        variant: 'secondary',
        isLoading: loading,
        colorScheme: 'blue',
      }}
      {...authButtonProps}
    />
  );

  return (
    <OnboardingStepCard
      stepNumber="1"
      isCurrent={isCurrent}
      isActive={isActive}
      isCompleted={isCompleted}
      onJumpTo={onJumpTo}
      title={title}
      description="Gated needs to be connected to your inbox so we can start protecting your attention"
      estimatedDuration="~30 sec"
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
    >
      <ConnectAbortModal
        isOpen={isOpen}
        onClose={onClose}
        loginHint={tryAgainLoginHint.current}
      />
    </OnboardingStepCard>
  );
};
