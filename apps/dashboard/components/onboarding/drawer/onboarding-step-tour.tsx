import { Button, useDisclosure } from '@chakra-ui/react';
import { OnboardingStepProps } from '@components/onboarding/drawer/onboarding-step.interface';
import { OnboardingStepCard } from '@components/onboarding/drawer/onboarding-step-card';
import {
  useMarkOnboardingTaskCompleteMutation,
  UserTaskEnum,
  UserTaskResolutionEnum,
} from '@gated/graphql-types';
import { InboxTipsModal } from '@components/onboarding/InboxTipsModal/InboxTipsModal';

export const OnboardingStepTour = ({
  isActive,
  isCompleted,
  isCurrent,
  onComplete,
  onJumpTo,
}: OnboardingStepProps) => {
  const title = isCompleted ? 'Your inbox is ready!' : 'Meet your Gated inbox';
  const disclosure = useDisclosure();

  const [markComplete, { loading }] = useMarkOnboardingTaskCompleteMutation();

  const complete = async (resolution?: UserTaskResolutionEnum) => {
    if (resolution) {
      await markComplete({
        variables: { input: { task: UserTaskEnum.TakeTour, resolution } },
      });
    }
    onComplete();
  };

  return (
    <OnboardingStepCard
      isCurrent={isCurrent}
      isActive={isActive}
      isCompleted={isCompleted}
      onJumpTo={onJumpTo}
      stepNumber="4"
      title={title}
      description="Quickly learn how to use Gated right from your inbox"
      estimatedDuration="~30 sec"
      primaryCta={
        <Button
          variant="primary"
          isLoading={loading}
          onClick={disclosure.onOpen}
        >
          Start
        </Button>
      }
      secondaryCta={
        <Button
          variant="secondary"
          isLoading={loading}
          onClick={() =>
            complete(isCompleted ? null : UserTaskResolutionEnum.Dismissed)
          }
        >
          Not Now
        </Button>
      }
    >
      <InboxTipsModal
        onComplete={() => complete(UserTaskResolutionEnum.Completed)}
        {...disclosure}
      />
    </OnboardingStepCard>
  );
};
