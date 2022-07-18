import React from 'react';
import { Text, View } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import { theme } from './src/styles/theme';

export const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <View>
        <Text>Hello World</Text>
      </View>
    </NativeBaseProvider>
  );
};
