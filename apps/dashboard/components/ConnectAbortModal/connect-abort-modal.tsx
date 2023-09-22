import {
  Button,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  List,
  ListIcon,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import {
  IoEyeOutline,
  IoFolderOpenOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import Image from 'next/image';
import PrivacySvg from '@assets/images/undraw_share_link_re_54rx.svg';
import { AuthButton } from '@gated/ui/components/auth-button';
import { AuthProviderType, AuthType } from '@gated/app';

const IconWithX = ({ icon, ...props }) => (
  <Icon position="relative" {...props}>
    <Icon as={icon} position="absolute" size="lg" />
    <Icon viewBox="0 0 200 200" position="absolute" color="red.500">
      <path
        d="M 0 0 l 200 200"
        strokeWidth="15"
        stroke="currentColor"
        fill="none"
      />
    </Icon>
  </Icon>
);

export const ConnectAbortModal = ({ isOpen, onClose, loginHint }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent px={8} py={16} bg="bg-surface">
        <ModalCloseButton />
        <ModalBody>
          <Stack direction={{ base: 'column', md: 'row-reverse' }}>
            <Center w={{ base: '100%', md: '50%' }} pb={6}>
              <Image src={PrivacySvg.src} width={300} height={200} />
            </Center>
            <VStack
              w={{ base: '100%', md: '50%' }}
              alignItems="start"
              spacing={6}
            >
              <Heading size="lg">
                It appears you didn’t finish connecting your inbox
              </Heading>
              <Divider size="sm" variant="brand" />
              <Heading size="sm" color="subtle">
                Your data and privacy matter.
              </Heading>
              <List spacing={3} pr={10}>
                <ListItem as={HStack} alignItems="baseline">
                  <ListIcon
                    as={IconWithX}
                    icon={IoTrashOutline}
                    color="default"
                  />
                  <Text>We don’t delete your emails.</Text>
                </ListItem>
                <ListItem as={HStack} alignItems="baseline">
                  <ListIcon
                    as={IconWithX}
                    icon={IoFolderOpenOutline}
                    color="default"
                  />
                  <Text>
                    We’ll never sell your data and you can delete it any time.
                  </Text>
                </ListItem>
                <ListItem as={HStack} alignItems="baseline">
                  <ListIcon
                    as={IconWithX}
                    icon={IoEyeOutline}
                    color="default"
                  />
                  <Text>We never look at the contents of your emails.</Text>
                </ListItem>
              </List>
              <VStack w="100%" pt={8}>
                <AuthButton
                  buttonProps={{ w: '80%', variant: 'primary' }}
                  loginHint={loginHint}
                  authType={AuthType.Link}
                  buttonTitle="Try Again"
                  authProvider={AuthProviderType.Google}
                  redirectPath="/loading"
                />

                <Button variant="ghost" onClick={onClose} w="80%">
                  Not Now
                </Button>
              </VStack>
            </VStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
