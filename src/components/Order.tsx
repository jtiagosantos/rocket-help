import { FC } from 'react';
import {
  Box,
  Circle,
  HStack,
  Text,
  useTheme,
  VStack,
  Pressable,
  IPressableProps,
} from 'native-base';
import {
  ClockAfternoon,
  Hourglass,
  CircleWavyCheck,
} from 'phosphor-react-native';

//types
import { Order as OrderProps } from '../types/Order';

export const Order: FC<OrderProps & IPressableProps> = ({
  patrimony,
  status,
  when,
  ...rest
}) => {
  const { colors } = useTheme();

  const statusColor =
    status === 'opened' ? colors.secondary[700] : colors.green[300];

  return (
    <Pressable {...rest}>
      <HStack
        bg="gray.600"
        mb={4}
        alignItems="center"
        justifyContent="space-between"
        rounded="sm"
        overflow="hidden">
        <Box h="full" w={2} bg={statusColor} />

        <VStack flex={1} my={5} ml={5}>
          <Text color="white" fontSize="md" mb={1}>
            Patrimômio {patrimony}
          </Text>

          <HStack alignItems="center" space={1}>
            <ClockAfternoon size={15} color={colors.gray[300]} />
            <Text color="gray.200" fontSize="xs">
              {when}
            </Text>
          </HStack>
        </VStack>

        <Circle bg="gray.500" h={12} w={12} mr={5}>
          {status === 'closed' ? (
            <CircleWavyCheck size={24} color={statusColor} />
          ) : (
            <Hourglass size={24} color={statusColor} />
          )}
        </Circle>
      </HStack>
    </Pressable>
  );
};
