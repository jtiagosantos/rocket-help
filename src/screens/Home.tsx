import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  VStack,
  HStack,
  IconButton,
  useTheme,
  Text,
  Heading,
  FlatList,
  Center,
} from 'native-base';
import { SignOut, ChatTeardropText } from 'phosphor-react-native';

//components
import { Filter } from '../components/Filter';
import { Order } from '../components/Order';
import { Button } from '../components/Button';
import { Loading } from '../components/Loading';

//utils
import { firestoreDateFormat } from '../utils/firestoreDateFormat';

//types
import * as T from '../types/Order';

//images
import Logo from '../assets/logo_secondary.svg';

export const Home = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [selectedStatus, setSelectedStatus] = useState<'opened' | 'closed'>(
    'opened',
  );
  const [orders, setOrders] = useState<T.Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleNewOrder = () => {
    navigation.navigate('newOrder');
  };

  const handleOpenOrderDetails = (orderId: string) => {
    navigation.navigate('orderDetails', { orderId });
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      return Alert.alert('Sair', 'Não foi possível sair');
    }
  };

  useEffect(() => {
    setIsLoading(true);

    const subscription = firestore()
      .collection('orders')
      .where('status', '==', selectedStatus)
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => {
          const { patrimony, description, status, created_at } = doc.data();

          return {
            id: doc.id,
            patrimony,
            description,
            status,
            when: firestoreDateFormat(created_at),
          };
        });

        setOrders(data);
        setIsLoading(false);
      });

    return subscription;
  }, [selectedStatus]);

  return (
    <VStack flex={1} pb={6} bg="gray.700">
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        bg="gray.600"
        pt={12}
        pb={5}
        px={6}>
        <Logo />
        <IconButton
          icon={<SignOut size={26} color={colors.gray[300]} />}
          onPress={handleSignOut}
        />
      </HStack>

      <VStack flex={1} px={6}>
        <HStack
          w="full"
          mt={8}
          mb={4}
          justifyContent="space-between"
          alignItems="center">
          <Heading color="gray.100">Solicitações</Heading>
          <Text color="gray.200">{orders.length}</Text>
        </HStack>

        <HStack space={3} mb={8}>
          <Filter
            type="opened"
            title="em andamento"
            onPress={() => setSelectedStatus('opened')}
            isActive={selectedStatus === 'opened'}
          />
          <Filter
            type="closed"
            title="finalizados"
            onPress={() => setSelectedStatus('closed')}
            isActive={selectedStatus === 'closed'}
          />
        </HStack>

        {isLoading ? (
          <Loading />
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Order
                {...item}
                onPress={() => handleOpenOrderDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
            ListEmptyComponent={() => (
              <Center>
                <ChatTeardropText color={colors.gray[300]} size={40} />
                <Text color="gray.300" fontSize="xl" mt={6} textAlign="center">
                  Você ainda não possui {'\n'} solicitações{' '}
                  {selectedStatus === 'opened' ? 'em andamento' : 'finalizadas'}
                </Text>
              </Center>
            )}
          />
        )}

        <Button title="Nova solicitação" onPress={handleNewOrder} />
      </VStack>
    </VStack>
  );
};
