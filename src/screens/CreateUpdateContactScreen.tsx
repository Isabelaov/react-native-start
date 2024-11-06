import 'react-native-get-random-values';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { v4 as uuid } from 'uuid'
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { RootStackParams } from '../interfaces'
import useContacts from '../hooks/useContacts';
import usePicture from '../hooks/usePicture';
import { useLocation } from '../hooks/useLocation';
import {GOOGLE_MAPS_API_KEY} from '@env'

type Props = NativeStackScreenProps<RootStackParams, 'ContactToHandle'>
const { height } = Dimensions.get('window');

export const CreateUpdateContactScreen: React.FC<Props> = ({ route, navigation }) => {
  console.log({GOOGLE_MAPS_API_KEY});
  
  const { createUpdate } = useContacts()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [tag, setTag] = useState<string | undefined>(undefined)

    const { setPicture, pickPicture, takePicture, picture } = usePicture()
    const { location, pickLocation } = useLocation()

    useEffect(() => {
        if(route.params?.id) {
            const contact = route.params.contact

            if (contact) {
                setName(contact.name);
                setPhone(contact.phone);
                setEmail(contact.email || '');
                setPicture(contact.picture || undefined)
                setTag(contact.tag || 'client')

                if(contact.location) {
                  pickLocation(contact.location.latitude, contact.location.longitude)
                }
            }
        }
    }, [route.params, pickLocation, setTag, setPicture])

    const save = async () => {
      if (!name || (!phone && !email)) return;

      const contact = {
          id: route.params?.id || uuid(),
          name,
          phone,
          email,
          tag,
          location: location ?? undefined
      };
      
      await createUpdate(contact)
  
      navigation.navigate('ContactList', { contact });
    }    

  return (
    <ScrollView>
      <View style={ styles.container }>

      <View style={ styles.pictureContainer }>
      <TouchableOpacity onPress={ pickPicture }>
          {picture ? (
            <Image source={ { uri:  picture} } style={styles.profilePic} />
          ) : (
            <View style={ styles.placeholder }>
              <Text style={ styles.defaultPic }>{ name ? name[0] : " " }</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={ styles.button } onPress={ takePicture }>
          <Text style={ styles.buttonText }>Take Photo</Text>
        </TouchableOpacity>
      </View>

      <View style={ styles.containerButtons }>
        <TouchableOpacity style={ styles.button } onPress={ () => setTag('client') }>
          <Text style={ styles.buttonText }>Client</Text>
        </TouchableOpacity>

        <TouchableOpacity style={ styles.button } onPress={ () => setTag('employee') }>
          <Text style={ styles.buttonText }>Employee</Text>
        </TouchableOpacity>
        </View>

      <View style={ styles.container }>
          
        <Text style={ styles.text }>Name</Text>
        <TextInput 
        value={name}
        onChangeText={setName}
        style={styles.textInput}
        />

        <Text style={ styles.text }>Phone Number</Text>
        <TextInput 
        value={phone}
        onChangeText={setPhone}
        style={styles.textInput}
        />

        <Text style={ styles.text }>Email</Text>
        <TextInput 
        value={email}
        onChangeText={setEmail}
        style={styles.textInput}
        />

        <MapView
          style={ styles.map }
            provider={ PROVIDER_GOOGLE }
            initialRegion={
              {
                latitude: location?.latitude || 6.2442,
                longitude: location?.longitude || -75.5812,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }
            }
            onMapReady={ ()=> console.log('uwu')}
            onPress={
              (e: MapPressEvent) => {
                const { latitude, longitude } = e.nativeEvent.coordinate;
                pickLocation(latitude, longitude)
              }
            }
          >
            {location && <Marker coordinate={ location }/>}
        </MapView>

        <TouchableOpacity 
        style={ styles.button }
        onPress={save}
        >
          <Text style={ styles.buttonText }>Save Contact</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
    
    
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    height: 50,
    width: 300,
    borderRadius: 20,
    color: 'black'
  },
  text: {
    color: 'black',
    margin: 10,
    fontSize: 20
  },
  button: {
    color: 'black',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 10,
    width: 150,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  pictureContainer: {
    alignItems: 'center',
    margin: 10
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10
  },
  placeholder: { 
    width: 100, 
    height: 100, 
    borderRadius: 50, 
    backgroundColor: '#ccc', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20 
  },
  defaultPic: {
    fontSize: 50,
    color: 'black'
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row'
  },
  map: { 
    height: height * 0.5,
    width: 300,
    margin: 10,
    
  },
})