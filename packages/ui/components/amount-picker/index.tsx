import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Flex,
  Icon,
  useDisclosure,
  useRadio,
  useRadioGroup,
  VStack,
  keyframes,
  useCheckbox,
} from '@chakra-ui/react';
import { formatCurrencyUtil } from '@gated/utils';
import { HiPencil } from 'react-icons/hi';
import { CustomAmountModal } from './custom-amount-modal';
import {
  IoRadioButtonOnOutline as CheckedIcon,
  IoRadioButtonOffOutline as UncheckedIcon,
} from 'react-icons/io5';
export function AmountPicker({ onChange, minimumAmountInCents }) {
  const [customAmount, setCustomAmount] = useState<number>(null);

  const { onClose, ...disclosure } = useDisclosure();

  const customText = 'Custom';

  const options = [
    minimumAmountInCents.toString(),
    (minimumAmountInCents * 2).toString(),
    (minimumAmountInCents * 4).toString(),
    customText,
  ];

  const defaultValue = options[1];

  useEffect(() => {
    onChange(Number(defaultValue));
  }, []);

  const preCustomValue = useRef(defaultValue);

  const { getRootProps, getRadioProps, setValue, value } = useRadioGroup({
    name: 'amount',
    defaultValue,

    onChange: (nextValue) => {
      if (nextValue === customText) {
        if (customAmount) {
          onChange(customAmount);
        } else {
          preCustomValue.current = value;
          disclosure.onOpen();
        }
      } else {
        onChange(Number(nextValue));
      }
    },
  });

  const group = getRootProps();

  const RadioCard = (props) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const { state } = useCheckbox(props);
    const bgPos = keyframes`
      0%{background-position:0% 50%}
      50%{background-position:100% 50%}
      100%{background-position:0% 50%}
    `;
    const activeAnimation = `${bgPos} infinite 30s linear`;

    return (
      <Box as="label" width="100%">
        <input {...input} />
        <Box
          verticalAlign="baseline"
          position="relative"
          {...checkbox}
          cursor="pointer"
          borderRadius="md"
          fontWeight="bold"
          bg="blackAlpha.200"
          borderColor="blackAlpha.100"
          color="muted"
          width="100%"
          textAlign="center"
          borderStyle="solid"
          borderWidth="2px"
          animation={activeAnimation}
          _hover={{
            bgColor: 'blackAlpha.300',
          }}
          // _checked={{
          //   boxShadow: 'md',
          //   color: 'blue.800',
          //   textShadow: '0 0 10px green.200',
          //   bg: 'bg-active',
          //   borderColor: 'teal.500',
          //   bgGradient: 'linear(to-r, primary.200, green.200, teal.200)',
          //   backgroundSize: '400% 400%',
          // }}
          _checked={{
            boxShadow: 'md',
            color: 'active',
            textShadow: '0 0 10px green.200',
            bg: 'bg-active',
            borderColor: 'active',
            backgroundSize: '400% 400%',
          }}
          px={5}
          py={3}
        >
          <Box position="absolute" left="4" top="14px">
            <Icon
              boxSize="5"
              color="blackAlpha.300"
              as={state.isChecked ? CheckedIcon : UncheckedIcon}
              {...checkbox}
              _checked={{
                color: 'active.700',
              }}
            />
          </Box>
          {props.children}
        </Box>
      </Box>
    );
  };

  const closeModal = () => {
    if (!customAmount) {
      setValue(preCustomValue.current);
    }
    onClose();
  };

  return (
    <Box width="100%">
      <CustomAmountModal
        onSelect={(customAmountInCents) => {
          setCustomAmount(customAmountInCents);
          setValue(customText);
          onChange(customAmountInCents);
          onClose();
        }}
        minimumAmountInCents={minimumAmountInCents}
        customAmount={customAmount}
        {...disclosure}
        onClose={closeModal}
      />
      <VStack {...group} spacing={3}>
        {options.map((value) => {
          const radio = getRadioProps({ value: value });
          let label: string;
          let icon = null;

          if (value === customText) {
            if (customAmount) {
              label = formatCurrencyUtil(customAmount);
              icon = <Icon as={HiPencil} />;
            } else {
              label = customText;
            }
          } else {
            label = formatCurrencyUtil(value);
          }

          return (
            <RadioCard key={value} {...radio} icon={icon}>
              {label}
              {icon && (
                <Flex
                  position="absolute"
                  right="0"
                  height="100%"
                  alignItems="center"
                  top="0"
                  px="5"
                  onClick={disclosure.onOpen}
                >
                  {icon}
                </Flex>
              )}
            </RadioCard>
          );
        })}
      </VStack>
    </Box>
  );
}
