import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { formatCurrencyUtil } from '@gated/utils';

interface CustomAmountModalProps extends UseDisclosureProps {
  customAmount: number;
  minimumAmountInCents: number;
  onSelect: (customAmountInCents: number) => void;
}

export function CustomAmountModal({
  customAmount,
  onClose,
  minimumAmountInCents,
  isOpen,
  onSelect,
}: CustomAmountModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const defaultCustomValue = customAmount
    ? customAmount / 100
    : (minimumAmountInCents * 5) / 100;

  const validateInput = () => {
    let errorMsg = '';
    const val = inputRef.current.value;
    if (val === '') {
      errorMsg = 'Enter a dollar amount.';
    } else if (isNaN(inputRef.current.valueAsNumber)) {
      errorMsg = 'Enter a valid number.';
    } else if (Number(val) * 100 < minimumAmountInCents) {
      errorMsg = `Enter an amount greater than ${formatCurrencyUtil(
        minimumAmountInCents,
      )}`;
    }
    if (errorMsg !== error) {
      setError(errorMsg);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={inputRef}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Custom Amount</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Choose a custom amount you wish to donate to make the biggest
            impact.
          </Text>
          <InputGroup as={InputGroup} size="lg" pt={6}>
            <InputLeftAddon>$</InputLeftAddon>
            <Input
              onChange={validateInput}
              ref={inputRef}
              type="number"
              inputMode="numeric"
              defaultValue={defaultCustomValue}
            />
          </InputGroup>

          <Text pt={2} color="error" minH={8}>
            {error}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="primary"
            isDisabled={!!error}
            onClick={() => onSelect(inputRef.current.valueAsNumber * 100)}
          >
            Select
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
