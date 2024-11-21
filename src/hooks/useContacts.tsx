import { useEffect, useState } from 'react'
import { Contact } from '../interfaces'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { useAuth } from '.'
import axios from 'axios'
import {BACKEND_URL} from '@env'
const STORAGE_KEY = '@contacts'

export default function useContacts() {
    const [contacts, setContacts] = useState<Contact[]>([])

    const load = async () => {
        try {
          const token = await  useAuth().getAuthToken()
          const res = await axios.get(`${BACKEND_URL}/contacts`, {headers: { Authorization: `Bearer ${token}` }})

          setContacts(res.data)
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

    const createUpdate = async (contact: Contact) => {
        setContacts((prev: Contact[]) => {
            const contactExists = prev.some((c) => c.id === contact.id)
            
            const updated = contactExists 
            ? prev.map((c) => c.id === contact.id ? contact : c) 
            : [...prev, contact]
    
            save(updated);
            
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
        load();
    }, [])

        

    return {
    contacts,
    load,
    createUpdate,
    deleteContact,
    };
}