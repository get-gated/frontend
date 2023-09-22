import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  dialog: {
    bg: 'bg-subtle',
  },
  header: {
    fontSize: '2xl',
    color: 'subtle',
  },
  body: {
    bg: 'bg-surface',
    py: 5,
  },
});

const sizes = {
  'mobile-full': definePartsStyle({
    dialogContainer: {
      '@supports(height: -webkit-fill-available)': {},
      height: '100%',
    },
    dialog: {
      borderRadius: '',
      height: '100% !important',
      marginY: '0 !important',
      maxHeight: '100% !important',
    },
  }),
};

export default defineMultiStyleConfig({
  baseStyle,
  sizes,
});
