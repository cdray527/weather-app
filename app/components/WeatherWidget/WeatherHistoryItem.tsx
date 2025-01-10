import { IWeatherHistoryItem } from '@/utils/interface/weatherHistoryItem';
import Iconify from '@/components/Iconify';
import cn from 'classnames';
import styles from './WeatherWidget.module.scss';

interface Props {
    data: IWeatherHistoryItem;
}

const WeatherHistoryItem = ({ data }: Props) => {
    console.log(data);

    return (
        <li>
            <div
                className={cn(
                    'relative flex flex-col justify-between pl-4 pr-4 mt-4 w-full items-start bg-opacity-90 sm:flex-row sm:items-center dark:bg-accent',
                    styles.WeatherHistoryItem__container
                )}
            >
                <div className="flex flex-col w-full sm:flex-row">
                    <span className="text-primary">{`${data.city}, ${data.country}`}</span>
                    <span className="text-secondary sm:ml-auto">{`${data.timestamp}`}</span>
                </div>
                <div className="flex absolute right-4 top-2 w-auto ml-4 sm:relative sm:top-0 sm:ml-8">
                    <button
                        className={cn(
                            'btn bg-accent text-secondary',
                            styles.WeatherHistoryItem__button
                        )}
                    >
                        <Iconify icon="mdi:magnify" width={24} />
                    </button>
                    <button
                        className={cn(
                            'ml-2 btn bg-accent text-secondary',
                            styles.WeatherHistoryItem__button
                        )}
                    >
                        <Iconify icon="mdi:delete" width={24} />
                    </button>
                </div>
            </div>
        </li>
    );
};

export default WeatherHistoryItem;
