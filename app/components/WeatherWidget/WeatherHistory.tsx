import WeatherHistoryItem from './WeatherHistoryItem';
import { useWeatherState } from '@/utils/hooks/useWeatherState';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { IWeatherHistoryItem } from '@/utils/interface/IWeatherHistoryItem';

const WeatherHistory = () => {
    const { weatherHistory } = useWeatherState();

    return (
        <div
            className={cn(
                'p-4 sm:justify-center sm:items-center',
                styles.WeatherHistory__container
            )}
        >
            <span className="text-tertiary">Search History</span>
            {weatherHistory.length !== 0 && (
                <ul>
                    {weatherHistory.map((item: IWeatherHistoryItem) => (
                        <WeatherHistoryItem key={item.id} data={item} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WeatherHistory;
