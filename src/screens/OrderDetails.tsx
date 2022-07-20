import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { VStack, Text, useTheme, HStack, ScrollView, Box } from 'native-base';
import {
  CircleWavyCheck,
  Hourglass,
  DesktopTower,
  ClipboardText,
} from 'phosphor-react-native';

//components
import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { CardDetails } from '../components/CardDetails';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

//utils
import { firestoreDateFormat } from '../utils/firestoreDateFormat';

//types
import { Order } from '../types/Order';
import { OrderFirestore } from '../types/OrderFirestore';

interface OrderDetailsRouteParams {
  orderId: string;
}

interface OrderDetailsData extends Order {
  description: string;
  solution: string;
  closed: string;
}

export const OrderDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({} as OrderDetailsData);
  const [solution, setSolution] = useState('');

  const route = useRoute();
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { orderId } = route.params as OrderDetailsRouteParams;

  const handleCloseOrder = () => {
    if (!solution) {
      return Alert.alert(
        'Solicitação',
        'Informe a solução para encerrar a solicitação',
      );
    }

    firestore()
      .collection<OrderFirestore>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada');
        navigation.goBack();
      })
      .catch(() => {
        Alert.alert('Solicitação', 'Mão foi possível encerrar a solicitação');
      });
  };

  useEffect(() => {
    firestore()
      .collection<OrderFirestore>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const {
          patrimony,
          description,
          status,
          created_at,
          closed_at,
          solution,
        } = doc.data();

        const closed = closed_at ? firestoreDateFormat(closed_at) : null;

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          solution,
          when: firestoreDateFormat(created_at),
          closed,
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>

      <HStack bg="gray.500" justifyContent="center" p={4}>
        {order.status === 'closed' ? (
          <CircleWavyCheck size={22} color={colors.green[300]} />
        ) : (
          <Hourglass size={22} color={colors.secondary[700]} />
        )}

        <Text
          fontSize="sm"
          color={
            order.status === 'closed'
              ? colors.green[300]
              : colors.secondary[700]
          }
          ml={2}
          textTransform="uppercase">
          {order.status === 'closed' ? 'finalizada' : 'em andamento'}
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
        />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          description={order.solution}
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}>
          {order.status === 'opened' && (
            <Input
              placeholder="Descição da solução"
              onChangeText={setSolution}
              h={24}
              textAlignVertical="top"
              multiline
            />
          )}
        </CardDetails>
      </ScrollView>

      {order.status === 'opened' && (
        <Button title="Encerrar solicitação" m={5} onPress={handleCloseOrder} />
      )}
    </VStack>
  );
};
