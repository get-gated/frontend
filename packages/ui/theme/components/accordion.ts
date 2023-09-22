import { accordionAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  button: {
    paddingLeft: 0,
    paddingRight: 14,
    position: 'relative',
    _hover: { background: 'none' },
    textAlign: 'left',
  },
  icon: {
    position: 'absolute',
    right: 0,
  },
  container: {
    padding: 0,
    border: 'none',
  },
  panel: {},
});

export default defineMultiStyleConfig({
  baseStyle,
});
