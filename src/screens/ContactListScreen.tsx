import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Contact } from '../interfaces/contact';
import { RootStackParams } from '../interfaces';
import useContacts from '../hooks/useContacts';
import { SeparatorHorizontal } from '../assets/styles/SeparatorHorizontal.styles';
import { ButtonDown } from '../assets/styles/ButtonDown';
import { FormStyles } from '../assets/styles';
import { List } from '../assets/styles/List.styles';
import { Texts } from '../assets/styles/Texts.styles';

type ContactListNavigationProp = NativeStackNavigationProp<
  RootStackParams,
  'ContactList'
>;

export const ContactListScreen = () => {
  const navigation = useNavigation<ContactListNavigationProp>();
  const { contacts, load } = useContacts();

  useFocusEffect(
    React.useCallback(() => {
      load();
    }, []),
  );

  const render = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={List.item}
      onPress={() => navigation.navigate('ContactView', { contact: item })}>
      <View>
        {item.picture ? (
          <Image source={{ uri: item.picture }} style={List.picture} />
        ) : (
          <View style={List.placeholder}>
            <Text style={List.placeholderText}>{item.name[0]}</Text>
          </View>
        )}
      </View>

      <View>
        <Text style={Texts.text}>{item.name}</Text>
        <Text style={Texts.text}>{item.phone}</Text>
        <Text style={Texts.text}>{item.email || 'no email :3'}</Text>

        <View style={List.tag}>
          <Text style={List.tagText}>{item.tag ? item.tag : 'no tag'}</Text>
        </View>
      </View>

      <View style={SeparatorHorizontal.separator}></View>
    </TouchableOpacity>
  );

  return (
    <View style={FormStyles.container}>
      <FlatList
        data={contacts}
        keyExtractor={contact => contact.id || contact.phone}
        renderItem={render}
      />

      <TouchableOpacity
        style={ButtonDown.button}
        onPress={() =>
          navigation.navigate('ContactToHandle', { id: undefined })
        }>
        <Text style={FormStyles.buttonText}>Add Contact :3</Text>
      </TouchableOpacity>
    </View>
  );
};
