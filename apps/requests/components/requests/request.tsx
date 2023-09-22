import {
  DonationRequestTypeEnum,
  useDonationRequestLazyQuery,
} from '@gated/graphql-types';
import { QRCodeCanvas } from 'qrcode.react';
import React from 'react';
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useToken,
  VStack,
} from '@chakra-ui/react';
import { useApp, useMe } from '@gated/app';
import { useEffect, useMemo, useRef } from 'react';
import { CopyInput } from '@gated/ui/components';

import Logo from '@assets/favicon-32x32.png';
import { formatCurrencyUtil } from '@gated/utils';

interface RequestProps extends Omit<ModalProps, 'children'> {
  id: string;
}

export function Request({ id, ...modalProps }: RequestProps) {
  const [getReq, { loading, error, data }] = useDonationRequestLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const [mustard] = useToken('colors', ['mustard.500']);

  useEffect(() => {
    if (!id) return;
    getReq({ variables: { id } });
  }, [id]);

  const { config } = useApp();
  const { user } = useMe();

  const url = useMemo(
    () =>
      `${config.origin}/u/${user.handle}/${
        data?.donationRequest.type === DonationRequestTypeEnum.SingleUse
          ? 's'
          : 'p'
      }/${id}`,
    [user.handle, config.origin, data?.donationRequest.type],
  );

  const qr: HTMLCanvasElement = document.querySelector('#qr > canvas');
  const qrData = qr?.toDataURL();

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <ModalHeader>
          {loading && 'Loading'}
          {data?.donationRequest.type === DonationRequestTypeEnum.LongLiving
            ? `Donation Page: ${data.donationRequest.name}`
            : 'Send Donation Request'}
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="start">
            <VStack w="full" alignItems="start">
              <Heading>
                {formatCurrencyUtil(data?.donationRequest.amountInCents)}
              </Heading>
              <CopyInput value={url} />
              <a href={qrData} download={`qr-${id}.png`}>
                <div id="qr">
                  <QRCodeCanvas
                    id="qr"
                    value={url}
                    fgColor={mustard}
                    bgColor="black"
                    level="L"
                    imageSettings={{
                      src: Logo.src,
                      width: 24,
                      height: 24,
                      excavate: true,
                      x: 40,
                      y: 0,
                    }}
                    includeMargin
                  />
                </div>
              </a>
            </VStack>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant="primary" onClick={modalProps.onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
