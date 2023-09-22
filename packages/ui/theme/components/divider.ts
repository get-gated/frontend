import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools';

export default {
  baseStyle: {
    opacity: 1,
    borderStyle: 'solid',
    borderRadius: 1,
    my: 4,
  },
  variants: {
    subtle: (props: StyleFunctionProps) => ({
      borderColor: mode('mustardShade.300', 'mustardNeutral.700')(props),
    }),
    brand: () => ({
      borderColor: 'brand.500',
    }),
  },
  sizes: {
    sm: {
      maxWidth: '20%',
    },
  },
};
