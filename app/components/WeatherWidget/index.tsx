import { Dispatch, SetStateAction } from 'react';
import { useLocation, useNavigate } from '@remix-run/react';
import SearchBar from '@/components/SearchBar';
import WeatherHistory from './WeatherHistory';
import WeatherInfo from './WeatherInfo';
import { useWeatherState } from '@/utils/hooks/useWeatherState';
import { getWeatherByCityCountry, mapWeatherResponse } from '@/utils/services/weatherServices';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';

const WeatherWidget = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const defaultSearchInput = urlParams.get('q') || ''; // Get the default search input from the url query param
    const { addWeatherData } = useWeatherState();

    // Handle the form submission logic
    const handleSubmit = async (
        searchInput: string,
        setLoading: Dispatch<SetStateAction<boolean>>,
        setError: Dispatch<SetStateAction<string | null>>
    ) => {
        setLoading(true);
        setError(null);

        try {
            const data = await getWeatherByCityCountry(searchInput);
            const newWeatherData = mapWeatherResponse(data);

            // Add or update the weather data in the state
            addWeatherData(newWeatherData);

            // Navigate to the search results with query parameter
            navigate(`/?q=${searchInput}`);
        } catch (err) {
            setError('Unable to fetch weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <SearchBar defaultSearchInput={defaultSearchInput} onSubmit={handleSubmit} />
            <div className={cn('p-4 mt-14 sm:p-6', styles.WeatherWidget__container)}>
                <WeatherInfo />
                <WeatherHistory />
            </div>
        </div>
    );
};

export default WeatherWidget;
