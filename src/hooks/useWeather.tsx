import { useEffect, useState } from "react"
import axios from "axios"
import { WEATHER_API_KEY } from '@env';
import { WeatherData } from "../interfaces"

export const useWeather = (lat?: number, lon?: number) => {
    const [weather, setWeather] = useState<WeatherData | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get<WeatherData>(
                    'https://api.openweathermap.org/data/2.5/weather', 
                    {
                        params: {
                            lat,
                            lon,
                            appid: WEATHER_API_KEY,
                            units: 'metric'
                        }
                    }
                )
                setWeather(res.data)
            } catch (error) {
                setError('Error fetching weather data,')
                console.error(error);
                
            } finally {
                setLoading(false)
            }
        }

        if(lat && lon) fetchWeather();
    }, [lat, lon])

    return {weather, loading, error}
}