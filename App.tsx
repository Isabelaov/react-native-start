/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {ContactListScreen} from './src/screens/ContactListScreen';
import {CreateUpdateContactScreen} from './src/screens/CreateUpdateContactScreen';
import { RootStackParams } from './src/interfaces';
import { ContactScreen } from './src/screens/ContactScreen';

const Stack = createNativeStackNavigator<RootStackParams>()

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='ContactList'>
        <Stack.Screen 
        name='ContactList' 
        component={ ContactListScreen } 
        options={ { title: 'Contact List', headerTitleAlign: 'center' } }
        />

        <Stack.Screen
          name="ContactToHandle"
          component={ CreateUpdateContactScreen }
          options={ { title: 'Create or Edit Contact' } }
        />

        <Stack.Screen 
        name="ContactView"
        component={ ContactScreen }
        options={ { title: 'Contact Details' } }
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
