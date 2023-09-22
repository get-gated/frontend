import {
  Button,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Tooltip,
} from '@chakra-ui/react';
import {
  IoClipboardOutline as CopyIcon,
  IoLinkOutline as LinkIcon,
  IoCodeSlashOutline as CodeIcon,
} from 'react-icons/io5';
import { useCopyToClipboard } from '@gated/app/hooks';
import { useState } from 'react';

export function CopyInput({
  value,
  label,
  type = 'link',
}: {
  value: string;
  label?: string;
  type?: 'link' | 'code';
}) {
  const [, copy] = useCopyToClipboard();
  const [showCopied, setShowCopied] = useState(false);
  const onCopy = () => {
    copy(value);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 3000);
  };

  const as = type === 'link' ? LinkIcon : CodeIcon;
  const word = type === 'link' ? 'Link' : 'Code';
  return (
    <>
      {label && <FormLabel>{label}</FormLabel>}
      <InputGroup>
        <InputLeftAddon>
          <Icon as={as} />
        </InputLeftAddon>
        <Input value={value} outline="none"></Input>
        <InputRightElement>
          <Tooltip label={`${word} copied to clipboard!`} isOpen={showCopied}>
            <Button
              variant="ghost"
              borderRadius="md"
              colorScheme="secondary"
              onClick={onCopy}
            >
              <Icon as={CopyIcon} />
            </Button>
          </Tooltip>
        </InputRightElement>
      </InputGroup>
    </>
  );
}
