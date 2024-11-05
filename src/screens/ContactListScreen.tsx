import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Contact } from '../interfaces/contact'
import { RootStackParams } from '../interfaces'
import useContacts from '../hooks/useContacts'

type ContactListNavigationProp = NativeStackNavigationProp<RootStackParams, 'ContactList'>

export const ContactListScreen = () => {
  const navigation = useNavigation<ContactListNavigationProp>()
  const { contacts, load } = useContacts()

  useFocusEffect(
    React.useCallback(() => { load() }, [])
  )
  
  const render = ({ item }: { item: Contact }) => (
    <TouchableOpacity style={ styles.contact } onPress={ () => navigation.navigate('ContactView', { contact: item }) }>

      <View>
      {item.picture ? (
          <Image source={ { uri: item.picture } } style={ styles.picture } />
        ) : (
          <View style={ styles.placeholder }>
            <Text style={ styles.placeholderText }>{ item.name[0] }</Text>
          </View>
        )}
      </View>

      <View>
        <Text style={ styles.text }>{ item.name }</Text>
        <Text style={ styles.text }>{ item.phone }</Text>
        <Text style={ styles.text }>{ item.email || 'no email :3' }</Text>
      </View>

      <View style={ styles.tag }>
        <Text style={ styles.tagText }>{ item.tag ? item.tag : 'no tag'}</Text>
      </View>

    </TouchableOpacity>
    )

  return (
    <View style={ styles.container }>
      
      <FlatList 
      data={ contacts } 
      keyExtractor={ (contact) => contact.id }
      renderItem={ render }
      />
      <TouchableOpacity 
      style={ styles.button } 
      onPress={ ()  => navigation.navigate('ContactToHandle', {id: undefined})}>
        <Text style={ styles.buttonText }>Add Contact :3</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    color: 'black',
    backgroundColor: 'green',
    padding: 5,
    margin: 20,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  container: {
    padding: 20,
    flex: 1
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10
  },
  text: {
    color: 'black',
    margin: 5,
    fontSize: 20,
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
  tag: {
    backgroundColor: 'green',
    padding: 5,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 20,
    width: 80,
    textAlign: 'center',
  },
  tagText: {
    color: '#fff',
    fontSize: 15,
  }
})