import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { RootStackParams } from '../interfaces';
import { Alert, Text, View } from 'react-native';
import { ContainersBySide, FormStyles } from '../assets/styles';
import { Button, Input } from '../components';
import { useAuth } from '../hooks';

type Props = NativeStackScreenProps<RootStackParams, 'LogIn'>;

export const LogInScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {
    if(!email || !password){
      Alert.alert('All fields are required')
      return;
    }

    await login(email, password)
    navigation.navigate('ContactList', {}) 
  }

  return (
    <View style={ FormStyles.container }>
      <Text style={ FormStyles.title }>Login</Text>

      <Input 
      keyboardType='email-address' 
      placeholder='Email'
      onChangeText={ setEmail }
      />

      <Input 
        placeholder='Password' 
        secureTextEntry 
        onChangeText={ setPassword }
      />

      <View style={ ContainersBySide.mainContainer }>
        <Button
          onPress={ handleLogin }
          buttonText={
            <Text style={ FormStyles.buttonText }>Login</Text>
          }>
        </Button>

        <Button
          onPress={ () => navigation.navigate('UserToHandle', {})
           }
          buttonText={
            <Text style={ FormStyles.buttonText }>Register</Text>
          }>
        </Button>
        
      </View>

    </View>
  );
  
}
