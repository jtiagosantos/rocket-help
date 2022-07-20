import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

//routes
import { AppRoutes } from './app.routes';

//screens
import { SignIn } from '../screens/SignIn';

//components
import { Loading } from '../components/Loading';

export const Routes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User>();

  useEffect(() => {
    const subscription = auth().onAuthStateChanged((response) => {
      setUser(response);
      setIsLoading(false);
    });

    return subscription;
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
};
