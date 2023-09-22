import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  HStack,
  Flex,
  Spacer,
  Text,
  Heading,
  VStack,
  Divider,
  UseDisclosureProps,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import ReviewAllowSvg from '@assets/images/undraw_accept_request_re_d81h.svg';
import ReviewAllowCompleteSvg from '@assets/images/undraw_winners_re_wr1l.svg';
import Image from 'next/image';
import { gql } from '@apollo/client';
import {
  useAllowListAddressReviewLazyQuery,
  useAllowListDomainReviewQuery,
  useConnectionsStatusQuery,
} from '@gated/graphql-types';
import { SenderAvatar } from '@gated/ui/components';
import {
  ProgressStepsIndicator,
  ProgressStepsProvider,
  useProgressSteps,
} from '@components/ProgressSteps';

interface AllowListModalProps extends UseDisclosureProps {
  onComplete: () => void;
}

interface IStep {
  nextButtonTitle: string;
  Body: FC;
  onNext: () => void;
  onBack?: () => void;
  heading?: string;
}

gql`
  query AllowListAddressReview($connectionId: ID!) {
    previewAllowed(id: $connectionId) {
      results {
        id
        sender {
          emailAddress
          displayName
        }
      }
    }
  }
`;

gql`
  query AllowListDomainReview {
    trainingSearch(
      input: {
        type: Domains
        pagination: { first: 10 }
        filter: { rule: Allow }
      }
    ) {
      edges {
        cursor
        node {
          id
          domain
        }
      }
    }
  }
`;

const Step0Content = () => (
  <VStack spacing={2} alignItems="start">
    <Box alignSelf="center">
      <Image src={ReviewAllowSvg.src} width="200" height="200" />
    </Box>
    <Text fontSize="md">
      Gated intelligently determines who should and should not reach your inbox
      based on your email habits.
    </Text>
    <Text>Let&apos;s take a quick look at what we found...</Text>
  </VStack>
);

interface ItemProps {
  email: string;
  name?: string;
  loading?: boolean;
}
const Item = ({ email, name, loading = false }: ItemProps) => (
  <HStack p={2} textOverflow="ellipsis" spacing={0} align="top">
    <SkeletonCircle isLoaded={!loading} mr={1}>
      <SenderAvatar
        size="sm"
        borderWidth={1}
        borderColor="success"
        sender={email}
      />
    </SkeletonCircle>
    <Box overflow="hidden">
      <Skeleton isLoaded={!loading}>
        <Text noOfLines={1}>{name || email}</Text>
      </Skeleton>
      {name && (
        <Text noOfLines={1} textStyle="caption">
          {email}
        </Text>
      )}
    </Box>
  </HStack>
);

interface ItemsProps {
  items: ItemProps[];
  footerText?: string | JSX.Element;
  loading?: boolean;
}

const Items = ({ items, footerText, loading = false }: ItemsProps) => {
  return (
    <>
      <VStack alignItems="start" width="100%" spacing={1} p={3}>
        {items.map((item, i) => (
          <>
            <Item
              email={item.email}
              name={item.name}
              loading={loading}
              key={i}
            />

            <Divider />
          </>
        ))}
      </VStack>
      {footerText && (
        <Text py={3} w="100%">
          {footerText}
        </Text>
      )}
    </>
  );
};

const Step1Content = () => {
  const [query, { data, loading }] = useAllowListAddressReviewLazyQuery();

  const { data: connectionData } = useConnectionsStatusQuery({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!connectionData) return;
    const connectionId = connectionData.me.connections[0].id;
    query({ variables: { connectionId } });
  }, [connectionData]);
  return (
    <>
      <Text>
        Below are a few examples we found of recent people you&apos;ve sent
        email to...
      </Text>
      {loading && (
        <Items
          loading
          items={Array.from({ length: 3 }).map(() => ({
            email: 'loading@email.com',
          }))}
        />
      )}
      {data && (
        <Items
          items={data.previewAllowed.results.map((item) => ({
            email: item.sender.emailAddress,
            name: item.sender.displayName,
          }))}
          footerText="They and anyone else you send an email to (past and future) will be able to reach your inbox."
        />
      )}
    </>
  );
};

const Step2Content = () => {
  const { data, loading } = useAllowListDomainReviewQuery();
  console.log(data);
  return (
    <>
      <Text>We noticed you email people at these domains often...</Text>
      {data && (
        <Items
          items={data.trainingSearch.edges.map((item) => ({
            email: item.node.domain,
          }))}
          footerText={
            'People with email addresses at these domains will always reach your inbox.'
          }
        />
      )}
    </>
  );
};

const Step3Content = () => (
  <VStack spacing={2} alignItems="start">
    <Box alignSelf="center">
      <Image src={ReviewAllowCompleteSvg.src} width="200" height="200" />
    </Box>
    <Text>
      Rest assured that the messages that matter will continue to arrive
      directly in your inbox.
    </Text>
    <Text>
      All others will be diverted to your Gated folder, which you can see at any
      time.
    </Text>
  </VStack>
);

export const AllowListModal = (props: AllowListModalProps) => {
  return (
    <ProgressStepsProvider numberOfSteps={4}>
      <AllowListModalView {...props} />
    </ProgressStepsProvider>
  );
};

const AllowListModalView = ({
  isOpen,
  onClose,
  onComplete,
}: AllowListModalProps) => {
  const { onNext, onBack, activeStep, onReset } = useProgressSteps();

  const close = () => {
    onReset();
    onClose();
  };

  const steps: IStep[] = [
    {
      nextButtonTitle: 'Start',
      Body: Step0Content,
      onNext: onNext,
    },
    {
      nextButtonTitle: 'Next',
      Body: Step1Content,
      onNext: onNext,
      onBack: onBack,
      heading: 'Allowed Senders',
    },
    {
      nextButtonTitle: 'Next',
      Body: Step2Content,
      onNext: onNext,
      onBack: onBack,
      heading: 'Allowed Domains',
    },
    {
      nextButtonTitle: 'Finish',
      Body: Step3Content,
      onBack: onBack,
      onNext: () => {
        close();
        onComplete();
      },
      heading: 'Review Complete',
    },
  ];

  const step = steps[activeStep - 1];

  return (
    <Modal isOpen={isOpen} onClose={close} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Review My Allow List</ModalHeader>
        <ModalCloseButton />
        <ModalBody minH="400px" maxH="400px" overflow="scroll">
          {step.heading && (
            <Heading size="sm" mb={2}>
              {step.heading}
            </Heading>
          )}
          <step.Body />
        </ModalBody>

        <ModalFooter as={Flex}>
          <Box w="50%">
            <ProgressStepsIndicator />
          </Box>
          <Spacer />
          {step.onBack && (
            <Button variant="ghost" onClick={step.onBack} mr={2}>
              Back
            </Button>
          )}
          <Button variant="primary" onClick={step.onNext}>
            {step.nextButtonTitle}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
