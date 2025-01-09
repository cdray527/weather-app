/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { weatherHistoryState } from '@/utils/atoms/searchState';
import { Form, useLocation, useNavigate } from '@remix-run/react';
import { getWeatherByCityCountry, mapWeatherResponse } from '@/utils/services/weatherServices';
import styles from './SearchBar.module.scss';
import { IWeatherHistoryItem } from '@/utils/type/weatherHistoryItem';

const SearchBar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(location.search);
    const defaultSearchInput = urlParams.get('q') || '';
    const [searchInput, setSearchInput] = useState<string>(defaultSearchInput);
    const setWeatherData = useSetAtom(weatherHistoryState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await getWeatherByCityCountry(searchInput);

            const newWeatherData: IWeatherHistoryItem = mapWeatherResponse(data);

            // Update weatherHistoryState with new data
            setWeatherData((prevWeatherData) => [...prevWeatherData, newWeatherData]);

            navigate(`/?q=${searchInput}`);
        } catch (err) {
            setError('Unable to fetch weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form method="get" onSubmit={handleSubmit}>
            <div className={styles.searchBarContainer}>
                <input
                    type="text"
                    placeholder="Search City"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    name="q"
                    className={styles.searchBarInput}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Search'}
                </button>
            </div>
        </Form>
    );
};

export default SearchBar;
