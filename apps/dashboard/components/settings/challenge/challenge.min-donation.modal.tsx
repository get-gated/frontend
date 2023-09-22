import React, { useRef } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { NumberInputControl } from 'formik-chakra-ui';
import { formatCurrencyUtil } from '@gated/utils';
import { InfoTooltip } from '@gated/ui/components';
import { SettingsModal } from '@components/settings-modal';
import { Box } from '@chakra-ui/react';

interface IMinDonationModal {
  defaultMinDonation: number;
  isOpen: boolean;
  onClose: () => void;
  onSave: (minDonation: number) => Promise<void>;
  loading: boolean;
}

interface FormValues {
  minimumDonation: number;
}

export const MinDonationModal = ({
  defaultMinDonation,
  isOpen,
  onClose,
  onSave,
  loading,
}: IMinDonationModal) => {
  const save = async (values: FormValues): Promise<void> => {
    await onSave(values.minimumDonation * 100);
    onClose();
  };

  const content = useRef<HTMLDivElement>(null);

  const yupSchema: { [key in keyof FormValues]: any } = {
    minimumDonation: Yup.number()
      .max(10, 'Minimum donation can not be more than $10.00')
      .min(2, 'Minimum donation can not be less than $2.00')
      .required('A minimum donation is required.'),
  };

  const initialValues: FormValues = {
    minimumDonation: defaultMinDonation / 100,
  };

  const formatNumber = (value) => {
    let newValue = Number(value);
    newValue = Math.round(newValue * 100);
    newValue = newValue - (newValue % 50);
    return formatCurrencyUtil(newValue);
  };

  const infoMessage = (
    <>
      To increase your donation above $10, contact us at{' '}
      <a href="mailto:support@gated.com">support@gated.com</a>.
    </>
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object(yupSchema)}
      onSubmit={save}
    >
      {({ isValid, values, submitForm }) => (
        <SettingsModal
          isOpen={isOpen}
          onClose={onClose}
          loading={loading}
          isValid={isValid}
          onSave={submitForm}
          header="Update your minimum donation"
          subheader="Choose a minimum donation amount for unknown senders to reach your inbox. There is no maximum and senders can elect to donate any amount above your minimum."
        >
          <Box ref={content}>
            <NumberInputControl
              name="minimumDonation"
              /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
              // @ts-ignore
              label={
                <>
                  Minimum Donation Amount
                  <InfoTooltip message={infoMessage} />
                </>
              }
              numberInputProps={{
                step: 0.5,
                precision: 2,
                min: 2,
                max: 10,
                value: formatNumber(values.minimumDonation),
              }}
            />
          </Box>
        </SettingsModal>
      )}
    </Formik>
  );
};
