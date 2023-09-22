import React, { JSXElementConstructor, useContext } from 'react';
import { noop } from 'lodash';
import { CreditCardProps } from './credit-card.component-factory';
import { PaymentProviderEnum } from '@gated/graphql-types';

export interface OnChargeProps {
  paymentProvider: PaymentProviderEnum;
  paymentToken: string;
  chargeToken: string;
  amountCents: number;
}

export interface ICreditCardContext {
  isFormComplete: boolean;
  onSuccess: (donationAmountInCents: number) => void;
  error: string | null;
  loading: boolean;
  onSubmit: () => void;
  CreditCard: JSXElementConstructor<CreditCardProps>;
  onCharge: (OnChargeProps) => Promise<void>;
}

export const CreditCardContext = React.createContext<ICreditCardContext>({
  isFormComplete: false,
  error: null,
  onSuccess: noop,
  loading: false,
  onSubmit: noop,
  CreditCard: () => null,
  onCharge: async () => null,
});
export const useCreditCard = () => {
  const context = useContext(CreditCardContext);
  if (!context) {
    throw Error('Hook can only be used in credit card provider');
  } else {
    return context;
  }
};
