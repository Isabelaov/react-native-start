import 'react-native-get-random-values';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import { Contact, RootStackParams } from '../interfaces';
import useContacts from '../hooks/useContacts';
import usePicture from '../hooks/usePicture';
import { useLocation } from '../hooks/useLocation';
import { CheckBoxStyles, ContainersBySide, FormStyles } from '../assets/styles';
import { Button, Input, MyCheckBox } from '../components';

type Props = NativeStackScreenProps<RootStackParams, 'ContactToHandle'>;

export const CreateUpdateContactScreen = ({ route, navigation }: Props) => {
  const { createUpdate } = useContacts();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [tag, setTag] = useState<string | null>('');

  const { pickPicture, takePicture, url, setUrl, picture } = usePicture();
  const { latitude, longitude, pickLocation } = useLocation();

  const hasRunOnce = useRef(false);

  useEffect(() => {
    if (route.params?.id && !hasRunOnce.current) {
      const contact = route.params.contact;

      if (contact) {
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email || '');
        setUrl(contact.profilePicture || null);
        setTag(contact.contactType || null);

        if (contact.latitude && contact.longitude) {
          pickLocation(contact.latitude, contact.longitude);
        }

        hasRunOnce.current = true;
      }
    }
  }, [route.params]);

  const save = async () => {
    if (!name || (!phone && !email)) return;

    const contact: Contact = {
      name,
      phone,
      email,
      ...(route.params?.id && { id: route.params.id }),
      ...(url && { profilePicture: url }),
      ...(tag && { contactType: tag }),
      ...(latitude && longitude && { latitude, longitude }),
    };

    console.log({ contact });

    await createUpdate(contact, picture || undefined);

    navigation.navigate('ContactList', { contact });
  };

  return (
    <ScrollView>
      <View style={FormStyles.container}>
        <View style={FormStyles.pictureContainer}>
          {url ? (
            <Image source={{ uri: url }} style={FormStyles.profilePic} />
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

        <View style={CheckBoxStyles.container}>
          <Text style={CheckBoxStyles.title}>Tag</Text>

          <View style={ContainersBySide.mainContainer}>
            <MyCheckBox
              selectedOption={tag}
              setSelectedOption={setTag}
              option="Client"
            />

            <MyCheckBox
              selectedOption={tag}
              setSelectedOption={setTag}
              option="Employee"
            />
          </View>
        </View>

        <View style={FormStyles.container}>
          <MapView
            style={FormStyles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: latitude || 6.2442,
              longitude: longitude || -75.5812,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            onPress={(e: MapPressEvent) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              pickLocation(latitude, longitude);
            }}>
            {latitude && longitude && (
              <Marker coordinate={{ latitude, longitude }} />
            )}
          </MapView>

          <TouchableOpacity style={FormStyles.button} onPress={save}>
            <Text style={FormStyles.buttonText}>Save Contact</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
