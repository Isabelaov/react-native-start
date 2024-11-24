import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { RootStackParams } from '../interfaces';
import { Alert, Text, View } from 'react-native';
import { ContainersBySide, FormStyles } from '../assets/styles';
import { Button, Input } from '../components';
import { useAuth } from '../hooks';
import { Formik } from 'formik';
import { Loading } from '../components/Loading';

type Props = NativeStackScreenProps<RootStackParams, 'LogIn'>;

export const LogInScreen = ({ navigation }: Props) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(setLoading);

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password too short')
      .required('Password is required'),
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('All fields are required');
      return;
    }

    if (await login(email, password)) navigation.navigate('ContactList', {});

    navigation.navigate('ContactList', {});
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}>
      {() => (
        <View style={FormStyles.container}>
          {loading ? (
            <Loading />
          ) : (
            <>
              <Text style={FormStyles.title}>Login</Text>

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

              <View style={ContainersBySide.mainContainer}>
                <Button
                  onPress={handleLogin}
                  buttonText={
                    <Text style={FormStyles.buttonText}>Login</Text>
                  }></Button>

                <Button
                  onPress={() => navigation.navigate('UserToHandle', {})}
                  buttonText={
                    <Text style={FormStyles.buttonText}>Register</Text>
                  }></Button>
              </View>
            </>
          )}
        </View>
      )}
    </Formik>
  );
};
