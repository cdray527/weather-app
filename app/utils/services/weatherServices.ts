import axios from 'axios';

const API_KEY = 'ceb835a2541349ad07915f4d67aad389'; // hardcoded for demo purpose

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapWeatherResponse = (data: any) => {
    const id = data.id;
    const city = data.name;
    const country = data.sys.country;
    const temp = Math.round(data.main.temp);
    const maxTemp = Math.round(data.main.temp_max);
    const minTemp = Math.round(data.main.temp_min);
    const weather = data.weather[0]?.main;
    const humidity = data.main.humidity;
    const timestamp = new Date().toLocaleString();

    return {
        id,
        city,
        country,
        temp,
        maxTemp,
        minTemp,
        weather,
        humidity,
        timestamp
    };
};

// API Docs: https://openweathermap.org/current#name
export const getWeatherByCityCountry = async (cityName: string) => {
    try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: cityName,
                appid: API_KEY,
                units: 'metric'
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error getWeatherByLocation', error);
        throw new Error('Unable to fetch weather data');
    }
};
