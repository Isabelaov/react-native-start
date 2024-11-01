import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Alert} from 'react-native';
import {requestLocationPermission} from '../utils/permissions';

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        Alert.alert('Error obtaining location', error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  };

  useEffect(() => {
    (async () => {
      if (await requestLocationPermission()) {
        getLocation();
      }
    })();
  }, []);

  const pickLocation = (lat: number, long: number) => {
    setLocation({latitude: lat, longitude: long});
  };

  return {location, pickLocation};
};
