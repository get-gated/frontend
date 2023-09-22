import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  Icon,
  Slide,
  SlideDirection,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { gql } from '@apollo/client';
import { OnboardingStepConnectInbox } from '@components/onboarding/drawer/onboarding-step-connect-inbox';
import { OnboardingStepAllowList } from '@components/onboarding/drawer/onboarding-step-allow-list';
import { OnboardingStepNonProfit } from '@components/onboarding/drawer/onboarding-step-nonprofit';
import { OnboardingStepTour } from '@components/onboarding/drawer/onboarding-step-tour';
import {
  OnboardingDetailsQuery,
  useOnboardingDetailsLazyQuery,
  UserTaskEnum,
} from '@gated/graphql-types';

import SuccessSvg from '@assets/images/undraw_online_party_re_7t6g.svg';
import Image from 'next/image';

import { IoSparklesSharp as SetupIcon } from 'react-icons/io5';
import {
  ProgressStepsProvider,
  useProgressSteps,
} from '@components/ProgressSteps';
import { useMe } from '@gated/app';

gql`
  query OnboardingDetails {
    userTasks(input: { onlyUnresolved: false }) {
      id
      task
      resolution
    }
  }
`;

gql`
  mutation MarkOnboardingTaskComplete($input: UserTaskResolvedInput!) {
    userTaskResolved(input: $input) {
      id
      resolution
    }
  }
`;

export const OnboardingDrawer = () => (
  <ProgressStepsProvider numberOfSteps={5}>
    <OnboardingDrawerView />
  </ProgressStepsProvider>
);

const OnboardingDrawerView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, onSetStep, onNext } = useProgressSteps();
  const { user } = useMe();

  const [getDetails, { data, loading }] = useOnboardingDetailsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  const init = async () => {
    const { data: initData, error } = await getDetails();

    if (error) return;

    let defaultStep = 1;

    const steps = getSteps(initData);

    if (steps[0].isCompleted && !steps[1].isCompleted) {
      defaultStep = 2;
    } else if (steps[1].isCompleted && !steps[2].isCompleted) {
      defaultStep = 3;
    } else if (steps[2].isCompleted && !steps[3].isCompleted) {
      defaultStep = 4;
    } else if (steps[3].isCompleted) {
      defaultStep = 5;
    }

    onSetStep(defaultStep);

    if (defaultStep === 5) return; //don't open if they are in a finished state
    onOpen();
  };

  useEffect(() => {
    init();
  }, []);

  const getSteps = (stepData: OnboardingDetailsQuery) => {
    return [
      {
        step: 1,
        isCompleted: Boolean(
          stepData?.userTasks.find(
            ({ task }) => task === UserTaskEnum.ConnectFirstAccount,
          )?.resolution,
        ),
        isActive: activeStep === 1,
      },
      {
        step: 2,
        isCompleted: Boolean(
          stepData?.userTasks.find(
            ({ task }) => task === UserTaskEnum.ChooseNonprofit,
          )?.resolution,
        ),
        isActive: activeStep === 2,
      },
      {
        step: 3,
        isCompleted: Boolean(
          stepData?.userTasks.find(
            ({ task }) => task === UserTaskEnum.ReviewAllowList,
          )?.resolution,
        ),
        isActive: activeStep === 3,
      },
      {
        step: 4,
        isCompleted: Boolean(
          stepData?.userTasks.find(({ task }) => task === UserTaskEnum.TakeTour)
            ?.resolution,
        ),
        isActive: activeStep === 4,
      },
      { step: 5, isActive: activeStep === 5 },
    ];
  };

  const steps = getSteps(data);

  const isFinished = steps[3].isCompleted;

  const drawerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!isFinished || !drawerRef.current) return;

    drawerRef.current.scrollTo({
      top: drawerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [isFinished, drawerRef.current]);

  const onComplete = () => {
    onNext();
  };

  const slideDirection = useBreakpointValue<SlideDirection>({
    base: 'bottom',
    sm: 'top',
  });

  //if this is a user without onboarding tasks, dont load the drawer. We can remove this in the near future
  if (
    data &&
    !data.userTasks.find((i) => i.task === UserTaskEnum.ConnectFirstAccount)
  ) {
    return null;
  }

  if (!data || (isFinished && !user.isNewUser)) {
    return null;
  }

  return (
    <>
      <Box
        position="fixed"
        left="0"
        right="0"
        margin="auto"
        top={{ sm: '0' }}
        bottom={{ base: '0', sm: 'initial' }}
        zIndex="sticky"
      >
        <Slide in={!isOpen} direction={slideDirection}>
          <VStack>
            <Button
              onClick={onOpen}
              variant="primary"
              leftIcon={<SetupIcon />}
              borderTopRadius={0}
              borderBottomRadius={{ base: 0, sm: 'md' }}
              w={{ base: 'full', sm: 'auto' }}
              px={{ base: 'initial', sm: 6 }}
              py={{ base: 8, sm: 'initial' }}
              shadow="lg"
            >
              {isFinished ? 'Review Setup' : 'Finish Setup'}
            </Button>
          </VStack>
        </Slide>
      </Box>
      <Drawer
        size="md"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        closeOnOverlayClick={isFinished}
      >
        <DrawerOverlay />
        <DrawerContent pt={8}>
          <DrawerCloseButton title="Close" />
          <DrawerBody ref={drawerRef}>
            <VStack alignItems="start">
              <Heading size="md">Welcome to Gated!</Heading>
              <Text pb={8}>
                Let&apos;s get your Gated account setup and protecting your
                inbox. It will only take a couple minutes...
              </Text>
              <Divider variant="brand" size="sm" />
              <Heading size="lg" as="h3" pt={8}>
                <Icon as={SetupIcon} boxSize={5} verticalAlign="top" mr={2} />
                {isFinished ? 'All Done!' : 'Finish Setup'}
              </Heading>
              <OnboardingStepConnectInbox
                isCurrent={!steps[0].isCompleted}
                isCompleted={steps[0].isCompleted}
                isActive={activeStep === 1}
                onComplete={onComplete}
                onJumpTo={() => onSetStep(1)}
              />
              <OnboardingStepNonProfit
                isCurrent={steps[0].isCompleted && !steps[1].isCompleted}
                isCompleted={steps[1].isCompleted}
                isActive={activeStep === 2}
                onComplete={onComplete}
                onJumpTo={() => onSetStep(2)}
              />
              <OnboardingStepAllowList
                isCurrent={steps[1].isCompleted && !steps[2].isCompleted}
                isCompleted={steps[2].isCompleted}
                isActive={activeStep === 3}
                onComplete={onComplete}
                onJumpTo={() => onSetStep(3)}
              />
              <OnboardingStepTour
                isCurrent={steps[2].isCompleted && !steps[3].isCompleted}
                isCompleted={steps[3].isCompleted}
                isActive={activeStep === 4}
                onComplete={onComplete}
                onJumpTo={() => onSetStep(4)}
              />
              {activeStep === 5 && (
                <VStack width="100%" spacing={6} pt={6}>
                  <Image src={SuccessSvg.src} width={200} height={200} />
                  <Text fontSize="lg">
                    You&apos;re all setup and ready to start using Gated!
                  </Text>
                  <Button onClick={onClose}>My Dashboard</Button>
                </VStack>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
