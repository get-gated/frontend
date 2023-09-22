import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { RefObject, useReducer, useRef, useState } from 'react';

import { RuleRadioGroup } from '../../components/rule-radio-group.component';
import { RuleEnum } from '@gated/graphql-types';
import { useTrainings } from '@hooks/use-trainings.hook';

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

export interface EditRuleModalProps {
  domain?: string;
  username?: string;
  currentRule?: RuleEnum;
  ruleId?: string;
  isCreationMode?: boolean;
  isDomainOnly?: boolean;
  onCompleted?: (data) => void;
}

interface AllProps extends ModalProps, EditRuleModalProps {}

export const EditRuleModal = (props: AllProps) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const domainRef = useRef<HTMLInputElement>(null);
  const allowRadioRef = useRef<HTMLInputElement>(null);

  const initialFocus = () => {
    if (!props.isCreationMode) return allowRadioRef;

    if (props.isDomainOnly) return domainRef;

    return usernameRef;
  };

  return (
    <Modal
      isOpen={Boolean(props.isOpen)}
      onClose={props.onClose}
      size="md"
      scrollBehavior="inside"
      initialFocusRef={initialFocus()}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      {/* force content area to re-render on open to reset state */}
      {props.isOpen && (
        <Content
          {...props}
          usernameRef={usernameRef}
          domainRef={domainRef}
          allowRadioRef={allowRadioRef}
        />
      )}
    </Modal>
  );
};

interface ContentProps extends AllProps {
  usernameRef: RefObject<HTMLInputElement>;
  domainRef: RefObject<HTMLInputElement>;
  allowRadioRef: RefObject<HTMLInputElement>;
}

const Content = (props: ContentProps) => {
  const {
    username,
    ruleId,
    domain,
    onClose,
    isCreationMode,
    currentRule,
    isDomainOnly,
    usernameRef,
    domainRef,
    allowRadioRef,
  } = props;
  const {
    trainDomain,
    trainAddressLoading,
    trainAddressError,
    trainAddress,
    trainDomainError,
    trainDomainLoading,
  } = useTrainings();

  const save = async () => {
    if (saveDisabled()) return;
    let res;
    if (username || (isCreationMode && !isDomainOnly)) {
      res = await trainAddress(
        `${usernameRef?.current?.value}@${domainRef?.current?.value}`,
        newRule,
        ruleId,
        props.onCompleted,
      );
    } else {
      res = trainDomain(
        domainRef?.current?.value || '',
        newRule,
        ruleId,
        props.onCompleted,
      );
    }
    if (res.error) return;
    onClose();
  };
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const buttonVerb = isCreationMode ? 'Add' : 'Update';

  const [newRule, setNewRule] = useState(currentRule || RuleEnum.Allow);

  const saveDisabled = () => {
    const domainIsInvalid = () => {
      if (!domainRef.current) return true;
      const domainParts = domainRef.current.value.split('.');
      return !(
        domainParts.length === 2 &&
        domainParts[0].length > 0 &&
        domainParts[1].length > 0
      );
    };

    if (!isCreationMode) return newRule === currentRule;

    if (isDomainOnly) {
      return domainIsInvalid();
    } else {
      return usernameRef?.current?.value === '' || domainIsInvalid();
    }
  };

  return (
    <ModalContent>
      <ModalHeader>{buttonVerb} Allow List Rule</ModalHeader>
      <ModalCloseButton
        isDisabled={trainAddressLoading || trainDomainLoading}
      />
      <ModalBody>
        <>
          {trainDomainError ||
            (trainAddressError ? (
              <Alert status="error" mb={4} variant="top-accent">
                <AlertIcon />
                <AlertDescription>
                  There was an error saving your alert.
                </AlertDescription>
              </Alert>
            ) : null)}
        </>
        <Box>
          <HStack>
            {!isDomainOnly && (
              <Input
                onChange={forceUpdate}
                ref={usernameRef}
                width="80%"
                placeholder="andrea.smith"
                defaultValue={username}
                textAlign="right"
                borderRightRadius={0}
                borderRight={0}
                _focus={{ boxShadow: 'none' }}
                isReadOnly={Boolean(username)}
              />
            )}
            <InputGroup>
              <InputLeftAddon
                borderLeftRadius={
                  username || (isCreationMode && !isDomainOnly) ? 0 : undefined
                }
                marginInlineStart={-2}
              >
                @
              </InputLeftAddon>
              <Input
                onChange={forceUpdate}
                ref={domainRef}
                defaultValue={domain}
                placeholder="company.com"
                _focus={{ boxShadow: 'none' }}
                isReadOnly={Boolean(domain)}
              />
            </InputGroup>
          </HStack>
          <RuleRadioGroup
            value={newRule}
            onChange={(newRule: RuleEnum) => setNewRule(newRule)}
            mt={5}
            ml={4}
            allowRadioRef={allowRadioRef}
          />
        </Box>
      </ModalBody>
      <ModalFooter>
        <Button
          onClick={save}
          isLoading={trainAddressLoading || trainDomainLoading}
          disabled={trainAddressLoading || trainDomainLoading || saveDisabled()}
        >
          {buttonVerb} Rule
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};
