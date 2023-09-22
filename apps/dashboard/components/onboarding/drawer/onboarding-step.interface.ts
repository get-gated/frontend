export interface OnboardingStepProps {
  isActive?: boolean;
  isCurrent: boolean;
  isCompleted?: boolean;
  onComplete: () => void;
  onJumpTo: () => void;
}
