import {
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useAtomValue } from 'jotai';

import { viewportAtom } from '@/store';

import InfoGraphicDesktop from '@components/info-graphic/info-graphic.svg';
import InfoGraphicMobile from '@components/info-graphic/info-graphic-mobile.svg';
import React from 'react';

export const HowItWorksModal = (props: any) => {
  const { isOpen, onClose } = props;
  const viewport = useAtomValue(viewportAtom);
  const InfoGraphic =
    viewport !== 'mobile' ? InfoGraphicDesktop : InfoGraphicMobile;

  return (
    <Modal size="6xl" isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="2rem" bgColor="white">
        <ModalCloseButton h="3rem" w="3rem" color="black" zIndex={1} />
        <ModalBody
          m="2rem"
          alignContent="right"
          maxHeight="75vh"
          overflowY="auto"
        >
          <Center>
            <Image
              src={InfoGraphic.src}
              alt="How Gated Works"
              width={InfoGraphic.width}
              height={InfoGraphic.height}
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
