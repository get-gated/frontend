import { BoxProps, Center, HStack, Text } from '@chakra-ui/react';

interface TypeAheadResultItemProps extends BoxProps {
  label: React.ReactNode | string;
  icon: React.ReactNode;
  onClick?: (any) => void;
}
export const TypeAheadResultItem = ({
  label,
  icon,
  onClick,
  ...rest
}: TypeAheadResultItemProps) => {
  return (
    <HStack
      w="full"
      {...rest}
      _hover={{ cursor: onClick ? 'pointer' : 'default' }}
      onClick={onClick}
    >
      <Center width="40px">{icon}</Center> <Text noOfLines={1}>{label}</Text>
    </HStack>
  );
};
