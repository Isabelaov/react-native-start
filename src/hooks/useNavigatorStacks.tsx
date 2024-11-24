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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loading } from '../components/Loading';
import { OnboardingScreen } from '../screens/OnboardingScreen';

export const useNavigatorStacks = () => {
  const Stack = createNativeStackNavigator<RootStackParams>();
  const { getAuthToken } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const validateToken = async () => {
    if (await getAuthToken()) setIsAuthenticated(true);
  };

  useEffect(() => {
    validateToken();
    const checkOnboarding = async () => {
      try {
        await AsyncStorage.getItem('onboardingSeen');
        setShowOnboarding(true);
      } catch (error) {
        console.error('Error checking onboarding state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkOnboarding();
  }, []);

  const screens = [
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
    <Stack.Navigator initialRouteName={showOnboarding ? 'Onboarding' : 'LogIn'}>
      {loadScreens()}
      <Stack.Screen
        name="LogIn"
        component={LogInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserToHandle"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      {showOnboarding && (
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{
            headerShown: false,
          }}
          listeners={{
            focus: async () => {
              await AsyncStorage.setItem('onboardingSeen', 'true');
            },
          }}
        />
      )}
    </Stack.Navigator>
  );

  const AuthenticatedStack = () => (
    <Stack.Navigator initialRouteName="ContactList">
      {loadScreens()}
    </Stack.Navigator>
  );

  console.log({ isAuthenticated });

  return {
    isAuthenticated,
    UnauthenticatedStack: isLoading ? () => <Loading /> : UnauthenticatedStack,
    AuthenticatedStack: isLoading ? () => <Loading /> : AuthenticatedStack,
  };
};
