import { Button, useDisclosure } from '@chakra-ui/react';
import { OnboardingStepProps } from '@components/onboarding/drawer/onboarding-step.interface';
import { OnboardingStepCard } from '@components/onboarding/drawer/onboarding-step-card';
import { NonprofitModal } from '@components/NonprofitModal';
import {
  useMarkOnboardingTaskCompleteMutation,
  UserTaskEnum,
  UserTaskResolutionEnum,
} from '@gated/graphql-types';
import { useMe } from '@gated/app';

export const OnboardingStepNonProfit = ({
  isActive,
  isCompleted,
  isCurrent,
  onComplete,
  onJumpTo,
}: OnboardingStepProps) => {
  const { user } = useMe();

  const title = isCompleted
    ? 'Your nonprofit is selected!'
    : 'Personalize your nonprofit';
  const defaultNonProfit = user.nonprofit.name;
  const description = (
    <>
      We have started you off with <strong>{defaultNonProfit}</strong>. You can
      choose a different nonprofit now - or at any time
    </>
  );

  const { onOpen, onClose, isOpen } = useDisclosure();
  const [markComplete, { loading }] = useMarkOnboardingTaskCompleteMutation();

  const complete = async (resolution?: UserTaskResolutionEnum) => {
    if (resolution) {
      await markComplete({
        variables: {
          input: { task: UserTaskEnum.ChooseNonprofit, resolution },
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
        stepNumber="2"
        title={title}
        description={description}
        estimatedDuration="~1 min"
        primaryCta={
          <Button variant="primary" onClick={onOpen} isLoading={loading}>
            Choose Nonprofit
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
            Keep Existing
          </Button>
        }
      />
      <NonprofitModal
        isOpen={isOpen}
        onClose={onClose}
        onChange={() => complete(UserTaskResolutionEnum.Completed)}
      />
    </>
  );
};
