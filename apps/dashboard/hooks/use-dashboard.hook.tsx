import React, { useContext } from 'react';
import { EditRuleModalProps } from '@components/allow-list/modals/edit-rule/edit-rule.modal';
import { AddRuleWizardModalProps } from '@components/allow-list/modals/add-rule-wizard';
import { noop } from 'lodash';

export interface IDashboardContext {
  onEditRule: (props: EditRuleModalProps) => any;
  onAddRule: (props: AddRuleWizardModalProps) => void;
}

export const DashboardContext = React.createContext<IDashboardContext>({
  onEditRule: noop,
  onAddRule: noop,
});
export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw Error('Hook can only be used in dashboard pages');
  } else {
    return context;
  }
};
