import { useRoute } from '@react-navigation/native';
import { VStack, Text } from 'native-base';

//components
import { Header } from '../components/Header';

interface OrderDetailsRouteParams {
  orderId: string;
}

export const OrderDetails = () => {
  const route = useRoute();

  const { orderId } = route.params as OrderDetailsRouteParams;

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <Text color="white">{orderId}</Text>
    </VStack>
  );
};
