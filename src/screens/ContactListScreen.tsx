import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Contact } from '../interfaces/contact'
import { RootStackParams } from '../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'

type ContactListNavigationProp = NativeStackNavigationProp<RootStackParams, 'ContactList'>
type ContactListRouteProp = RouteProp<RootStackParams, 'ContactList'>

const STORAGE_KEY = '@contacts'

const defaultContacts = [
  {
    id: '0',
    name: 'test 0',
    phone: '123456',
    email: 'uwu'
  },
  {
    id: '1',
    name: 'test 1',
    phone: '123456',
    email: 'uwu'
  }
]

export const ContactListScreen = () => {
  const navigation = useNavigation<ContactListNavigationProp>()
  const route = useRoute<ContactListRouteProp>()
  

  const [contacts, setContacts] = useState<Contact[]>([])

  useEffect(() => {
    setContacts(defaultContacts)
      const load = async ()=>{
          try {
            const storedContacts = await AsyncStorage.getItem(STORAGE_KEY);

            if(storedContacts) {
              setContacts(JSON.parse(storedContacts))
            } 
          } catch (error) {
            console.error('Load contacts error:', error)
          }
      }

      load();
  }, [])

  const save = async(contacts: Contact[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))

    } catch (error) {
      console.error('Save contacts error:', error)
    }
  }

  useEffect(() => {
    if(route.params?.contact) {
      const newContact = route.params.contact;

      setContacts((prev) => {
        const contactExists = prev.some((c) => c.id === newContact.id)
        const updated = contactExists 
        ? prev.map((c) => c.id === newContact.id ? newContact : c) 
        : [...prev, newContact]

        save(updated)
        return updated
      })
    }

  }, [route.params?.contact])

  const deleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact', 
      'Are you sure you want to delete this contact?', 
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts((previous) => {
              const updated = previous.filter((c) => c.id !== id)
              save(updated)
              return updated
            })
          }
        }
      ]
    )
  }

  const render = ({ item }: { item: Contact }) => (
    <View style={ styles.contact }>
      <Text style={ styles.text }>{ item.name }</Text>
      <Text style={ styles.text }> { item.phone } </Text>

      <TouchableOpacity style={ styles.itemButton }>
        <Text style={ styles.buttonText } 
        onPress={ () => navigation.navigate('ContactToHandle', {id: item.id, contact: item}) }
        >Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={ styles.itemButton } onPress={ () => deleteContact(item.id) }>
        <Text style={ styles.buttonText }>Delete</Text>
      </TouchableOpacity>
    </View>
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
    padding: 20
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    padding: 10,
  },
  text: {
    color: 'black',
    margin: 5,
    fontSize: 20,
  },
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
  }
})