import { useEffect, useState } from 'react'
import { Contact } from '../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

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

export default function useContacts(route?: any) {
    const [contacts, setContacts] = useState<Contact[]>([])

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

    const save = async(contacts: Contact[]) => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
    
        } catch (error) {
          console.error('Save contacts error:', error)
        }
    }

    const createUpdate = (contact: Contact) => {
        setContacts((prev) => {
            const contactExists = prev.some((c) => c.id === contact.id)
            const updated = contactExists 
            ? prev.map((c) => c.id === contact.id ? contact : c) 
            : [...prev, contact]
    
            save(updated)
            return updated
          })
    }

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

    useEffect(() => {
        if(route?.params?.id) {
            deleteContact(route.params.id)
        }

        }, [route?.params?.id])

        useEffect(() => {
        setContacts(defaultContacts)
            load();
        }, [])

    return {
    contacts,
    load,
    createUpdate,
    deleteContact,
    };
}