import axios from 'axios';
import { User } from '../interfaces/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BACKEND_URL } from '@env';
import { Alert } from 'react-native';

export const useAuth = () => {
  const register = async ({ ...user }: User) => {
    try {
      const { email, name, password } = user;
      await axios.post(`${BACKEND_URL}/auth/register`, {
        email,
        user,
        name,
        password,
      });
    } catch (error: any) {
      Alert.alert('Error in register:', String(error));
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      const token = res.data.accessToken;      

      await AsyncStorage.setItem('AuthToken', token);
    } catch (error: any) {
      Alert.alert('Error in login:', String(error));
      console.log(error);
      
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('AuthToken');
  };

  const getAuthToken = async () => {
    return await AsyncStorage.getItem('AuthToken');
  };

  return { register, login, logout, getAuthToken };
};
