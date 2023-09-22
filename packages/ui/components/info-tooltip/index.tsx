import { Box, Icon, Tooltip } from '@chakra-ui/react';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import React, { ReactNode, useRef } from 'react';

interface IInfoTooltip {
  message: string | ReactNode;
}
export const InfoTooltip = ({ message }: IInfoTooltip) => {
  const portalRef = useRef<HTMLDivElement>(null);
  return (
    <Tooltip
      label={message}
      portalProps={{ containerRef: portalRef }}
      placement="top"
      hasArrow
    >
      <Box ref={portalRef} as="span">
        <Icon
          as={IoIosInformationCircleOutline}
          ml={2}
          verticalAlign="middle"
        />
      </Box>
    </Tooltip>
  );
};
