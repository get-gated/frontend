import {
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  Text,
} from '@chakra-ui/react';

import React, { RefObject } from 'react';
import { RuleTag } from '@components/rule-tag';
import { RuleEnum } from '@gated/graphql-types';
import { Rule } from '../../../enums/rule.enum';

interface RuleRadioGroupProps extends Omit<RadioGroupProps, 'children'> {
  allowRadioRef?: RefObject<HTMLInputElement>;
}

export const RuleRadioGroup = ({
  allowRadioRef,
  ...rest
}: RuleRadioGroupProps) => (
  <RadioGroup {...rest} mt={5} ml={4}>
    <Stack direction="column" gap={2}>
      <Radio value={Rule.Allow} alignItems="top" ref={allowRadioRef}>
        <RuleTag rule={RuleEnum.Allow} mt={-1} cursor="pointer" />
        <Text textStyle="footnote">
          New messages arrive directly in your inbox.
        </Text>
      </Radio>
      <Radio value={Rule.Gate} alignItems="top">
        <RuleTag rule={RuleEnum.Gate} mt={-1} cursor="pointer" />
        <Text textStyle="footnote">
          New messages are moved to the @Gated folder and challenged for a
          donation.
        </Text>
      </Radio>
      <Radio value={Rule.Mute} alignItems="top">
        <RuleTag rule={RuleEnum.Mute} mt={-1} cursor="pointer" />
        <Text textStyle="footnote">
          New messages are moved to the @Gated folder <strong>without</strong>{' '}
          being challenge.
        </Text>
      </Radio>
    </Stack>
  </RadioGroup>
);
