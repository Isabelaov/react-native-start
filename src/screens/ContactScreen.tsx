import { View, Text } from 'react-native'
import React from 'react'
import { RootStackParams } from '../interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<RootStackParams, 'ContactView'>;

export const ContactScreen =  () => {
  return (
    <View>
      <Text>ContactScreen</Text>
    </View>
  )
}