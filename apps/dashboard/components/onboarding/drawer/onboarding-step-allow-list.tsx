import { Button, Progress, useDisclosure } from '@chakra-ui/react';
import { OnboardingStepProps } from '@components/onboarding/drawer/onboarding-step.interface';
import { OnboardingStepCard } from '@components/onboarding/drawer/onboarding-step-card';
import { AllowListModal } from '@components/onboarding/allow-list/allow-list.modal';
import {
  StatusEnum,
  useConnectionsStatusQuery,
  useMarkOnboardingTaskCompleteMutation,
  UserTaskEnum,
  UserTaskResolutionEnum,
} from '@gated/graphql-types';
import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';

gql`
  query ConnectionsStatus {
    me {
      connections {
        id
        status
      }
    }
  }
`;
export const OnboardingStepAllowList = ({
  isActive,
  isCompleted,
  isCurrent,
  onJumpTo,
  onComplete,
}: OnboardingStepProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [initializing, setInitializing] = useState(true);

  const { startPolling, stopPolling, data } = useConnectionsStatusQuery({
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    startPolling(1000);
  }, []);

  useEffect(() => {
    if (data?.me.connections[0]?.status === StatusEnum.Running) {
      stopPolling();
      setInitializing(false);
    }
  }, [data]);

  const title = isCompleted
    ? 'Your Allow List is reviewed!'
    : 'Review your Allow List';
  const description =
    'Your Allow List is the list of people and domains who can reach you directly.';
  const initializingDescription = (
    <>
      <Progress size="xs" isIndeterminate my={4} colorScheme="gray" />
      Scanning your inbox and building your Allow List. This will take just a
      moment...
    </>
  );
  const [markComplete, { loading }] = useMarkOnboardingTaskCompleteMutation();

  const complete = async (resolution?: UserTaskResolutionEnum) => {
    if (resolution) {
      await markComplete({
        variables: {
          input: { task: UserTaskEnum.ReviewAllowList, resolution },
        },
      });
    }
    onComplete();
  };

  return (
    <>
      <OnboardingStepCard
        isCurrent={isCurrent}
        isActive={isActive}
        isCompleted={isCompleted}
        onJumpTo={onJumpTo}
        stepNumber="3"
        title={title}
        description={initializing ? initializingDescription : description}
        estimatedDuration="~30 sec"
        primaryCta={
          <Button
            variant="primary"
            disabled={initializing}
            onClick={onOpen}
            isLoading={loading}
          >
            Review My Allow List
          </Button>
        }
        secondaryCta={
          <Button
            isLoading={loading}
            variant="secondary"
            onClick={() =>
              complete(isCompleted ? null : UserTaskResolutionEnum.Dismissed)
            }
          >
            Skip
          </Button>
        }
      />
      <AllowListModal
        isOpen={isOpen}
        onClose={onClose}
        onComplete={() => complete(UserTaskResolutionEnum.Completed)}
      />
    </>
  );
};
