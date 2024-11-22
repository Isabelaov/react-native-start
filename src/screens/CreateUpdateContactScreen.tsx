import 'react-native-get-random-values';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { v4 as uuid } from 'uuid';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Contact, RootStackParams } from '../interfaces';
import useContacts from '../hooks/useContacts';
import usePicture from '../hooks/usePicture';
import { useLocation } from '../hooks/useLocation';
import { ContainersBySide, FormStyles } from '../assets/styles';
import { Button, Input } from '../components';

type Props = NativeStackScreenProps<RootStackParams, 'ContactToHandle'>;

export const CreateUpdateContactScreen = ({ route, navigation }: Props) => {
  const { createUpdate } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const { setPicture, pickPicture, takePicture, picture } = usePicture();
  const { location, pickLocation } = useLocation();
  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (route.params?.id && !hasRunOnce.current) {
      const contact = route.params.contact;

      if (contact) {
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email || '');
        setPicture(contact.picture || undefined);

        hasRunOnce.current = true;
      }
    }
  }, [route.params?.id, route.params?.contact, setPicture]);

  const save = async () => {
    if (!name || (!phone && !email)) return;

    const contact: Contact = {
      name,
      phone,
      email,
      picture,
    };

    if (route.params?.id) {
      contact.id = route.params?.id;
    }

    console.log({ contact });

    await createUpdate(contact);

    navigation.navigate('ContactList', { contact });
  };

  return (
    <ScrollView>
      <View style={FormStyles.container}>
        <View style={FormStyles.pictureContainer}>
          {picture ? (
            <Image source={{ uri: picture }} style={FormStyles.profilePic} />
          ) : (
            <View style={FormStyles.placeholder}>
              <Text style={FormStyles.defaultPic}>{name ? name[0] : ' '}</Text>
            </View>
          )}
        </View>

        <View style={ContainersBySide.mainContainer}>
          <Button
            onPress={pickPicture}
            buttonText={<Text style={FormStyles.buttonText}>Gallery</Text>}
          />

          <Button
            onPress={takePicture}
            buttonText={<Text style={FormStyles.buttonText}>Take Photo</Text>}
          />
        </View>

        <View>
          <Input placeholder="Name" onChangeText={setName} />

          <Input placeholder="Phone Number" onChangeText={setPhone} />

          <Input placeholder="Email" onChangeText={setEmail} />
        </View>

        <View style={FormStyles.container}>
          <MapView
            style={FormStyles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location?.latitude || 6.2442,
              longitude: location?.longitude || -75.5812,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e: MapPressEvent) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              pickLocation(latitude, longitude);
            }}>
            {location && <Marker coordinate={location} />}
          </MapView>

          <TouchableOpacity style={FormStyles.button} onPress={save}>
            <Text style={FormStyles.buttonText}>Save Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
