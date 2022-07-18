import { Center, Spinner } from 'native-base';

export const Loading = () => {
  return (
    <Center flex={1} bg="gray.700">
      <Spinner color="emerald.500" size="lg" />
    </Center>
  );
};
