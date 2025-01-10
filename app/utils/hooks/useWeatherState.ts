import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { weatherHistoryState, currentWeatherIdState } from '@/utils/atoms/weatherState';
import { IWeatherHistoryItem } from '@/utils/interface/weatherHistoryItem';

const WEATHER_HISTORY_KEY = 'weatherHistory';

export const useWeatherState = () => {
    const [weatherHistory, setWeatherHistory] = useAtom(weatherHistoryState);
    const [currentWeatherId, setCurrentWeatherId] = useAtom(currentWeatherIdState);

    const addWeatherData = (item: IWeatherHistoryItem) => {
        setWeatherHistory((prev) => {
            const updatedWeatherHistory = prev.map((weather) =>
                weather.id === item.id ? item : weather
            );

            // If the item doesn't exist, add it else replace it
            const isNewItem = !updatedWeatherHistory.some((weather) => weather.id === item.id);
            if (isNewItem) {
                updatedWeatherHistory.push(item);
            }

            try {
                localStorage.setItem(WEATHER_HISTORY_KEY, JSON.stringify(updatedWeatherHistory));
            } catch (err) {
                console.error('Error saving to localStorage', err);
            }

            return updatedWeatherHistory;
        });
    };

    const removeWeatherDataById = (itemId: number) => {
        setWeatherHistory((prev) => {
            const updatedWeatherHistory = prev.filter((item) => item.id !== itemId);
            localStorage.setItem(WEATHER_HISTORY_KEY, JSON.stringify(updatedWeatherHistory));
            return updatedWeatherHistory;
        });

        // If the removed item is the selected one, clear the selected state
        if (currentWeatherId === itemId) {
            setCurrentWeatherId(null);
        }
    };

    const selectWeatherItem = (itemId: number) => {
        setCurrentWeatherId(itemId);
    };

    const getCurrentWeatherData = useMemo(
        () => weatherHistory.find((item) => item.id === currentWeatherId) || null,
        [weatherHistory, currentWeatherId]
    );

    // Load weather history from local storage on initial load
    useEffect(() => {
        const savedWeatherHistory = JSON.parse(
            localStorage.getItem(WEATHER_HISTORY_KEY) || '[]'
        ) as IWeatherHistoryItem[];
        setWeatherHistory(savedWeatherHistory);
    }, [setWeatherHistory]);

    return {
        weatherHistory,
        getCurrentWeatherData,
        addWeatherData,
        removeWeatherDataById,
        selectWeatherItem
    };
};
