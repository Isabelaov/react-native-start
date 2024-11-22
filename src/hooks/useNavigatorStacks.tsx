import React, { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParams } from '../interfaces';
import { LogInScreen } from '../screens/LogInScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { ContactListScreen } from '../screens/ContactListScreen';
import { CreateUpdateContactScreen } from '../screens/CreateUpdateContactScreen';
import { ContactScreen } from '../screens/ContactScreen';
import { LogOutButton } from '../components';

export const useNavigatorStacks = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();
  const { getAuthToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const validateToken = async () => {
    if (await getAuthToken()) setIsAuthenticated(true);
  };

  useEffect(() => {
    validateToken();
  }, []);

  const screens = [
    () => (
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
    ),
    () => (
      <Stack.Screen
        name="UserToHandle"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    ),
    () => (
      <Stack.Screen
        name="ContactList"
        component={ContactListScreen}
        options={{
          title: 'Contact List',
          headerTitleAlign: 'center',
          // headerRight: () => <SearchBar/>
          headerLeft: () => <LogOutButton />,
        }}
      />
    ),
    () => (
      <Stack.Screen
        name="ContactToHandle"
        component={CreateUpdateContactScreen}
        options={{ title: 'Create or Edit Contact' }}
      />
    ),
    () => (
      <Stack.Screen
        name="ContactView"
        component={ContactScreen}
        options={{ title: 'Contact Details' }}
      />
    ),
  ];

  const loadScreens = () => {
    return screens.map((Screen, index) => (
      <React.Fragment key={index}>{Screen()}</React.Fragment>
    ));
  };

  const UnauthenticatedStack = () => (
    <Stack.Navigator initialRouteName="LogIn">{loadScreens()}</Stack.Navigator>
  );

  const AuthenticatedStack = () => (
    <Stack.Navigator initialRouteName="ContactList">
      {loadScreens()}
    </Stack.Navigator>
  );

  return { isAuthenticated, UnauthenticatedStack, AuthenticatedStack };
};
