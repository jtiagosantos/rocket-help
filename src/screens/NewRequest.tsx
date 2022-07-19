import { VStack } from 'native-base';

//components
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

export const NewRequest = () => {
  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação" />

      <Input placeholder="Número do patrimônio" mt={4} />
      <Input
        placeholder="Descrição do problema"
        flex={1}
        mt={5}
        textAlignVertical="top"
        multiline
      />

      <Button title="Cadastrar" mt={5} />
    </VStack>
  );
};
