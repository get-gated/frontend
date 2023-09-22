export const formatSenderFromPartsUtil = (username = '', domain: string) => {
  if (username) {
    return `${username}@${domain}`;
  }

  return domain;
};
