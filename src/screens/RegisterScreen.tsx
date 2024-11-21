import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, Text, View } from 'react-native'
import { RootStackParams } from '../interfaces'
import { Button, Input } from '../components';
import { FormStyles } from '../assets/styles'
import { useAuth } from '../hooks'

type NavigationProp = NativeStackNavigationProp<RootStackParams, 'UserToHandle'>

export const RegisterScreen = ({ navigation, }: { navigation: NavigationProp; }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register } = useAuth()

  const handleRegister = async () => {
    if(!name || !email || !password){
      Alert.alert('All fields are required')
      return;
    }

    await register({name, email, password})
    navigation.navigate('LogIn')
  }
  
  return (
    <View style={ FormStyles.container }>
      <Text style={ FormStyles.title }>Register</Text>
      <Input 
      onChangeText={ setName } 
      placeholder='Name'
      />
      
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

      <Button
        onPress={ handleRegister }
        buttonText={
          <Text style={ FormStyles.buttonText }>Register</Text>
        }>
      </Button>

    </View>
  )
}