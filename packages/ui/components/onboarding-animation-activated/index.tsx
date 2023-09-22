import React, { useEffect } from 'react';
import { atom, useAtom } from 'jotai';
import { Lottie } from '@gated/ui/components';

const animationDataAtom = atom<any>(null);

export const OnboardingAnimationActivated = ({
  play = false,
  onComplete,
  style = {},
}: {
  play: boolean;
  onComplete?: () => void;
  style?: React.CSSProperties;
}) => {
  const [animationData, setAnimationData] = useAtom(animationDataAtom);

  useEffect(() => {
    import('./lottie-envelope-confetti.json').then(setAnimationData);
  }, []);

  return (
    animationData && (
      <Lottie
        animationData={animationData}
        play={play}
        speed={0.75}
        loop={false}
        onComplete={onComplete}
        style={{
          width: '100%',
          maxWidth: '400px',
          height: 'auto',
          marginTop: '-100px',
          marginBottom: '1rem',
          ...style,
        }}
      />
    )
  );
};
