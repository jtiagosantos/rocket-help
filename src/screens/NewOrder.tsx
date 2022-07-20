import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { VStack } from 'native-base';

//components
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const NewOrder = () => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(false);
  const [patrimony, setPatrimony] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateNewOrder = async () => {
    if (!patrimony || !description) {
      return Alert.alert(
        'Nova solicitação',
        'Todos os campos são obrigatórios',
      );
    }

    setIsLoading(true);

    try {
      await firestore().collection('orders').add({
        patrimony,
        description,
        status: 'opened',
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Nova solicitação', 'Solicitação registrada com sucesso');
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      return Alert.alert(
        'Nova solitação',
        'Não foi possível registrar a solicitação',
      );
    }
  };

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input
        placeholder="Número do patrimônio"
        mt={4}
        onChangeText={setPatrimony}
      />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        textAlignVertical="top"
        multiline
        onChangeText={setDescription}
      />

      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleCreateNewOrder}
        isLoading={isLoading}
      />
    </VStack>
  );
};
