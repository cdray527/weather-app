import React, { useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import styles from './WeatherWidget.module.scss';
import { weatherHistoryState } from '@/utils/atoms/searchState';
import cn from 'classnames';
import { useAtom } from 'jotai';

const WeatherWidget: React.FC = () => {
    const [weatherData] = useAtom(weatherHistoryState);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    return (
        <div className={cn('p-12', styles.weatherWidgetLayout)}>
            <SearchBar />
        </div>
    );
};

export default WeatherWidget;
