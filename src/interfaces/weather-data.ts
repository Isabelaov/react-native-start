export type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
};
