import React, { useEffect } from 'react';
import SearchBar from '@/components/SearchBar/SearchBar';
import styles from './WeatherWidget.module.scss';
import { weatherHistoryState } from '@/utils/atoms/searchState';
import { useAtom } from 'jotai';

export const WeatherWidget: React.FC = () => {
    const [weatherData] = useAtom(weatherHistoryState);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    return (
        <div className={styles.weatherWidgetLayout}>
            <SearchBar />
        </div>
    );
};
