import { useCallback } from 'react';
import { gql } from '@apollo/client';
import {
  PaymentChargeInput,
  usePaymentChargeMutation,
} from '@gated/graphql-types';

gql`
  mutation PaymentCharge($input: PaymentChargeInput!) {
    paymentCharge(input: $input)
  }
`;

export const useCharge = () => {
  const [chargeMutation, { error, loading }] = usePaymentChargeMutation();

  const charge = useCallback((input: PaymentChargeInput) => {
    return chargeMutation({
      variables: { input },
    }).then(function (response) {
      if (response.data?.paymentCharge === false) {
        throw new Error();
      } else {
        return response;
      }
    });
  }, []);

  return { error, loading, charge };
};
