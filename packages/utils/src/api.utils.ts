export const appUrl = (endpoint) => {
  const appBase =
    typeof window === 'undefined'
      ? `${process.env.APP_PUBLIC_PROTOCOL}://${process.env.APP_PUBLIC_DOMAIN}`
      : window.location.origin;

  return `${appBase}${endpoint}`;
};
