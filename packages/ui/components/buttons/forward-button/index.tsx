import React, { memo, ReactElement } from 'react';
import { Button, Center, Icon } from '@chakra-ui/react';
import { FaChevronRight } from 'react-icons/fa';
import { ButtonOptions } from '@chakra-ui/button';

interface IForwardButton extends ButtonOptions {
  children: React.ReactNode;
  leftIcon?: ReactElement;
  size?: string;
  [x: string]: any;
}

const ForwardButton = memo<IForwardButton>(
  ({ children, leftIcon, size = 'lg', ...rest }) => {
    return (
      <Button
        bgColor="primary.500"
        size={size}
        borderRadius="full"
        color="white"
        iconSpacing={3}
        leftIcon={leftIcon}
        pl={leftIcon ? 3 : 6}
        pr={3}
        _active={{
          bgColor: 'primary.600',
        }}
        _hover={{
          '& > div.chevron': {
            color: 'white',
          },
        }}
        {...rest}
      >
        {children}
        <Center className="chevron" color="primary.200" ml={leftIcon ? 3 : 4}>
          <Icon
            as={FaChevronRight}
            boxSize={4}
            transition="color 135ms ease-in-out"
          />
        </Center>
      </Button>
    );
  },
);

export { ForwardButton };
