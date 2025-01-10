import { useState } from 'react';
import { useSetAtom } from 'jotai';
import { weatherHistoryState } from '@/utils/atoms/searchState';
import { Form, useLocation, useNavigate } from '@remix-run/react';
import { getWeatherByCityCountry, mapWeatherResponse } from '@/utils/services/weatherServices';
import { IWeatherHistoryItem } from '@/utils/type/weatherHistoryItem';
import Iconify from '@/components/Iconify';

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
        <Form method="get" onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="flex items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search City"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    name="q"
                    className="input input-bordered w-full"
                />
                <button
                    type="submit"
                    disabled={loading || searchInput.length === 0}
                    className="btn btn-primary flex items-center justify-center p-0 w-12 h-12"
                >
                    {loading ? (
                        <Iconify icon="svg-spinners:180-ring" width={24} />
                    ) : (
                        <Iconify icon="mdi:magnify" width={32} />
                    )}
                </button>
            </div>
            {error && <p className="text-error text-sm">{error}</p>}
        </Form>
    );
};

export default SearchBar;
