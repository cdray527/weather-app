import { useEffect } from 'react';
import { useAtom } from 'jotai';
import WeatherHistoryItem from './WeatherHistoryItem';
import { weatherHistoryState } from '@/utils/atoms/searchState';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { IWeatherHistoryItem } from '@/utils/type/weatherHistoryItem';

const WeatherHistory = () => {
    const [weatherData] = useAtom(weatherHistoryState);

    useEffect(() => {
        console.log(weatherData);
    }, [weatherData]);

    return (
        <div
            className={cn(
                'p-6 text-primary sm:justify-center sm:items-center',
                styles.WeatherHistory__container
            )}
        >
            <span>Search History</span>
            {weatherData.length !== 0 && (
                <ul>
                    {weatherData.map((item: IWeatherHistoryItem) => (
                        <WeatherHistoryItem key={item.id} data={item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WeatherHistory;
