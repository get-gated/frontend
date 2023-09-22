import React, { Dispatch, SetStateAction, useContext } from 'react';
import { TrainingType } from './add-rule-wizard.enums';
import { Address } from './use-steps.hook';
import { ApolloError } from '@apollo/client';
import { RuleEnum } from '@gated/graphql-types';

export interface TrainContext {
  type: TrainingType;
  onTypeChange: Dispatch<SetStateAction<TrainingType>>;
  address: Address;
  onAddressChange: Dispatch<SetStateAction<Address>>;
  rule: RuleEnum;
  onRuleChange: Dispatch<SetStateAction<RuleEnum>>;
  onSave: () => Promise<void>;
  loading: boolean;
  onNext: () => void;
  onPrev: () => void;
  onDone: () => void;
  error: ApolloError | undefined;
}

export const TrainContext = React.createContext<TrainContext | null>(null);
export const useTrain = () => {
  const context = useContext(TrainContext);
  if (!context) {
    throw Error('Wrap your component with `<Train />`');
  } else {
    return context;
  }
};
