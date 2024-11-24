import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Alert, Text, View } from 'react-native';
import { RootStackParams } from '../interfaces';
import { Button, Input } from '../components';
import { FormStyles } from '../assets/styles';
import { useAuth } from '../hooks';
import { Formik } from 'formik';

type NavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'UserToHandle'
>;

export const RegisterScreen = ({
  navigation,
}: {
  navigation: NavigationProp;
}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth(setLoading);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    await register({ name, email, password });
    navigation.navigate('LogIn');
  };

  const registerValidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password too short')
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={registerValidationSchema}
      onSubmit={handleRegister}>
      {() => (
        <View style={FormStyles.container}>
          <Text style={FormStyles.title}>Register</Text>
          <Input onChangeText={setName} placeholder="Name" />

          <Input
            keyboardType="email-address"
            placeholder="Email"
            onChangeText={setEmail}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={setPassword}
          />

          <Button
            onPress={handleRegister}
            buttonText={
              <Text style={FormStyles.buttonText}>Register</Text>
            }></Button>
        </View>
      )}
    </Formik>
  );
};
