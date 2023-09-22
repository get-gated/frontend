import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { SettingsModal } from '@components/settings-modal';

interface IEmailEditModal {
  defaultEmail: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (emailAddress: string) => Promise<void>;
  loading: boolean;
}

interface FormValues {
  email: string;
}

export const EmailEditModal = ({
  defaultEmail,
  isOpen,
  onClose,
  onSave,
  loading,
}: IEmailEditModal) => {
  const save = async (values: FormValues) => {
    await onSave(values.email);
    onClose();
  };

  const yupSchema: { [key in keyof FormValues]: any } = {
    email: Yup.string()
      .email('Must be a valid email address.')
      .max(255, 'Must be 255 characters or less.')
      .required('Email address is required.'),
  };

  const initialValues: FormValues = {
    email: defaultEmail,
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
          isValid={isValid}
          onSave={submitForm}
          header="Update your email address"
        >
          <InputControl name="email" label="Email Address" />
        </SettingsModal>
      )}
    </Formik>
  );
};
