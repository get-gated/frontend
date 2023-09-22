import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Center, Text, useColorMode } from '@chakra-ui/react';
import { SettingsModal } from '@components/settings-modal';

const AvatarEdit = dynamic(() => import('react-avatar-edit'), { ssr: false });

interface IAvatarEditModal {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatar: string) => Promise<void>;
  loading: boolean;
}

export const AvatarEditModal = ({
  isOpen,
  onClose,
  onSave,
  loading,
}: IAvatarEditModal) => {
  const save = async () => {
    await onSave(preview as string);
    onClose();
  };

  const [preview, setPreview] = useState<string | null>();
  const [tooLarge, setTooLarge] = useState(false);

  const { colorMode } = useColorMode();

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 7168000) {
      setTooLarge(true);
      elem.target.value = '';
    }
    setTooLarge(false);
  };

  const avatarLabelStyle: React.CSSProperties = {
    fontSize: '1.25em',
    fontWeight: 600,
    cursor: 'pointer',
    lineHeight: '250px',
    display: 'inline-block',
    width: '100%',
    color: colorMode === 'dark' ? 'white' : 'black',
  };

  const avatarBorderStyle: React.CSSProperties = {
    border: '2px dashed rgb(151, 151, 151)',
    borderRadius: '8px',
    textAlign: 'center',
  };

  return (
    <SettingsModal
      isOpen={isOpen}
      onClose={onClose}
      loading={loading}
      onSave={save}
      isValid={Boolean(preview)}
      header="Update your photo"
      subheader="Your photo is used to personalize interactions with senders trying
              to reach your inbox."
    >
      <Center alignContent="center" color={'white'}>
        <AvatarEdit
          width={250}
          height={250}
          exportAsSquare
          exportSize={500}
          exportQuality={1}
          onCrop={(preview) => setPreview(preview)}
          onClose={() => setPreview(null)}
          onBeforeFileLoad={onBeforeFileLoad}
          labelStyle={avatarLabelStyle}
          borderStyle={avatarBorderStyle}
        />

        {tooLarge && (
          <Text color="red.500" fontSize="sm">
            Selected file is too large.
          </Text>
        )}
      </Center>
    </SettingsModal>
  );
};
