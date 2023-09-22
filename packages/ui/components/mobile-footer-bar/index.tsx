import React, { memo } from 'react';

/* Assets */
import { Box, useBreakpointValue } from '@chakra-ui/react';

interface IMobileFooterBar {
  children: React.ReactNode;
}

export const MobileFooterBar = memo<IMobileFooterBar>(({ children }) => {
  const viewport = useBreakpointValue({ base: 'mobile', md: 'desktop' });

  return (
    <Box
      textAlign={viewport === 'desktop' ? 'initial' : 'center'}
      position={viewport === 'desktop' ? 'initial' : 'absolute'}
      left={viewport === 'desktop' ? 'initial' : '0'}
      right={viewport === 'desktop' ? 'initial' : '0'}
      bottom={viewport === 'desktop' ? 'initial' : '1rem'}
      borderTop={viewport === 'desktop' ? 'none' : '1px solid'}
    >
      {children}
    </Box>
  );
});
