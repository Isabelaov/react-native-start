import { useState } from 'react';

export const useLocation = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const pickLocation = (lat: number, long: number) => {
    setLatitude(lat);
    setLongitude(long);
  };

  return { latitude, longitude, pickLocation };
};
