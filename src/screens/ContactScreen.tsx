import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import MapView, { Marker } from 'react-native-maps';
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { RootStackParams } from '../interfaces';
import { useWeather } from '../hooks/useWeather';
import useContacts from '../hooks/useContacts';

type Props = NativeStackScreenProps<RootStackParams, 'ContactView'>;
const { height } = Dimensions.get('window');

export const ContactScreen =  ({ route, navigation }: Props) => {
    const { deleteContact } = useContacts()
    const { contact } = route.params
    let { weather, loading, error } = useWeather(contact.location?.latitude, contact.location?.longitude);

  return (
    <ScrollView>
      <View style={ styles.container }>
        <View style={ styles.pictureContainer }>
            { contact.picture ? (
                <Image source={ { uri: contact.picture } } style={ styles.picture } />
              ) : (
                <View style={ styles.placeholder }>
                  <Text style={ styles.placeholderText }>{ contact.name[0] }</Text>
                </View>
              ) 
            }
        </View>

        <View>
          <Text style={styles.name}>{ contact.name }</Text>

          <View style={ styles.buttonsContainer }>
            <AntDesignIcon name='phone' size={ 25 } color='#38bb54'/>
            <Text style={styles.text}>{ contact.phone }</Text>
          </View>

          <View style={ styles.buttonsContainer }>
            <AntDesignIcon name='mail' size={ 25 } color='#38bb54'/>
            <Text style={styles.text}> { contact.email || 'no email' }</Text>
          </View>

          <View style={ styles.buttonsContainer }>
            <AntDesignIcon name='tag' size={ 25 } color='#38bb54'/>
            <Text style={ styles.text }>{ contact.tag || 'no tag' }</Text>
          </View>
          
        </View>

          {contact.location && (
            <View>
              <View>
                {loading ? (
                  <View>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Text>Loading weather...</Text>
                  </View>
                ) : error ? (
                  <Text style={styles.error}>{error}</Text>
                ) : 
                weather ? (
                  <View style={styles.weatherContainer}>
                    <View style={ styles.weatherSubContainer }>
                      <EntypoIcon name='water' size={ 25 } color='#38bb54'/>
                      <Text style={styles.weatherText}>{weather.main.humidity}%</Text>
                    </View>

                    <View style={ styles.weatherSubContainer }>
                      <FontAwesome6 name='temperature-half' size={ 25 } color='#38bb54'/>
                      <Text style={styles.weatherText}>{weather.main.temp}°C</Text>
                    </View>

                    <View style={ styles.weatherSubContainer }>
                      <FontAwesome5 name='cloud' size={ 25 } color='#38bb54'/>
                      <Text style={styles.weatherText}>{weather.weather[0].description}</Text>
                    </View>
                  </View>
                ) : (
                  <Text>No weather data available.</Text>
                )}
              </View>

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
            </View>
          )
        }

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
  pictureContainer: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 15,
    marginBottom: 25
  },
  picture: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  placeholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 100,
    fontWeight: 'bold',
    color: 'green',
    textAlignVertical: 'center'
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
    textAlign: 'center'
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    margin: 10,
    textAlign: 'center'
  },
  map: { 
    height: height * 0.5,
    width: 320,
    margin: 10,
    alignSelf: 'center'
  },
  error: {
    color: 'red',
  },
  weatherContainer: {
    margin: 15,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 20,
  },
  weatherSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  weatherText: {
    fontSize: 16,
    marginLeft: 10,
    color: 'black'
  },
})