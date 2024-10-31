import 'react-native-get-random-values';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { v4 as uuid } from 'uuid'
import { RootStackParams } from '../interfaces'
import { ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { requestCameraPermission, requestGalleryPermission } from '../utils/permissions';

type Props = NativeStackScreenProps<RootStackParams, 'ContactToHandle'>


export const CreateUpdateContactScreen: React.FC<Props> = ({ route, navigation }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [picture, setPicture] = useState<string | undefined>(undefined)

    useEffect(() => {
        if(route.params?.id) {
            const contact = route.params.contact

            if (contact) {
                setName(contact.name);
                setPhone(contact.phone);
                setEmail(contact.email || '');
                setPicture(contact.picture || undefined)
            }
        }
    }, [route.params?.id, route.params?.contact])

    const save = () => {
      if (!name || (!phone && !email)) return;

      const contact = {
          id: route.params?.id || uuid(),
          name,
          phone,
          email,
      };
  
      navigation.navigate('ContactList', { contact });
    }

    const pickPicture = async () => {
      if(await requestGalleryPermission()){
        launchImageLibrary({ mediaType: 'photo' }, (res: ImagePickerResponse) => {
          setUri(res)
        })
      }
    }

    const takePicture = async () => {
      if(await requestCameraPermission()) {
        const res: ImagePickerResponse  = await launchCamera({ mediaType: 'photo', saveToPhotos: true })
        setUri(res)
      }
    }

    const setUri = (res: ImagePickerResponse) => {
      if (res.assets && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setPicture(uri);
      }
    }

  return (
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

      <TouchableOpacity 
      style={ styles.button }
      onPress={save}
      >
        <Text style={ styles.buttonText }>Save Contact</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
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
  }
})