import cn from 'classnames';
import styles from './WeatherWidget.module.scss';
import { useWeatherState } from '@/utils/hooks/useWeatherState';

const WeatherInfo = () => {
    const { selectedWeatherData } = useWeatherState();

    return (
        <div className={cn('relative mb-4', styles.WeatherInfo__container)}>
            {selectedWeatherData?.weather && (
                <div
                    className={cn(
                        styles.WeatherInfo__imageContainer,
                        'w-36 bottom-16 sm:bottom-10 right-0 sm:w-64'
                    )}
                >
                    {selectedWeatherData?.weather === 'Clouds' && (
                        <img
                            className={styles.WeatherInfo__image}
                            src={`/images/cloud.png`}
                            alt="cloudy"
                        />
                    )}
                    {selectedWeatherData?.weather === 'Clear' && (
                        <img
                            className={styles.WeatherInfo__image}
                            src={`/images/sun.png`}
                            alt="Sunny"
                        />
                    )}
                </div>
            )}
            <div className="flex flex-col md:flex-row ">
                <div className="flex flex-col md:w-1/4">
                    <div className="text-tertiary">Today&apos;s Weather</div>
                    <div
                        className={cn(
                            'leading-none text-primary-background text-7xl sm:text-9xl',
                            styles.WeatherInfo__currentWeather
                        )}
                    >
                        {selectedWeatherData?.temp}&deg;
                    </div>
                    <div>
                        <span>H: {selectedWeatherData?.maxTemp}&deg;</span>
                        <span className="pl-2">L: {selectedWeatherData?.minTemp}&deg;</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:w-1/4 sm:flex-row">
                <div className="md:w-1/2 text-secondary dark:text-primary">
                    <div>{`${selectedWeatherData?.city}, ${selectedWeatherData?.country}`}</div>
                </div>
                <div className="flex flex-col text-secondary justify-between absolute right-0 bottom-0 sm:w-3/4 sm:flex-row">
                    <div>{selectedWeatherData?.timestamp}</div>
                    <div>{`Humidity: ${selectedWeatherData?.humidity}%`}</div>
                    <div>{selectedWeatherData?.weather}</div>
                </div>
            </div>
        </div>
    );
};

export default WeatherInfo;
