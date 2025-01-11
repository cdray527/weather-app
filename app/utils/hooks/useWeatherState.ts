import { useMemo, useEffect } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { weatherHistoryAtom, currentWeatherIdAtom } from '@/utils/atoms/weatherState';
import { IWeatherHistoryItem } from '@/utils/interface/IWeatherHistoryItem';
import { getWeatherByCityCountry, mapWeatherResponse } from '../services/weatherServices';

const WEATHER_HISTORY_STORAGE_KEY = 'weatherHistory';

export const useWeatherState = () => {
    const [weatherHistory, setWeatherHistory] = useAtom(weatherHistoryAtom);
    const [currentWeatherId, setCurrentWeatherId] = useAtom(currentWeatherIdAtom);

    // Use selectAtom to derive selectedWeatherData
    const selectedWeatherHistoryAtom = useMemo(() => {
        return selectAtom(
            weatherHistoryAtom,
            (weatherHistory) => weatherHistory.find((data) => data.id === currentWeatherId) || null
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

    const addWeatherData = (newData: IWeatherHistoryItem) => {
        console.log('new item:', newData);
        setWeatherHistory((currentDataList) => {
            // If the item doesn't exist add into list
            const isNewItem = !currentDataList.some((data) => data.id === newData.id);
            if (isNewItem) {
                currentDataList.unshift(newData);
            }
            setCurrentWeatherId(newData.id);

            localStorage.setItem(WEATHER_HISTORY_STORAGE_KEY, JSON.stringify(currentDataList));

            return currentDataList;
        });
    };

    const removeWeatherDataById = (itemId: number) => {
        console.log('removing item:', itemId);

        setWeatherHistory((currentDataList) => {
            const newDataList = currentDataList.filter((data) => data.id !== itemId);
            if (currentWeatherId === itemId && newDataList.length > 0) {
                setCurrentWeatherId(newDataList[0].id);
            } else if (newDataList.length === 0) {
                setCurrentWeatherId(null);
            }

            localStorage.setItem(WEATHER_HISTORY_STORAGE_KEY, JSON.stringify(newDataList));

            return newDataList;
        });
    };

    const refreshWeatherData = async (itemId: number) => {
        console.log('refresh item:', itemId);

        // Retrieve the specific item from weatherHistory
        const existingData = weatherHistory.find((item) => item.id === itemId);
        if (!existingData) {
            console.error('refreshWeatherData error : Item not found in weather history');
            return;
        }

        const { city, country } = existingData;
        const previousInput = `${city}, ${country}`;

        try {
            const data = await getWeatherByCityCountry(previousInput);
            const refreshedData = mapWeatherResponse(data);

            setWeatherHistory((currentDataList) => {
                const newDataList = currentDataList.map((data) =>
                    data.id === itemId ? { ...data, ...refreshedData } : data
                );

                localStorage.setItem(WEATHER_HISTORY_STORAGE_KEY, JSON.stringify(newDataList));

                return newDataList;
            });
        } catch (err) {
            console.error('refreshWeatherData error:', err);
        }
    };

    return {
        weatherHistory,
        selectedWeatherData,
        addWeatherData,
        removeWeatherDataById,
        refreshWeatherData,
        currentWeatherId,
        setCurrentWeatherId
    };
};
