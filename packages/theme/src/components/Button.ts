import { ComponentStyleConfig } from '@chakra-ui/theme';

export const Button: ComponentStyleConfig = {
  // Styles for the base style
  baseStyle: {
    borderRadius: '50px',
    fontFamily: 'body',
    fontWeight: 'semibold',
    fontSize: '22px',
    boxShadow:
      '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  // Styles for the size variations
  sizes: {
    xl: () => ({
      px: '80px',
      py: '32px',
      minWidth: '497px',
      fontSize: '28px',
    }),
    lg: () => ({
      px: '65px',
      py: '20px',
    }),
    md: () => ({
      px: '50px',
      py: '16px',
    }),
  },
  // Styles for the visual style variations
  variants: {
    primary: {
      backgroundColor: 'primary.70',
      color: 'primary.0',
      _hover: {
        backgroundColor: 'primary.80',
      },
      _active: {
        backgroundColor: 'primary.60',
      },
    },
    secondary: {
      backgroundColor: 'secondary.50',
      color: 'secondary.100',
      _hover: {
        backgroundColor: 'secondary.60',
      },
      _active: {
        backgroundColor: 'secondary.40',
      },
    },
    neutral: {
      backgroundColor: 'neutral.100',
      color: 'neutral.0',
      _hover: {
        backgroundColor: 'neutral.95',
      },
      _active: {
        backgroundColor: 'neutral.90',
      },
    },
  },
  // The default `size` or `variant` values
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
};
