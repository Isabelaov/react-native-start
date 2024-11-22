import { useEffect, useState } from 'react';
import { Contact } from '../interfaces';
import { Alert } from 'react-native';
import { apiService } from '../services/api';

export default function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const load = async () => {
    try {
      const res = await apiService.get<Contact[]>('contacts', {});
      setContacts(res);
    } catch (error) {
      console.error('Load contacts error:', error);
    }
  };

  const createUpdate = async (contact: Contact) => {
    if (contact.id) {
      await apiService.patch<Contact>(`contacts/${contact.id}`, {
        contact,
      });
    } else {
      await apiService.post<Contact>('contacts', {
        contact,
      });
    }

    await load();
  };

  const deleteContact = (id: string) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await apiService.delete<Contact>(`contacts/${id}`);
            await load();
          },
        },
      ],
    );
  };

  useEffect(() => {
    load();
  }, []);

  return {
    contacts,
    load,
    createUpdate,
    deleteContact,
  };
}
