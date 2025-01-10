import { useAtom } from 'jotai';
import WeatherHistoryItem from './WeatherHistoryItem';
import { weatherHistoryState } from '@/utils/atoms/weatherState';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { IWeatherHistoryItem } from '@/utils/interface/weatherHistoryItem';

const WeatherHistory = () => {
    const [weatherData] = useAtom(weatherHistoryState);

    return (
        <div
            className={cn(
                'p-4 sm:justify-center sm:items-center',
                styles.WeatherHistory__container
            )}
        >
            <span className="text-tertiary">Search History</span>
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
