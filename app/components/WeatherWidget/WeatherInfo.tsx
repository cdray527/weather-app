import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { useAtom } from 'jotai';
import { weatherHistoryState } from '@/utils/atoms/weatherState';

const WeatherInfo = () => {
    const [weatherData] = useAtom(weatherHistoryState);

    console.log(weatherData);

    return (
        <div className={cn(styles.WeatherInfo__container)}>
            <div>Today's Weather</div>
        </div>
    );
};

export default WeatherInfo;
