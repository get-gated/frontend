import React, { useState } from 'react';
import { DashboardContext, IDashboardContext } from '@hooks/use-dashboard.hook';
import { Container, useDisclosure } from '@chakra-ui/react';
import {
  EditRuleModal,
  EditRuleModalProps,
} from '@components/allow-list/modals/edit-rule/edit-rule.modal';

import {
  AddRuleWizardModal,
  AddRuleWizardModalProps,
} from '@components/allow-list/modals/add-rule-wizard';

declare global {
  interface Window {
    Intercom: any;
  }
}

export default function DashboardProvider({ children }) {
  const {
    isOpen: isEditRuleOpen,
    onOpen: onEditRuleOpen,
    onClose: onEditRuleClose,
  } = useDisclosure();
  const {
    isOpen: isAddRuleOpen,
    onOpen: onAddRuleOpen,
    onClose: onAddRuleClose,
  } = useDisclosure();
  const [editRuleProps, setEditRuleProps] = useState<EditRuleModalProps>();
  const [addRuleProps, setAddRuleProps] = useState<AddRuleWizardModalProps>();

  const onEditRule = (props: EditRuleModalProps) => {
    setEditRuleProps({ ...props });
    onEditRuleOpen();
  };

  const onAddRule = (props: AddRuleWizardModalProps) => {
    setAddRuleProps({ ...props });
    onAddRuleOpen();
  };

  const value: IDashboardContext = {
    onEditRule,
    onAddRule,
  };

  return (
    <DashboardContext.Provider value={value}>
      <AddRuleWizardModal
        isOpen={isAddRuleOpen}
        onClose={onAddRuleClose}
        {...(addRuleProps || {})}
      />
      <EditRuleModal
        onClose={onEditRuleClose}
        isOpen={isEditRuleOpen}
        {...(editRuleProps || {})}
      />

      <Container>{children}</Container>
    </DashboardContext.Provider>
  );
}
