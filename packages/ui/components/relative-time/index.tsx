import React from 'react';
import sago from 's-ago';
import { Tooltip } from '@chakra-ui/react';
interface IRelativeTime {
  timestamp: string | Date;
}
export const RelativeTime = ({ timestamp }: IRelativeTime) => {
  const date = new Date(timestamp);
  const relative = sago(date);
  const full = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return <Tooltip label={full}>{relative}</Tooltip>;
};
