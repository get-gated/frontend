import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { theme } from '@gated/ui';

import { Box, useColorMode } from '@chakra-ui/react';
import { StripeCardElement, StripeCardElementOptions } from '@stripe/stripe-js';
import { useCreditCard } from './use-credit-card.hook';
import { PaymentProviderEnum } from '@gated/graphql-types';
import { memo } from 'react';

export interface CreditCardProps {
  amountCents: number;
  paymentToken?: string;
}

export const creditCardFactory = (
  setError,
  setLoading,
  setIsFormComplete,
  setOnSubmit,
) => {
  const CreditCard = memo(({ amountCents, paymentToken }: CreditCardProps) => {
    const { colorMode } = useColorMode();
    const stripe = useStripe();
    const elements = useElements();

    const { onSuccess, loading, onCharge } = useCreditCard();

    setOnSubmit(async () => {
      if (!stripe || !elements) {
        throw new Error('Stripe not available');
      }

      if (loading) {
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const card = elements.getElement(CardElement);
        const result = await stripe.createToken(card as StripeCardElement);

        if (result.error) {
          setError(result.error.message || 'Something went wrong');
        } else {
          await onCharge({
            paymentProvider: PaymentProviderEnum.Stripe,
            paymentToken,
            chargeToken: result.token.id,
            amountCents,
          });

          onSuccess(amountCents);
        }
      } catch (err) {
        let msg = 'Charge failed (card was declined)';
        if (err.length) {
          msg = err[0].message;
        }
        setError(msg);
      } finally {
        setLoading(false);
      }
    });

    const cardStyle: StripeCardElementOptions = {
      style: {
        base: {
          color: colorMode === 'light' ? theme.colors.gray['800'] : '#FFFFFF',
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: 'antialiased',
          fontWeight: '500',
          fontSize: '16px',
          '::placeholder': {
            color: colorMode === 'light' ? theme.colors.gray['300'] : '#FFFFFF',
          },
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    };

    return (
      <>
        <form style={{ height: 'auto', width: '100%' }}>
          <Box borderRadius="md" borderColor="gray.200" borderWidth="1px" p="4">
            <CardElement
              options={cardStyle}
              onChange={(e) => {
                setIsFormComplete(e.complete);
              }}
            />
          </Box>
        </form>
      </>
    );
  });

  CreditCard.displayName = 'CreditCard';
  return CreditCard;
};
