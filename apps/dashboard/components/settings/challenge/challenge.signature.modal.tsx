import React from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { InputControl } from 'formik-chakra-ui';
import { SettingsModal } from '@components/settings-modal';

interface ISignatureEditModal {
  defaultSignature: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (signature: string) => Promise<void>;
  loading: boolean;
}

interface FormValues {
  signature: string;
}

export const SignatureEditModal = ({
  defaultSignature,
  isOpen,
  onClose,
  onSave,
  loading,
}: ISignatureEditModal) => {
  const save = async (values: FormValues) => {
    await onSave(values.signature);
    onClose();
  };

  const yupSchema: { [key in keyof FormValues]: any } = {
    signature: Yup.string()
      .max(255, 'Must be 255 characters or less.')
      .required('A signature is required.'),
  };

  const initialValues: FormValues = {
    signature: defaultSignature,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(yupSchema)}
      onSubmit={save}
    >
      {({ isValid, submitForm }) => (
        <SettingsModal
          loading={loading}
          onSave={submitForm}
          isValid={isValid}
          isOpen={isOpen}
          onClose={onClose}
          header="Update your challenge signature"
          subheader="The signature to be used when signing off challenge emails
                    Gated sends on your behalf."
        >
          <InputControl name="signature" label="Signature" />
        </SettingsModal>
      )}
    </Formik>
  );
};
