import React, { useRef } from 'react';
import {
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import { AllowListTile } from '../components/tile.component';

const emailRegex =
  // eslint-disable-next-line no-control-regex
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const isEmail = (value: string) => {
  return Boolean(value.match(emailRegex));
};

interface TestAddressTileProps {
  onTest: (address: string) => void;
}

export const TestAddressTile = ({ onTest }: TestAddressTileProps) => {
  const inputRef = useRef<HTMLInputElement>();

  const toast = useToast();

  const test = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    inputRef.current.focus();
    const value = inputRef.current.value;
    toast.closeAll();
    if (!value || !isEmail(value)) {
      return toast({
        title: 'Invalid email address.',
        description:
          'Please try again with a properly formatted email address.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
    onTest(value);
  };

  return (
    <AllowListTile
      heading="Test an Address"
      description="See how Gated will treat a message received from a sender."
    >
      <form onSubmit={test}>
        <InputGroup>
          <Input
            _focus={{
              boxShadow: 'none',
            }}
            ref={inputRef}
            placeholder="andrea@business.com"
          />
          <InputRightAddon>
            <Button variant="link" type="submit">
              Test
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
    </AllowListTile>
  );
};
