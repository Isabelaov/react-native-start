import 'react-native-get-random-values';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { v4 as uuid } from 'uuid'
import { RootStackParams } from '../interfaces'

type Props = NativeStackScreenProps<RootStackParams, 'ContactToHandle'>

export const CreateUpdateContactScreen: React.FC<Props> = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if(route.params?.id) {
            const contact = route.params.contact

            if (contact) {
                setName(contact.name);
                setPhone(contact.phone);
                setEmail(contact.email || '');
            }
        }
    }, [route.params?.id, route.params?.contact])

    const save = () => {
      if (!name || (!phone && !email)) return;

      const contact = {
          id: route.params?.id || uuid(),
          name,
          phone,
          email,
      };
  
      navigation.navigate('ContactList', { contact });
    }

  return (
    <View style={ styles.container }>
      <Text style={ styles.text }>Name</Text>
      <TextInput 
      value={name}
      onChangeText={setName}
      style={styles.textInput}
      />

      <Text style={ styles.text }>Phone Number</Text>
      <TextInput 
      value={phone}
      onChangeText={setPhone}
      style={styles.textInput}
      />

      <Text style={ styles.text }>Email</Text>
      <TextInput 
      value={email}
      onChangeText={setEmail}
      style={styles.textInput}
      />

      <TouchableOpacity 
      style={ styles.button }
      onPress={save}
      >
        <Text style={ styles.buttonText }>Save Contact</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    height: 50,
    width: 300,
    borderRadius: 20,
  },
  text: {
    color: 'black',
    margin: 10,
    fontSize: 20
  },
  button: {
    color: 'black',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
    width: 150,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
})