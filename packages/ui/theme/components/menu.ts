import { menuAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  list: {
    bg: 'bg-surface',
    color: 'subtle',
  },
  item: {},
});

export default defineMultiStyleConfig({
  baseStyle,
});
