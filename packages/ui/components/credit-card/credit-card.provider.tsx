import { CreditCardContext } from './use-credit-card.hook';
import { Elements } from '@stripe/react-stripe-js';
import {
  JSXElementConstructor,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useApp } from '@gated/app';
import { loadStripe } from '@stripe/stripe-js';
import {
  creditCardFactory,
  CreditCardProps,
} from './credit-card.component-factory';

interface CreditCardProviderProps {
  children: ReactNode;
  onSuccess: (donationAmountInCents: number) => void;
  onCharge: (OnChargeProps) => Promise<void>;
}

export default function CreditCardProvider({
  onSuccess,
  onCharge,
  children,
}: CreditCardProviderProps) {
  const [stripePromise, setStripePromise] = useState(null);
  const { config } = useApp();
  const [loading, setLoading] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [error, setError] = useState();
  const submitFunc = useRef(() => console.error('no submit func registered'));
  const CreditCard = useRef<JSXElementConstructor<CreditCardProps>>(() => null);

  const onSubmit = () => submitFunc.current();
  const setOnSubmit = (func) => (submitFunc.current = func);

  useEffect(() => {
    if (!config || !config.stripe.publishableKey) return;

    setStripePromise(loadStripe(config.stripe.publishableKey));

    CreditCard.current = creditCardFactory(
      setError,
      setLoading,
      setIsFormComplete,
      setOnSubmit,
    );
  }, [config]);

  return (
    <CreditCardContext.Provider
      value={{
        loading,
        onSuccess,
        onCharge,
        error,
        isFormComplete,
        onSubmit,
        CreditCard: CreditCard.current,
      }}
    >
      <Elements stripe={stripePromise}>{children}</Elements>
    </CreditCardContext.Provider>
  );
}
