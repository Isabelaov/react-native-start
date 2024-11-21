/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useNavigatorStacks } from './src/hooks/useNavigatorStacks';

function App(): React.JSX.Element {
  const {isAuthenticated, UnauthenticatedStack, AuthenticatedStack} = useNavigatorStacks()
  return (
    <NavigationContainer>
      {
        isAuthenticated ? 
        <AuthenticatedStack/> : <UnauthenticatedStack/>
      }
    </NavigationContainer>
  );
}

export default App;
