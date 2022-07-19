import { FC } from 'react';
import { Text, Button, IButtonProps, useTheme } from 'native-base';

interface FilterProps extends IButtonProps {
  title: string;
  isActive?: boolean;
  type: 'opened' | 'closed';
}

export const Filter: FC<FilterProps> = ({
  title,
  isActive = false,
  type,
  ...rest
}) => {
  const { colors } = useTheme();

  const colorType =
    type === 'opened' ? colors.secondary[700] : colors.green[300];

  return (
    <Button
      flex={1}
      size="sm"
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={colorType}
      bg="gray.600"
      {...rest}>
      <Text
        color={isActive ? colorType : 'gray.300'}
        fontSize="xs"
        textTransform="uppercase">
        {title}
      </Text>
    </Button>
  );
};
