import { Avatar, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useUserPageContext } from './user-page.context';
import { useRouter } from 'next/router';
import { Layout } from '@components/layout';

export function UserPageView() {
  const { donationProfile } = useUserPageContext();
  const router = useRouter();
  const handle = router.query.handle as string;
  const {
    user: { fullName, avatar },
  } = useUserPageContext();

  const heroContent = (
    <>
      <Stack
        direction="column"
        spacing={{ base: 4, md: 8 }}
        alignItems="center"
      >
        <Avatar
          src={avatar}
          name={fullName}
          size="xl"
          borderWidth={3}
          borderColor="white"
        />
        <Heading>{fullName}</Heading>
        <Heading>
          <Text as="span" fontWeight="normal">
            Reach Me &{' '}
          </Text>

          <strong>
            Make an{' '}
            <Text as="span" color="accent-brand">
              Impact
            </Text>
          </strong>
        </Heading>
      </Stack>
      <Heading size="md">
        I use Gated to stay focused{' '}
        <Text as="span" textTransform="uppercase">
          and
        </Text>{' '}
        support my favorite cause:{' '}
        <Text as="span" color="accent-brand" display="inline-block">
          {donationProfile.nonprofit.name}
        </Text>
      </Heading>
    </>
  );

  return (
    <Layout heroContent={heroContent}>
      <Text>Select one of my donation pages below...</Text>
      {donationProfile.featured.length === 0 && <Text>No pages available</Text>}
      {donationProfile.featured.map((item) => (
        <Button
          w="full"
          variant="outline"
          size="xl"
          key={item.donationRequestId}
          colorScheme="blue"
          onClick={() => router.push(`/${handle}/p/${item.donationRequestId}`)}
        >
          {item.cta}
        </Button>
      ))}
    </Layout>
  );
}
