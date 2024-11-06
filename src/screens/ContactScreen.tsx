import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { RootStackParams } from '../interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import useContacts from '../hooks/useContacts';
import MapView, { Marker } from 'react-native-maps';

type Props = NativeStackScreenProps<RootStackParams, 'ContactView'>;
const { height } = Dimensions.get('window');

export const ContactScreen =  ({ route, navigation }: Props) => {
    const { deleteContact } = useContacts()
    const { contact } = route.params    

  return (
    <ScrollView>
      <View style={ styles.container }>
      <View>
          { contact.picture ? (
              <Image source={ { uri: contact.picture } } style={ styles.picture } />
            ) : (
              <View style={ styles.placeholder }>
                <Text style={ styles.placeholderText }>{ contact.name[0] }</Text>
              </View>
            ) 
          }
      </View>

        <Text style={styles.name}>{ contact.name }</Text>
        <Text style={styles.text}>📞 { contact.phone }</Text>
        <Text style={styles.text}>✉️ { contact.email || 'no email' }</Text>
        <Text style={ styles.text }>{ contact.tag || 'no tag' }</Text>

        {contact.location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: contact.location.latitude,
            longitude: contact.location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          liteMode
        >
          <Marker coordinate={contact.location} />
        </MapView>
      )}

    <View style={ styles.buttonsContainer }>
      <TouchableOpacity style={ styles.itemButton }>
        <Text style={ styles.buttonText } 
        onPress={ () => navigation.navigate('ContactToHandle', { id: contact.id, contact: contact }) }
        >Edit</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={ styles.itemButton } onPress={ () => deleteContact(contact.id) }>
        <Text style={ styles.buttonText }>Delete</Text>
      </TouchableOpacity>
      </View>

      </View>
        
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1
  },
  itemButton: {
    borderRadius: 10,
    color: 'white',
    backgroundColor: 'green',
    marginHorizontal: 5,
    padding: 5,
    margin: 10,
    width: 100
  },
  itemButtonText: {
    margin: 5,
    fontSize: 5
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center'
  },
  picture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  placeholderText: {
    fontSize: 100,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    margin: 10
  },
  map: { 
    height: height * 0.5,
    width: 300,
    margin: 10,
    
  },
})