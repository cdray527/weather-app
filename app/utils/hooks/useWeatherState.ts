import { useMemo, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { weatherHistoryAtom, currentWeatherIdAtom } from '@/utils/atoms/weatherState';
import { IWeatherHistoryItem } from '@/utils/interface/IWeatherHistoryItem';

const WEATHER_HISTORY_STORAGE_KEY = 'weatherHistory';

export const useWeatherState = () => {
    const [weatherHistory, setWeatherHistory] = useAtom(weatherHistoryAtom);
    const [currentWeatherId, setCurrentWeatherId] = useAtom(currentWeatherIdAtom);

    // Use selectAtom to derive selectedWeatherData from
    const selectedWeatherHistoryAtom = useMemo(() => {
        console.log('select item:', currentWeatherId);
        return selectAtom(
            weatherHistoryAtom,
            (weatherHistory) => weatherHistory.find((item) => item.id === currentWeatherId) || null
        );
    }, [currentWeatherId]);
    const selectedWeatherData = useAtomValue(selectedWeatherHistoryAtom);

    // Load weather history from local storage on initial load
    useEffect(() => {
        const savedWeatherHistory = JSON.parse(
            localStorage.getItem(WEATHER_HISTORY_STORAGE_KEY) || '[]'
        ) as IWeatherHistoryItem[];
        setWeatherHistory(savedWeatherHistory);
        if (savedWeatherHistory.length > 0) {
            setCurrentWeatherId(savedWeatherHistory[0].id);
        }
    }, []);

    const addWeatherData = (item: IWeatherHistoryItem) => {
        console.log('new item:', item);
        setWeatherHistory((prev) => {
            const updatedWeatherHistory = prev.map((weather) =>
                weather.id === item.id ? item : weather
            );

            // If the item doesn't exist, add it else replace it
            const isNewItem = !updatedWeatherHistory.some((weather) => weather.id === item.id);
            if (isNewItem) {
                updatedWeatherHistory.unshift(item);
            }
            setCurrentWeatherId(item.id);

            localStorage.setItem(
                WEATHER_HISTORY_STORAGE_KEY,
                JSON.stringify(updatedWeatherHistory)
            );

            return updatedWeatherHistory;
        });
    };

    const removeWeatherDataById = (itemId: number) => {
        console.log('removing item:', itemId);

        setWeatherHistory((prev) => {
            const updatedWeatherHistory = prev.filter((item) => item.id !== itemId);
            if (currentWeatherId === itemId && updatedWeatherHistory.length > 0) {
                setCurrentWeatherId(updatedWeatherHistory[0].id);
            } else if (updatedWeatherHistory.length === 0) {
                setCurrentWeatherId(null);
            }

            localStorage.setItem(
                WEATHER_HISTORY_STORAGE_KEY,
                JSON.stringify(updatedWeatherHistory)
            );

            return updatedWeatherHistory;
        });
    };

    return {
        weatherHistory,
        selectedWeatherData,
        addWeatherData,
        removeWeatherDataById,
        setCurrentWeatherId
    };
};
