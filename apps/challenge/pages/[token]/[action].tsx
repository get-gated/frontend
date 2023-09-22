import Challenge from '@components/views/challenge.view';
import { useAtom, useSetAtom } from 'jotai';
import { Action, actionAtom, dataAtom, tokenAtom } from '../../store';

import { useSenderChallenge } from '@hooks/use-sender-challenge.hook';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertProps,
  AlertTitle,
  Center,
  Container,
} from '@chakra-ui/react';
import { Spinner } from '@gated/ui/components';
import Head from 'next/head';
import { useAnalytics } from '@gated/app';

export default function ChallengePage() {
  const router = useRouter();
  const token = router.query.token as string;
  const action = router.query.action as Action;
  const { page, track } = useAnalytics();
  const { data, loading, error } = useSenderChallenge(token);

  const [pageData, setPageData] = useAtom(dataAtom);
  const [, setAction] = useAtom(actionAtom);
  const setToken = useSetAtom(tokenAtom);

  useEffect(() => {
    setToken(token);
    switch (action) {
      case Action.Donate:
        setAction(action);
        break;
      case Action.Bypass:
        setAction(action);
        break;
      default:
        setAction(Action.Donate);
    }
  }, [token, action, setAction, setToken]);

  useEffect(() => {
    if (!data) return;
    setPageData(data);
  }, [data, setPageData]);

  useEffect(() => {
    const params = new URL(location.href).searchParams;
    page('challenge', {
      emailTemplateId: params.get('template_id'),
      emailTemplateSetByUser: params.get('template_set_by_user'),
    });
  }, []);

  const Layout = ({ children }) => (
    <Container h="100vh">
      <Head>
        <title>Gated</title>
      </Head>
      <Center h="90%">{children}</Center>
    </Container>
  );

  if (!pageData || loading) {
    return (
      <Layout>
        <Spinner />
      </Layout>
    );
  }

  const alertProps: Partial<AlertProps> = {
    variant: 'subtle',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '200px',
    maxW: '500px',
  };

  if (error) {
    track('challenge_error');
    return (
      <Layout>
        <Alert status="error">
          <AlertIcon boxSize="40px" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Oh No!
          </AlertTitle>
          <AlertDescription>
            Something went wrong. Please try again soon.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  if (data?.isActive === false) {
    track('challenge_inactive');
    return (
      <Layout>
        <Alert status="warning" {...alertProps}>
          <AlertIcon boxSize="40px" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            Invalid Link
          </AlertTitle>
          <AlertDescription>
            The link you used is no longer valid.
          </AlertDescription>
        </Alert>
      </Layout>
    );
  }

  if (pageData) {
    return (
      <>
        <Challenge />
      </>
    );
  }
}
