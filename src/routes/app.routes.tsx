import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import { Home } from '../screens/Home';
import { NewOrder } from '../screens/NewOrder';
import { OrderDetails } from '../screens/OrderDetails';

const { Navigator, Screen } = createNativeStackNavigator();

export const AppRoutes = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="newOrder" component={NewOrder} />
      <Screen name="orderDetails" component={OrderDetails} />
    </Navigator>
  );
};
