import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { SettingsModal } from '@components/settings-modal';

interface INameEditModal {
  defaultFirstName: string;
  defaultLastName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (firstName: string, lastName: string) => Promise<void>;
  loading: boolean;
}

interface FormValues {
  firstName: string;
  lastName: string;
}

export const NameEditModal = ({
  defaultFirstName,
  defaultLastName,
  isOpen,
  onClose,
  onSave,
  loading,
}: INameEditModal) => {
  const save = async (values: FormValues) => {
    await onSave(values.firstName, values.lastName);
    onClose();
  };

  const yupSchema: { [key in keyof FormValues]: any } = {
    firstName: Yup.string()
      .max(255, 'Must be 255 characters or less')
      .required('First name is required.'),
    lastName: Yup.string()
      .max(255, 'Must be 255 characters or less')
      .required('Last name is required.'),
  };

  const initialValues: FormValues = {
    firstName: defaultFirstName,
    lastName: defaultLastName,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(yupSchema)}
      onSubmit={save}
    >
      {({ isValid, submitForm }) => (
        <SettingsModal
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          onSave={submitForm}
          isValid={isValid}
          header="Update your name"
          subheader="Your name is used to personalize communications from Gated
                    as well as interactions with senders trying to reach your
                    inbox."
        >
          <InputControl name="firstName" label="First Name" />
          <InputControl name="lastName" label="Last Name" />
        </SettingsModal>
      )}
    </Formik>
  );
};
