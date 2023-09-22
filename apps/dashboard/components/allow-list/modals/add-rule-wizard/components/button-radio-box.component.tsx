import { chakra } from '@chakra-ui/react';

export const ButtonRadioBox = chakra('div', {
  baseStyle: {
    borderWidth: '3px',
    px: '4',
    pt: '4',
    pb: '4',
    borderRadius: 'md',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _focus: { shadow: 'outline' },
  },
});
