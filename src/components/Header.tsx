import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Heading,
  HStack,
  IconButton,
  useTheme,
  StyledProps,
} from 'native-base';
import { CaretLeft } from 'phosphor-react-native';

interface HeaderProps extends StyledProps {
  title: string;
}

export const Header: FC<HeaderProps> = ({ title, ...rest }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const handleGoBask = () => {
    navigation.goBack();
  };

  return (
    <HStack
      w="full"
      justifyContent="space-between"
      alignItems="center"
      bg="gray.600"
      pb={6}
      pt={12}
      {...rest}>
      <IconButton
        icon={<CaretLeft color={colors.gray[200]} size={24} />}
        onPress={handleGoBask}
      />
      <Heading
        flex={1}
        color="gray.100"
        textAlign="center"
        fontSize="lg"
        ml={-6}>
        {title}
      </Heading>
    </HStack>
  );
};
