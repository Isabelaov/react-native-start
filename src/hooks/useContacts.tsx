import { useEffect, useState } from 'react';
import { Contact, Picture } from '../interfaces';
import { Alert } from 'react-native';
import { apiService } from '../services/api';

export default function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const load = async () => {
    try {
      const res = await apiService.get<Contact[]>('contacts');
      setContacts(res);
    } catch (error) {
      console.error('Load contacts error:', error);
    }
  };

  const createUpdate = async (contact: Contact, file?: Picture) => {
    try {
      const data: { [key: string]: any } = {
        file,
        ...contact,
      };

      const formData = new FormData();

      Object.keys(data).forEach(key => {
        const value = data[key];

        if (value != undefined && key != 'id')
          formData.append(key, data[key].toString());
      });

      if (contact.id) {
        await apiService.patch<Contact>(`contacts/${contact.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        console.log({ contact });

        await apiService.post<Contact>('contacts', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      await load();
    } catch (error) {
      console.error(error);
    }
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
