import { AuthProviderType, AuthType } from '@gated/app';
import { App, useAppLink } from '@gated/app/hooks';
import { Center, Container } from '@chakra-ui/react';
import { AuthButton } from '@gated/ui/components/auth-button';

export default function Linkedin() {
  const appLink = useAppLink();

  return (
    <Container>
      <Center h="100vh">
        <AuthButton
          redirectPath="/login"
          buttonTitle="Sign Up with LinkedIn"
          authProvider={AuthProviderType.LinkedIn}
          authType={AuthType.SignUp}
          onSuccess={() => {
            window.location.href = appLink(App.Dashboard, '/app');
          }}
          buttonProps={{ variant: 'primary', colorScheme: 'linkedin' }}
        />
      </Center>
    </Container>
  );
}
