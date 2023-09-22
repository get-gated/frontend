import { Box, HStack, Stack, Text, useId, useRadio } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import React from 'react';
import { ButtonRadioBox } from './button-radio-box.component';

export const ButtonRadio = (props) => {
  const { label, icon, description } = props;
  const { getCheckboxProps, getInputProps, getLabelProps, state } =
    useRadio(props);
  const id = useId();

  const checkedStyles = {
    bg: mode('', 'rgb(0 31 71)'),
    borderColor: 'blue.600',
  };

  return (
    <label style={{ maxWidth: '400px' }} {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <ButtonRadioBox
        {...getCheckboxProps()}
        _checked={checkedStyles}
        id={id}
        position="relative"
      >
        <HStack spacing="4" align="top">
          <Box
            aria-hidden
            fontSize="2xl"
            mb="3"
            color={state.isChecked ? 'blue.600' : undefined}
          >
            {icon}
          </Box>
          <Stack direction="column">
            <Text fontWeight="extrabold" fontSize="l">
              {label}
            </Text>
            <Text fontSize="sm">{description}</Text>
          </Stack>
        </HStack>
      </ButtonRadioBox>
    </label>
  );
};
