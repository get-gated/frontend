export const formatCurrencyUtil = (amountInCents = 0) => {
  const num = Number(amountInCents) / 100;
  return new Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    style: 'currency',
  }).format(num);
};
