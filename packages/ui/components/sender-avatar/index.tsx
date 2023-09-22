import { Avatar, AvatarProps } from '@chakra-ui/react';
import React, { memo, useCallback } from 'react';
import { emailPartsUtil } from '@gated/utils';
import GmailLogo from './gmail-logo.svg';

interface DomainIconProps extends AvatarProps {
  sender: string;
  forceDomain?: boolean;
}

export const SenderAvatar = memo<DomainIconProps>(
  ({ sender, forceDomain = false, ...rest }) => {
    const getProps = useCallback(() => {
      const { username, domain } = emailPartsUtil(sender);
      let borderRadius, src, name, bg, icon;
      if (!username || forceDomain) {
        const domainParts = domain.split('.');
        const apexDomain = `${domainParts[domainParts.length - 2]}.${
          domainParts[domainParts.length - 1]
        }`;

        if (apexDomain === 'gmail.com') {
          src = GmailLogo.src;
        } else {
          src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${apexDomain}&size=128`;
        }

        borderRadius = '5px';
        bg = 'white';
      } else {
        name = username;
      }

      return { borderRadius, src, name, bg, icon };
    }, [sender]);

    return <Avatar boxSize="30px" mr={2} {...getProps()} {...rest} />;
  },
);
