import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { baseColors } from '../assets/colors/baseColors';
import { useAuth } from '../hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../interfaces';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParams>;

export const LogOutButton = () => {
  const navigation = useNavigation<NavigationProp>();
  const { logout } = useAuth();

  const handleButtonPress = async () => {
    try {
      await logout();

      navigation.navigate('LogIn');
    } catch (error) {
      Alert.alert('Error', 'Something went wrong!');
      console.error(error);
    }
  };

  return (
    <TouchableOpacity onPress={handleButtonPress}>
      <MaterialCommunityIcon
        name="exit-to-app"
        size={25}
        color={baseColors.primary}
      />
    </TouchableOpacity>
  );
};
