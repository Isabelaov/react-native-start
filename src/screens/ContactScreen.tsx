import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { RootStackParams } from '../interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useContacts from '../hooks/useContacts';

type Props = NativeStackScreenProps<RootStackParams, 'ContactView'>;

export const ContactScreen =  ({ route, navigation }: Props) => {
    const {deleteContact} = useContacts()
    const { contact } = route.params

  return (
    <View>
        <View>
      {contact.picture ? (
          <Image source={ { uri: contact.picture } } style={ styles.picture } />
        ) : (
          <View style={ styles.placeholder }>
            <Text style={ styles.placeholderText }>{ contact.name[0] }</Text>
          </View>
        )}
        <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.text}>📞 {contact.phone}</Text>
      <Text style={styles.text}>✉️ {contact.email || 'no email'}</Text>
      </View>


    <View style={ styles.buttonsContainer }>
      <TouchableOpacity style={ styles.itemButton }>
        <Text style={ styles.buttonText } 
        onPress={ () => navigation.navigate('ContactToHandle', { id: contact.id, contact: contact }) }
        >Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={ styles.itemButton } onPress={ () => deleteContact(contact.id) }>
        <Text style={ styles.buttonText }>Delete</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    itemButton: {
        borderRadius: 10,
        color: 'white',
        backgroundColor: 'green',
        marginHorizontal: 5,
        padding: 5
    },
    itemButtonText: {
        margin: 5,
        fontSize: 5
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center'
    },
    picture: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    },
    placeholder: {
        width: 70,
        height: 70,
        borderRadius: 25,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    placeholderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'black',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',

    }
})