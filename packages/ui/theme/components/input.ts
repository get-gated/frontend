import {
  mode,
  StyleFunctionProps,
  transparentize,
} from '@chakra-ui/theme-tools';

const variants = {
  outline: (props: StyleFunctionProps) => ({
    field: {
      borderRadius: 'lg',
      bg: mode('white', 'gray.800')(props),
      _hover: { borderColor: mode('gray.300', 'gray.600')(props) },
      _focus: {
        borderColor: mode('secondary.500', 'secondary.200')(props),
        boxShadow: mode(
          `0px 0px 0px 1px ${transparentize(
            `secondary.500`,
            1.0,
          )(props.theme)}`,
          `0px 0px 0px 1px ${transparentize(
            `secondary.200`,
            1.0,
          )(props.theme)}`,
        )(props),
      },
    },
    addon: {
      borderRadius: 'lg',
      bg: mode('gray.50', 'gray.700')(props),
    },
  }),
  'outline-on-accent': (props: StyleFunctionProps) => ({
    field: {
      bg: 'white',
      borderRadius: 'lg',
      color: 'gray.900',
      borderWidth: '1px',
      borderColor: 'secondary.50',
      _placeholder: {
        color: 'gray.500',
      },
      _hover: {
        borderColor: 'secondary.100',
      },
      _focus: {
        borderColor: 'secondary.200',
        boxShadow: `0px 0px 0px 1px ${transparentize(
          `secondary.200`,
          1.0,
        )(props.theme)}`,
      },
    },
  }),
  filled: (props: StyleFunctionProps) => {
    if (props.colorScheme === 'gray') {
      return {
        field: {
          bg: mode('white', 'gray.800')(props),
          _hover: {
            borderColor: mode('gray.200', 'gray.700')(props),
            bg: mode('white', 'gray.700')(props),
          },
          _focus: {
            borderColor: 'accent',
            bg: mode('white', 'gray.800')(props),
          },
        },
      };
    }
    return {
      field: {
        bg: 'bg-accent-subtle',
        color: 'on-accent',
        _placeholder: {
          color: 'on-accent',
        },
        _hover: {
          borderColor: 'secondary.400',
          bg: 'bg-accent-subtle',
        },
        _focus: {
          bg: 'bg-accent-subtle',
          borderColor: 'secondary.300',
        },
      },
    };
  },
};

const sizes = {
  lg: {
    field: {
      fontSize: 'md',
      borderRadius: 'lg',
    },
  },
};

export default {
  variants,
  sizes,
  defaultProps: {
    colorScheme: 'gray',
  },
};
