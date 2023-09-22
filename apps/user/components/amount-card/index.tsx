import { Center, Text, VStack } from '@chakra-ui/react';
import { formatCurrencyUtil } from '@gated/utils';

interface AmountCardProps {
  amountInCents: number;
  nonprofitName: string;
}

export const AmountCard = ({
  amountInCents,
  nonprofitName,
}: AmountCardProps) => (
  <Center
    borderWidth={3}
    borderColor="gray.100"
    borderRadius="xl"
    shadow="sm"
    textShadow="1px 1px 1px rgba(0,0,0,.2)"
    color="white"
    bgGradient="linear(to-r, teal.600, green.400)"
    bgSize="120%"
    bgPosition="left top"
    w={300}
    h={150}
    as={VStack}
    spacing={-2}
  >
    <Text fontWeight="bold" fontSize="5xl">
      {formatCurrencyUtil(amountInCents)}
    </Text>
    <Text>
      to <strong>{nonprofitName}</strong>
    </Text>
  </Center>
);
