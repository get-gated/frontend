import { ComponentStyleConfig } from '@chakra-ui/theme';

export const textVariants = [
  'text-display-large',
  'text-display-medium',
  'text-display-small',
  'text-headline-large',
  'text-headline-medium',
  'text-headline-small',
  'text-body-regular',
  'text-body-medium',
  'text-body-bold',
  // 'text-label-regular',
  // 'text-label-medium',
  // 'text-label-bold',
] as const;

const variants = textVariants.reduce(
  (acc, v) => ({
    [v]: {
      textStyle: v,
    },
    ...acc,
  }),
  {},
);

export const Text: ComponentStyleConfig = {
  variants,
  defaultProps: {
    variant: 'text-body-regular',
  },
};
