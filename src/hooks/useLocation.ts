import {useState} from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const pickLocation = (lat: number, long: number) => {
    setLocation({latitude: lat, longitude: long});
  };

  return {location, pickLocation};
};
