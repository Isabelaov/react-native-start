import { User } from '../interfaces/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { apiService } from '../services/api';

export const useAuth = (setLoading?: (loading: boolean) => void) => {
  const register = async ({ ...user }: User) => {
    if (setLoading) setLoading(true);
    try {
      const { email, name, password } = user;
      await apiService.post<User>(`auth/register`, {
        email,
        user,
        name,
        password,
      });
    } catch (error: any) {
      Alert.alert('Error in register:', String(error));
    } finally {
      if (setLoading) setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await apiService.post<{ accessToken: string }>('auth/login', {
        email,
        password,
      });

      const token = res.accessToken;

      await AsyncStorage.setItem('AuthToken', token);
      return true;
    } catch (error: any) {
      Alert.alert('Error in login:', String(error));
    } finally {
      if (setLoading) setLoading(false);
      return false;
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
