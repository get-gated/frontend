import { Text } from '@chakra-ui/react';

import { logos } from './logos';
import { Logo } from './Logo';
import { LogoContainer, Root } from './LogoMarquee.styled';

export const LogoMarquee = () => {
  return (
    <Root>
      <Text
        as="h3"
        fontSize={{ base: 'lg', md: 'xl' }}
        textAlign="center"
        color="blackAlpha.500"
      >
        Trusted by thousands of executives at
      </Text>

      <LogoContainer gradient={false} pauseOnHover={false} pauseOnClick={false}>
        {logos.map((logo) => (
          <Logo key={`${logo.caption}`} logo={logo} />
        ))}
      </LogoContainer>
    </Root>
  );
};
