import { useDecisionTest } from '@hooks/use-decision-test.hook';
import React, { useEffect } from 'react';

import {
  Button,
  ButtonGroup,
  Center,
  Divider,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Error, Spinner } from '@gated/ui/components';
import { TestAddressTile } from '@components/allow-list/tiles/test-address.view';
import { VerdictEnum } from '@gated/graphql-types';
import { Breadcrumbs } from '@components/allow-list/components/breadcrumbs.component';
import { emailPartsUtil } from '@gated/utils';
import { Tile } from '@components/tile';
import { RuleTag } from '@components/rule-tag';

export const SenderTestPage = () => {
  const { onTest, error, result, loading } = useDecisionTest();
  const router = useRouter();
  const address = router.query.address as string;
  useEffect(() => {
    if (!address) return;
    onTest(address);
  }, [address]);

  if (!address) {
    return (
      <Center w="full">
        <TestAddressTile
          onTest={(address) => router.push(`/allow-list/test/${address}`)}
        />
      </Center>
    );
  }

  if (error) {
    return <Error message="Error testing." />;
  }

  if (loading || !result) {
    return <Spinner />;
  }

  let reason = '';
  const addressRule = 'as it matches a address rule.';
  const domainRule = 'as it matches a domain rule.';
  const patternRule = `The address matches a system rule. ${result.enforcedPattern?.expression}`;
  switch (result.verdict) {
    case VerdictEnum.AddressAllowed:
      reason = addressRule;
      break;
    case VerdictEnum.AddressGated:
      reason = addressRule;
      break;
    case VerdictEnum.AddressMuted:
      reason = addressRule;
      break;
    case VerdictEnum.DomainAllowed:
      reason = domainRule;
      break;
    case VerdictEnum.DomainGated:
      reason = domainRule;
      break;
    case VerdictEnum.DomainMuted:
      reason = domainRule;
      break;
    case VerdictEnum.PatternAllowed:
      reason = patternRule;
      break;
    case VerdictEnum.PatternGated:
      reason = patternRule;
      break;
    case VerdictEnum.PatternMuted:
      reason = patternRule;
      break;
  }

  return (
    // eslint-disable-next-line react/jsx-no-undef
    <Center w="full" flexDir="column">
      <Breadcrumbs />
      <Heading size="md" mb={5} color="muted">
        Test Results
      </Heading>
      <Tile>
        <VStack>
          <Heading>{address}</Heading>
          <Divider />

          <Text mt={8}>Messages received from this address are currently</Text>
          <RuleTag
            rule={result.ruling}
            inheritedRule={result.enforcedTraining?.inheritedRule}
            size="lg"
          />
          <Text mb={8}>{reason}</Text>

          <Divider />
          <ButtonGroup size="sm" isAttached variant="outline" w="full" pt={3}>
            <Button
              w="full"
              mr="-px"
              onClick={() => router.push(`/allow-list/details/${address}`)}
            >
              Manage Address
            </Button>
            <Button
              w="full"
              mr="-px"
              onClick={() =>
                router.push(
                  `/allow-list/details/${emailPartsUtil(address).domain}`,
                )
              }
            >
              Manage Domain
            </Button>
          </ButtonGroup>
          <Button
            variant="link"
            onClick={() => router.push('/allow-list/test')}
            size="sm"
          >
            or test another sender
          </Button>
        </VStack>
      </Tile>
    </Center>
  );
};
export default SenderTestPage;
