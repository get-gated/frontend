export const emailPartsUtil = (email: string) => {
  let domain: string, username: string;

  if (email.includes('@')) {
    const parts = email.split('@');
    username = parts[0];
    domain = parts[1];
  } else {
    username = '';
    domain = email;
  }

  return { username, domain };
};
